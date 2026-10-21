# Silvaram — Database Design

**Version:** 0.2 — founder amendments incorporated  
**Date:** 21 October 2026  
**Status:** Review baseline  
**Aligned with:** PRD v0.3, HLD v0.1, LLD v0.1 and API Design v0.2

> **Current decision overrides:** This version supersedes earlier descriptions of prices stored in paise and any database fields that store supplier-side information. Silvaram will store money in rupees, and the MVP will not persist supplier identities, supplier references, supplier SKU/cost, supplier inventory, or supplier communications. The team may coordinate fulfilment manually outside the application. The app stores only customer/order state and shipment details relevant to customers and administrators.

## 1. Goals and principles

Keep the initial MongoDB model small but reliable for two listings: a silver-coated frame and a peacock ring. Support English/Hindi content, guest checkout, payments, order tracking, a simple order workflow, corporate gifting leads, marketing consent, Cloudflare R2 assets, and Brevo events.

- Start with five collections; add new collections only when a real requirement justifies them.
- Represent monetary amounts in **INR rupees**, not paise. Use MongoDB `Decimal128` for money to avoid binary floating-point errors and allow exact two-decimal values. Do not use JavaScript `number` arithmetic to calculate totals.
- In API JSON, return monetary values as decimal strings, for example `"priceRupees": "1200.00"`. Format the value for display in the UI. This preserves accuracy across the database/API boundary.
- Store timestamps in UTC.
- Embed small, bounded data that is usually read with its parent record.
- Snapshot product title, material disclosure, selected variant, price, quantity and totals into orders.
- Use explicit statuses and server-side validation.
- Do not store supplier-side data in the MVP.
- Never store card numbers, CVV, UPI PINs or payment credentials.

## 2. Collection overview

| Collection | Purpose |
|---|---|
| `products` | Public product content, rupee prices, variants, publication status and R2 image references |
| `orders` | Guest customer/order snapshot, monetary amounts, payment state and customer-facing fulfilment/tracking state |
| `corporateEnquiries` | Corporate gifting leads and follow-up status |
| `marketingSubscriptions` | Explicit consent, subscription lifecycle and Brevo contact reference |
| `integrationEventReceipts` | Idempotent processing of payment and configured Brevo webhook events |

### Not included in MVP

No separate `customers`, `categories`, `assets`, `reviews`, `wishlists`, `coupons`, or inventory collections. No product supplier object, supplier identifiers, supplier cost/margin, supplier stock state, supplier contact information, supplier order reference, or supplier-side API integration. No full CRM, inventory forecasting, automated supplier integration, customer accounts or campaign editor.

Guest checkout avoids account complexity. A small image array lives inside each product; image binaries remain in R2. Admin authentication is handled by a vetted authentication library/provider and server-side authorization—not an application-stored password.

## 3. `products` collection

One document represents a product listing.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Internal identifier |
| `sku` | String | Silvaram's own optional internal SKU; never a supplier SKU |
| `slug` | String | Unique, stable URL segment |
| `type` | Enum | `decorative_frame` or `jewellery` initially |
| `status` | Enum | `draft`, `active`, `archived` |
| `content` | Object | English and Hindi title, summary, description, material disclosure and SEO fields |
| `priceRupees` | Decimal128 | For example `Decimal128("1200.00")` |
| `compareAtPriceRupees` | Decimal128/null | Optional; use only for a valid reference price |
| `currency` | String | `INR` |
| `images` | Array | R2 object key, localised alt text, dimensions and position |
| `variants` | Array | Small embedded list of options such as ring size; no external supplier identifiers |
| `featuredRank` | Integer | Optional homepage ordering |
| `publishedAt` | Date/null | Set when published |
| `createdAt`, `updatedAt` | Date | UTC timestamps |
| `schemaVersion` | Integer | Optional migration/version marker |

### Example (illustrative BSON shape)

