import { randomInt } from "node:crypto";
import { Client, Databases, ID, Query, Storage } from "node-appwrite";
import { z } from "zod";

const ORDER_PHOTOS_BUCKET = "order-photos";
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no look-alike characters

const OrderSchema = z.object({
  locale: z.enum(["en", "hi"]).default("en"),
  productSlug: z.string().min(1).max(100),
  variantKey: z.string().max(60).default("default"),
  quantity: z.number().int().min(1).max(5),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    phone: z.string().regex(/^[6-9]\d{9}$/),
  }),
  shippingAddress: z.object({
    recipientName: z.string().min(2).max(100),
    addressLine1: z.string().min(5).max(300),
    postalCode: z.string().regex(/^\d{6}$/),
    countryCode: z.literal("IN"),
  }),
  gift: z.object({ isGift: z.boolean(), giftMessage: z.string().max(100).optional() }),
  personalisation: z.object({
    recipient: z.string().max(80),
    message: z.string().max(400),
    date: z.string().max(40),
    ribbon: z.string().max(40),
    photoOption: z.enum(["installed", "envelope"]),
    photoFileId: z.string().max(40).optional(),
  }),
  paymentMethod: z.enum(["upi", "card", "cod"]),
});

/** Integer paise arithmetic so rupee totals never suffer float drift. */
const toPaise = (rupees) => Math.round(Number.parseFloat(rupees) * 100);
const toRupees = (paise) => (paise / 100).toFixed(2);

function newOrderNumber() {
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += ALPHABET[randomInt(ALPHABET.length)];
  return `SR-${new Date().getFullYear()}-${suffix}`;
}

export default async ({ req, res, log, error }) => {
  if (req.method !== "POST") return res.json({ ok: false, error: "Method not allowed." }, 405);

  const parsed = OrderSchema.safeParse(typeof req.body === "string" ? safeJson(req.body) : req.bodyJson);
  if (!parsed.success) {
    return res.json({ ok: false, error: parsed.error.issues[0]?.message || "Invalid order details." }, 400);
  }
  const order = parsed.data;

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] ?? "");
  const databases = new Databases(client);
  const storage = new Storage(client);
  const databaseId = process.env.DATABASE_ID || "silveram";

  try {
    // 1. Price comes from the catalogue, never from the client.
    const found = await databases.listDocuments(databaseId, "products", [
      Query.equal("slug", order.productSlug),
      Query.equal("status", "active"),
      Query.limit(1),
    ]);
    const product = found.documents[0];
    if (!product) return res.json({ ok: false, error: "This product is no longer available." }, 404);

    let unitPaise = toPaise(product.priceRupees);
    const variants = safeJson(product.variantsJson) ?? [];
    const variant = variants.find((v) => v.key === order.variantKey && v.active);
    if (variant) unitPaise = toPaise(variant.priceRupees);
    else if (order.variantKey !== "default") {
      return res.json({ ok: false, error: "The selected option is unavailable." }, 400);
    }
    const totalPaise = unitPaise * order.quantity;

    // 2. A referenced photo must really exist in the order-photos bucket.
    const { photoFileId } = order.personalisation;
    if (photoFileId) {
      await storage.getFile(ORDER_PHOTOS_BUCKET, photoFileId).catch(() => {
        throw new UserError("Your uploaded photo could not be found. Please upload it again.");
      });
    }

    // 3. Persist. Prepaid orders wait for payment confirmation; COD is confirmed immediately.
    const isCod = order.paymentMethod === "cod";
    const orderNumber = newOrderNumber();
    await databases.createDocument(databaseId, "orders", ID.unique(), {
      orderNumber,
      status: isCod ? "confirmed" : "pending_payment",
      paymentMethod: order.paymentMethod,
      paymentStatus: "pending",
      locale: order.locale,
      customerName: order.customer.name,
      customerEmail: order.customer.email.toLowerCase(),
      customerPhone: order.customer.phone,
      shippingName: order.shippingAddress.recipientName,
      shippingAddress: order.shippingAddress.addressLine1,
      shippingPincode: order.shippingAddress.postalCode,
      productSlug: product.slug,
      productSku: product.sku,
      productTitle: product.titleEn,
      variantKey: order.variantKey,
      quantity: order.quantity,
      unitPriceRupees: toRupees(unitPaise),
      totalRupees: toRupees(totalPaise),
      isGift: order.gift.isGift,
      giftMessage: order.gift.giftMessage ?? "",
      recipient: order.personalisation.recipient,
      inscription: order.personalisation.message,
      inscriptionDate: order.personalisation.date,
      ribbon: order.personalisation.ribbon,
      photoOption: order.personalisation.photoOption,
      photoFileId: photoFileId ?? "",
    });

    log(`Order ${orderNumber} created (${order.paymentMethod}, INR ${toRupees(totalPaise)}).`);
    return res.json({
      ok: true,
      order: {
        orderNumber,
        status: isCod ? "confirmed" : "pending_payment",
        totalRupees: toRupees(totalPaise),
      },
    });
  } catch (err) {
    if (err instanceof UserError) return res.json({ ok: false, error: err.message }, 400);
    error(`create-order failed: ${err?.message ?? err}`);
    return res.json({ ok: false, error: "We could not place your order. Please try again." }, 500);
  }
};

class UserError extends Error {}

function safeJson(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
