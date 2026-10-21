import { ObjectId, Decimal128 } from "mongodb";
import { z } from "zod";
import { toRupeeString } from "@/server/db/decimal";

export type OrderStatus =
  | "pending_payment"
  | "confirmed"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "returned"
  | "refunded";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";
export type PaymentMethod = "prepaid" | "cod";

export type FulfilmentStatus =
  | "not_started"
  | "processing"
  | "dispatched"
  | "delivered"
  | "exception";

export interface OrderItemSnapshot {
  productId: ObjectId;
  sku: string;
  slug: string;
  title: string;
  materialDisclosure: string;
  variantKey: string;
  imageKey?: string;
  unitPriceRupees: Decimal128;
  quantity: number;
  lineTotalRupees: Decimal128;
}

export interface OrderAmounts {
  subtotalRupees: Decimal128;
  discountRupees: Decimal128;
  shippingRupees: Decimal128;
  taxRupees: Decimal128;
  totalRupees: Decimal128;
  currency: "INR";
}

export interface ShippingAddress {
  recipientName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: "IN";
}

export interface OrderDocument {
  _id: ObjectId;
  orderNumber: string; // e.g. "SR-2026-7K3P9Q"
  status: OrderStatus;
  locale: "en" | "hi";

  // Security & Idempotency
  publicTrackingTokenHash: string;
  trackingTokenExpiresAt: Date;
  idempotencyKeyHash?: string;
  requestPayloadHash?: string;

  // Guest Customer
  customer: {
    name: string;
    emailNormalized: string;
    phone: string;
  };

  // Shipping
  shippingAddress: ShippingAddress;

  // Items Snapshot
  items: OrderItemSnapshot[];

  // Monetary Amounts (Rupees Decimal128)
  amounts: OrderAmounts;

  // Optional Gifting
  gift?: {
    isGift: boolean;
    senderName?: string;
    giftWrapOption?: string;
    giftMessage?: string;
  };

  // Payment
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    provider: string; // e.g. "razorpay"
    providerOrderId?: string | null;
    providerPaymentId?: string | null;
    amountRupees: Decimal128;
    currency: "INR";
    paidAt?: Date | null;
  };

  // Customer-Facing Fulfilment (STRICTLY NO SUPPLIER DATA)
  fulfilment: {
    status: FulfilmentStatus;
    carrier?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;
    processingStartedAt?: Date | null;
    dispatchedAt?: Date | null;
    deliveredAt?: Date | null;
  };

  // Optional Affirmative Marketing Consent
  marketingConsent?: {
    optIn: boolean;
    consentTimestamp: Date;
    consentTextVersion: string;
  };

  // Audit trail
  history: Array<{
    status: string;
    actor: string;
    timestamp: Date;
    reasonCode?: string;
  }>;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Minimal tracking DTO returned for public tracking query.
 * Excludes customer PII, internal notes, and payment IDs.
 */
export interface PublicOrderTrackingDto {
  orderNumber: string;
  status: OrderStatus;
  fulfilmentStatus: FulfilmentStatus;
  carrier?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  items: Array<{
    title: string;
    quantity: number;
  }>;
  createdAt: string;
  dispatchedAt?: string | null;
  deliveredAt?: string | null;
}

export function toPublicTrackingDto(doc: OrderDocument): PublicOrderTrackingDto {
  return {
    orderNumber: doc.orderNumber,
    status: doc.status,
    fulfilmentStatus: doc.fulfilment.status,
    carrier: doc.fulfilment.carrier,
    trackingNumber: doc.fulfilment.trackingNumber,
    trackingUrl: doc.fulfilment.trackingUrl,
    items: doc.items.map((i) => ({
      title: i.title,
      quantity: i.quantity,
    })),
    createdAt: doc.createdAt.toISOString(),
    dispatchedAt: doc.fulfilment.dispatchedAt ? doc.fulfilment.dispatchedAt.toISOString() : null,
    deliveredAt: doc.fulfilment.deliveredAt ? doc.fulfilment.deliveredAt.toISOString() : null,
  };
}

// Zod validation for Create Order payload
export const CreateOrderInputSchema = z.object({
  locale: z.enum(["en", "hi"]).default("en"),
  items: z.array(
    z.object({
      slug: z.string().min(1),
      variantKey: z.string().default("default"),
      quantity: z.number().int().min(1).max(5), // bounded quantity for MVP
    })
  ).min(1, "At least one item is required"),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  }),
  shippingAddress: z.object({
    recipientName: z.string().min(2).max(100),
    addressLine1: z.string().min(5).max(200),
    addressLine2: z.string().max(200).optional(),
    city: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    postalCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit Indian PIN code"),
    countryCode: z.literal("IN").default("IN"),
  }),
  gift: z.object({
    isGift: z.boolean().default(false),
    senderName: z.string().max(100).optional(),
    giftMessage: z.string().max(250).optional(),
  }).optional(),
  paymentMethod: z.enum(["prepaid", "cod"]).default("prepaid"),
  marketingOptIn: z.boolean().default(false),
});