```javascript
{
  _id: ObjectId,
  schemaVersion: 1,
  sku: "SIL-FRAME-001",
  slug: "silver-coated-frame",
  type: "decorative_frame",
  status: "active",
  content: {
    en: {
      title: "Silver-Coated Frame",
      shortDescription: "...",
      description: "...",
      materialDisclosure: "Verified, accurate material statement",
      seoTitle: "...",
      seoDescription: "..."
    },
    hi: { title: "...", materialDisclosure: "..." }
  },
  priceRupees: Decimal128("1200.00"),
  compareAtPriceRupees: null,
  currency: "INR",
  images: [{
    key: "products/sil-frame-001/hero.webp",
    alt: { en: "Silver-coated frame", hi: "..." },
    width: 1600,
    height: 2000,
    position: 0
  }],
  variants: [{ key: "default", label: "Standard", options: {}, priceOverrideRupees: null, active: true }],
  featuredRank: 1,
  publishedAt: ISODate("..."),
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

This is a BSON-style example; `ObjectId`, `Decimal128` and `ISODate` are explanatory placeholders, not literal JSON.

### Product rules

1. `slug` and `sku` are unique; `sku` is Silvaram's own internal code only. A published slug is stable except through an explicit redirect/migration.
2. `priceRupees` and any variant override use Decimal128 with non-negative rupee values, normally two decimal places. Do not round-trip money through floating-point arithmetic.
3. If `priceOverrideRupees` is `null`, use the product-level `priceRupees`.
4. The client submits slug, optional variant key and quantity—never an authoritative price.
5. Only `status: active` products can be returned publicly or purchased.
6. The API returns an explicit public DTO. The full MongoDB document is never serialized directly.
7. Material disclosure is required before publication. The frame must be accurately described as silver-coated if that is the product construction. Do not claim the ring is solid/sterling silver without evidence.
8. The ring remains in draft until composition, product claims, sizing, value proposition, returns and safe fulfilment are verified.
9. Do not model supplier stock. Product publication/availability is controlled by Silvaram's admin based on information gathered outside the app.
10. Store R2 object keys, not signed upload URLs or image binaries. Construct public URLs from a server-configured image domain.
11. Use plain text or safely rendered content; do not accept arbitrary HTML.

## 4. `orders` collection

One order is the unit of support, payment reconciliation and customer-facing fulfilment. Embed the customer/address snapshot, items, monetary amounts and status history.

### Core field groups

| Group | Contents |
|---|---|
| Identity | `_id`, unique non-sequential `orderNumber`, hashed tracking token and expiry |
| Idempotency | Hash of idempotency key and canonical request-payload hash |
| Customer | Name, normalized email and phone |
| Shipping | Recipient, address, city, state, PIN code and country code |
| Items | Product ID, Silvaram SKU/slug, title/material/variant/image-key snapshot, price in rupees, quantity and line total |
| Amounts | Subtotal, discount, shipping, tax and total in rupees, all Decimal128 |
| Gift | Gift flag, optional gift-wrap choice, sender name and bounded plain-text message |
| Payment | Method, status, provider reference, amount in rupees, currency and timestamps |
| Fulfilment | Status, carrier, tracking number/URL and dispatch/delivery timestamps; no supplier reference or supplier data |
| Consent | Optional marketing opt-in evidence captured independently during checkout |
| History | Small bounded record of key state transitions, timestamp, actor and reason code |
| Timestamps | `createdAt`, `updatedAt` |

### Example monetary fields

```javascript
amounts: {
  subtotalRupees: Decimal128("1200.00"),
  discountRupees: Decimal128("0.00"),
  shippingRupees: Decimal128("0.00"),
  taxRupees: Decimal128("0.00"),
  totalRupees: Decimal128("1200.00"),
  currency: "INR"
},
payment: {
  method: "prepaid",
  status: "pending",
  provider: "configured-provider",
  providerOrderId: null,
  providerPaymentId: null,
  amountRupees: Decimal128("1200.00"),
  currency: "INR",
  paidAt: null
},
fulfilment: {
  status: "not_started",
  carrier: null,
  trackingNumber: null,
  trackingUrl: null,
  processingStartedAt: null,
  dispatchedAt: null,
  deliveredAt: null
}
```

### Order rules

- Recalculate all amounts on the server from authoritative product values and configured shipping/tax rules. Never trust client totals.
- Use Decimal128 or a decimal arithmetic library for calculations. Round according to an approved tax/invoice policy; do not use binary floating point.
- Snapshot title, material disclosure, price, quantity and totals at purchase time.
- `orderNumber` is a reference, not authentication.
- Generate a high-entropy tracking token; persist only its hash. Do not expose full address, phone, email, internal notes or payment IDs through tracking.
- Same idempotency key + same request returns the original order result; same key + different request returns `409 IDEMPOTENCY_KEY_REUSED`.
- Payment success requires verified server-to-server provider evidence, not a browser redirect/callback. Validate provider order ID, amount, currency and allowed state transition.
- Payment and fulfilment statuses are separate. A paid order is not necessarily dispatched.
- COD is feature-flagged and restricted by product/PIN code. Keep the high-value ring prepaid-only by default.
- Manual supplier contact/ordering occurs outside Silvaram's app. The database does **not** store supplier names, supplier order numbers, supplier costs, stock details, supplier messages or supplier acknowledgements.
- Store only Silvaram's operational order status and customer-facing shipment tracking fields.
- Marketing consent is independent of purchase. Never store card data.

### Statuses

**Order status:** `pending_payment`, `confirmed`, `processing`, `dispatched`, `delivered`, `cancelled`, `return_requested`, `returned`, `refunded`.

**Payment status:** `pending`, `succeeded`, `failed`, `refunded`.

**Fulfilment status:** `not_started`, `processing`, `dispatched`, `delivered`, `exception`.

Enforce transitions in service functions with conditional updates. An admin must not manually set payment status to `succeeded`.

## 5. `corporateEnquiries` collection

Fields: company name, contact name, role, business email/normalized email, phone, estimated quantity, budget-per-gift range in rupees, expected delivery date, destination city/PIN codes, branding requirements, bounded message, locale, source, status, optional follow-up date, and timestamps.

Suggested budget fields: `budgetPerGiftMinRupees` and `budgetPerGiftMaxRupees`, stored as Decimal128. Statuses: `new`, `reviewing`, `quoted`, `won`, `lost`, `spam`.

This is a lightweight lead queue, not a full CRM. Save the enquiry before sending a Brevo notification. A notification failure must not lose the lead. No supplier or supplier quotation data is stored here.

## 6. `marketingSubscriptions` collection

Fields: normalized email, preferred locale, status, consent source, consent-text version, consent timestamp, confirmed/unsubscribed timestamps, Brevo contact reference, last-sync timestamp and creation/update timestamps.

Statuses: `pending_confirmation`, `active`, `unsubscribed`, `bounced`. Enforce a unique normalized-email index. Do not activate a contact without affirmative marketing consent. Unsubscribe/bounce state must not be overwritten by routine synchronization. Bulk campaigns are created and sent in Brevo, not in Silvaram's app.

## 7. `integrationEventReceipts` collection

Fields: provider, external event ID, event type, processing status, payload hash, related order ID where relevant, received/processed times, attempt count and last error code. Store minimal metadata rather than full unredacted external payloads.

Use a unique compound index `(provider, eventId)` to deduplicate webhooks. Verify authenticity before accepting an event as trusted. Make transient failures observable and safely retryable.

## 8. Index plan

| Collection | Index | Purpose |
|---|---|---|
| `products` | Unique `{ slug: 1 }` | Product detail lookup |
| `products` | Unique `{ sku: 1 }` | Internal SKU uniqueness |
| `products` | `{ status: 1, type: 1, featuredRank: 1 }` | Active catalogue listing |
| `orders` | Unique `{ orderNumber: 1 }` | Admin/support lookup |
| `orders` | Unique sparse `{ publicTrackingTokenHash: 1 }` | Secure tracking lookup |
| `orders` | Unique sparse `{ idempotencyKeyHash: 1 }` | Duplicate order prevention |
| `orders` | `{ status: 1, createdAt: -1 }` | Admin work queue |
| `orders` | Unique sparse/partial provider order ID | Payment reconciliation |
| `corporateEnquiries` | `{ status: 1, createdAt: -1 }` | Lead management |
| `marketingSubscriptions` | Unique `{ emailNormalized: 1 }` | Avoid duplicate contacts |
| `integrationEventReceipts` | Unique `{ provider: 1, eventId: 1 }` | Webhook deduplication |
| `integrationEventReceipts` | `{ processingStatus: 1, receivedAt: 1 }` | Retry/failure review |

Confirm exact sparse/partial-index definitions against the deployed MongoDB version. Keep indexes purposeful; do not add text search or a search service for two products.

## 9. R2 asset model

- Store product images/media in Cloudflare R2; MongoDB stores object key and image metadata only.
- Serve approved public images through a configured custom domain/CDN.
- For admin upload, authenticate the admin, validate allowed image type/size, generate an object key and return a short-lived presigned PUT URL. The browser uploads directly to R2.
- R2 credentials remain server-only. Restrict bucket CORS to the production admin origin and cache versioned keys aggressively.
- Keep private files out of the public product-image bucket.

## 10. Operations, privacy and growth

Use one shared server-side MongoDB client/connection pool. Public queries filter active products and project only required fields. Use atomic conditional updates for order transitions. Confirm transaction support and actual need before using multi-document transactions.

Define backup/restore and test restores. Redact PII, gift messages, tracking tokens and provider bodies from logs. Establish a privacy-reviewed data-retention schedule. Future candidates—only when justified—include customer accounts, reviews, coupons, more advanced inventory and search/recommendation systems.

## 11. Approval checklist

- [x] Five-collection MVP accepted.
- [x] Prices represented in rupees, not paise; Decimal128 used for exact decimal amounts.
- [x] No supplier-side data is persisted in MVP.
- [ ] Product material claims and English/Hindi content verified.
- [ ] Ring publication gate met.
- [ ] Order snapshots and status transitions accepted.
- [ ] Opaque tracking token and minimal public response accepted.
- [ ] Marketing consent/unsubscribe handling accepted.
- [ ] Webhook deduplication accepted.
- [ ] R2 upload/public-private asset rules accepted.
- [ ] Indexes, backup, retention and privacy plan accepted.

## References

- MongoDB embedded data: https://www.mongodb.com/docs/manual/data-modeling/embedding/
- MongoDB data modelling: https://www.mongodb.com/docs/manual/data-modeling/
- MongoDB Decimal128: https://www.mongodb.com/docs/manual/reference/bson-types/#decimal128-bson-data-type
- Cloudflare R2 presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Cloudflare R2 uploads: https://developers.cloudflare.com/r2/objects/upload-objects/
