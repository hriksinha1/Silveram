/**
 * Provisions the Appwrite backend for Silveram: database, collections, attributes, indexes,
 * the order-photos bucket and the seed product. Safe to re-run (existing resources are skipped).
 *
 *   APPWRITE_API_KEY=... npm run appwrite:setup
 *
 * Reads VITE_APPWRITE_ENDPOINT / VITE_APPWRITE_PROJECT_ID / VITE_APPWRITE_DATABASE_ID from
 * .env.local (or the process environment). The API key needs the databases.* and buckets.* scopes.
 */
import fs from "node:fs";
import path from "node:path";
import { Client, Databases, IndexType, Permission, Role, Storage } from "node-appwrite";

function loadEnv(file) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    if (!(key in process.env)) process.env[key] = t.slice(i + 1).trim();
  }
}
loadEnv(".env.local");
loadEnv(".env");

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const DB = process.env.VITE_APPWRITE_DATABASE_ID || "silveram";

if (!projectId || !apiKey) {
  console.error("Set VITE_APPWRITE_PROJECT_ID and APPWRITE_API_KEY (in .env.local or the environment).");
  process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const storage = new Storage(client);

/** Runs a create call, treating "already exists" (409) as success. */
async function ensure(label, fn) {
  try {
    await fn();
    console.log(`  + ${label}`);
  } catch (e) {
    if (e?.code === 409) console.log(`  = ${label} (exists)`);
    else throw e;
  }
}

const str = (collectionId, key, size, required = false, extra = {}) =>
  ensure(`${collectionId}.${key}`, () =>
    databases.createStringAttribute(DB, collectionId, key, size, required, extra.xdefault),
  );
const int = (collectionId, key, required = false) =>
  ensure(`${collectionId}.${key}`, () =>
    databases.createIntegerAttribute(DB, collectionId, key, required),
  );
const bool = (collectionId, key, required = false) =>
  ensure(`${collectionId}.${key}`, () =>
    databases.createBooleanAttribute(DB, collectionId, key, required),
  );
const index = (collectionId, key, type, attributes) =>
  ensure(`${collectionId}#${key}`, () =>
    databases.createIndex(DB, collectionId, key, type, attributes),
  );

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForAttributes(collectionId) {
  for (let i = 0; i < 60; i++) {
    const { attributes } = await databases.listAttributes(DB, collectionId);
    if (attributes.every((a) => a.status === "available")) return;
    await sleep(1000);
  }
  throw new Error(`Attributes of ${collectionId} did not become available in time.`);
}

console.log(`Provisioning Appwrite project ${projectId} (database "${DB}")`);

await ensure(`database ${DB}`, () => databases.create(DB, "Silveram"));

// ---- products: world-readable catalogue, written only by admins/API keys ----
await ensure("collection products", () =>
  databases.createCollection(DB, "products", "Products", [Permission.read(Role.any())], false),
);
await str("products", "slug", 100, true);
await str("products", "sku", 60, true);
await str("products", "type", 30, true);
await str("products", "status", 20, true);
await str("products", "titleEn", 200, true);
await str("products", "shortDescriptionEn", 600);
await str("products", "descriptionEn", 4000, true);
await str("products", "materialDisclosureEn", 2000, true);
await str("products", "priceRupees", 16, true);
await str("products", "compareAtPriceRupees", 16);
await int("products", "featuredRank");
await str("products", "imagesJson", 8000);
await str("products", "variantsJson", 8000);
await waitForAttributes("products");
await index("products", "slug_unique", IndexType.Unique, ["slug"]);
await index("products", "status_rank", IndexType.Key, ["status", "featuredRank"]);

// ---- corporate_enquiries: anyone may submit, nobody may read back from the browser ----
await ensure("collection corporate_enquiries", () =>
  databases.createCollection(DB, "corporate_enquiries", "Corporate Enquiries", [Permission.create(Role.any())], false),
);
await str("corporate_enquiries", "companyName", 150, true);
await str("corporate_enquiries", "contactName", 100, true);
await str("corporate_enquiries", "businessEmail", 254, true);
await int("corporate_enquiries", "estimatedQuantity", true);
await str("corporate_enquiries", "message", 1000, true);
await str("corporate_enquiries", "locale", 2, true);
await str("corporate_enquiries", "source", 60);
await str("corporate_enquiries", "status", 20);
await waitForAttributes("corporate_enquiries");

// ---- orders: no client permissions at all; only the create-order function (API key) touches it ----
await ensure("collection orders", () =>
  databases.createCollection(DB, "orders", "Orders", [], false),
);
for (const [key, size] of [
  ["orderNumber", 24],
  ["status", 30],
  ["paymentMethod", 10],
  ["paymentStatus", 20],
  ["locale", 2],
  ["customerName", 100],
  ["customerEmail", 254],
  ["customerPhone", 10],
  ["shippingName", 100],
  ["shippingAddress", 300],
  ["shippingPincode", 6],
  ["productSlug", 100],
  ["productSku", 60],
  ["productTitle", 200],
  ["variantKey", 60],
  ["unitPriceRupees", 16],
  ["totalRupees", 16],
  ["giftMessage", 100],
  ["recipient", 80],
  ["inscription", 400],
  ["inscriptionDate", 40],
  ["ribbon", 40],
  ["photoOption", 10],
  ["photoFileId", 40],
]) {
  await str("orders", key, size, false);
}
await int("orders", "quantity");
await bool("orders", "isGift");
await waitForAttributes("orders");
await index("orders", "order_number_unique", IndexType.Unique, ["orderNumber"]);
await index("orders", "email", IndexType.Key, ["customerEmail"]);

// ---- order-photos: customers may upload, nobody may list or download from the browser ----
await ensure("bucket order-photos", () =>
  storage.createBucket(
    "order-photos",
    "Order Photos",
    [Permission.create(Role.any())],
    false,
    true,
    10 * 1024 * 1024,
    ["jpg", "jpeg", "png", "webp"],
  ),
);

// ---- seed product ----
const seed = {
  slug: "silver-coated-frame",
  sku: "SIL-FRAME-001",
  type: "decorative_frame",
  status: "active",
  titleEn: "The Sacred Keepsake Frame • Lakshmi-Ganesha Edition",
  shortDescriptionEn:
    "An architectural devotional keepsake frame featuring pure 999 fine silver clad relief of Sri Lakshmi & Sri Ganesha in monolithic optical acrylic.",
  descriptionEn:
    "Crafted with precision geometry, this architectural devotional sanctuary preserves your most sacred blessings and cherished memories.",
  materialDisclosureEn:
    "Verified Composition: Precision engineered structural composite core with verified electroformed 999 fine silver cladding. Anti-tarnish nano-ceramic sealed.",
  priceRupees: "1200.00",
  featuredRank: 1,
  imagesJson: JSON.stringify([
    { url: "/products/frame-01.webp", alt: "Silveram Sacred Keepsake Frame", width: 933, height: 1400, position: 0 },
  ]),
  variantsJson: JSON.stringify([
    {
      key: "default",
      label: "Standard Tabletop (18.5 × 23.5 cm)",
      priceRupees: "1200.00",
      options: { size: "tabletop" },
      active: true,
    },
  ]),
};
await ensure("seed product SIL-FRAME-001", () =>
  databases.createDocument(DB, "products", "sil-frame-001", seed),
);

console.log("\nDone. Next: deploy the create-order function (see README → Backend).");
