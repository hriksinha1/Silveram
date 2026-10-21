# Silvaram — API Design

**Version:** 0.2 — aligned with rupee amounts and supplier-free MVP data model  
**Date:** 21 October 2026  
**Status:** Review baseline  
**Aligned with:** PRD v0.3, HLD v0.1, LLD v0.1 and Database Design v0.2

> Current amendment: monetary API fields are expressed in **rupees**, not paise. JSON wire values are decimal strings (e.g. `"1200.00"`) to avoid floating-point ambiguity. The MVP does not store or expose supplier-side information. Manual coordination with the supplier takes place outside the app; Silvaram stores only its own order-processing state and customer-facing shipment details.

## 1. API goals and boundaries

- REST-style JSON endpoints under `/api/v1`, implemented as Next.js Route Handlers.
- Route Handler flow: parse → validate → authenticate/authorize → service/business rules → DTO response.
- Server owns prices, tax/shipping calculations, payment state, order transitions and consent state.
- No separate Express server for the MVP.
- Public product reads may be cached. Checkout, orders, tracking, admin and consent operations must use `Cache-Control: no-store`.
- No API for features outside MVP scope, such as wishlists, product reviews, coupons, customer accounts, autonomous AI purchasing or bulk campaign sending.

## 2. Conventions

**Base path:** `/api/v1`  
**Content type:** UTF-8 JSON over HTTPS (unless a provider specifies its webhook format)  
**Currency:** `INR`  
**Money format:** decimal strings in rupees, with two fractional digits, e.g. `"1200.00"`. Server-side calculations use MongoDB Decimal128 or a decimal arithmetic library; do not calculate totals with JavaScript binary floating point.  
**Time format:** ISO 8601 UTC.

### Success envelope

```json
{
  "data": { "id": "example-id" },
  "meta": { "requestId": "server-generated-id" }
}
```

### Error envelope

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Please check the submitted fields.",
    "requestId": "server-generated-id",
    "fieldErrors": { "customer.email": "Enter a valid email address." }
  }
}
```

Never return stack traces, provider secrets, raw database errors, supplier-side information or internal integration payloads.

### Status codes

| Code | Meaning |
|---|---|
| `200` | Successful read/action |
| `201` | Resource created |
| `400` | Malformed request or invalid webhook request |
| `401` | Missing/invalid session |
| `403` | Authenticated but not allowed |
| `404` | Unknown/unavailable resource |
| `409` | Idempotency conflict or invalid state transition |
| `422` | Business-rule failure, such as inactive product or COD ineligible |
| `429` | Rate limit exceeded |
| `500` | Unexpected failure with request ID |

## 3. Endpoint inventory

### Public storefront

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/products` | List active products |
| GET | `/api/v1/products/{slug}` | Read public product details |
| POST | `/api/v1/checkout/quote` | Recalculate current prices and estimated shipping/payment eligibility |
| POST | `/api/v1/orders` | Create a guest order and initiate payment where applicable |
| POST | `/api/v1/orders/track` | Read minimal order status using an opaque tracking token |
| POST | `/api/v1/corporate-enquiries` | Submit a corporate gifting lead |
| POST | `/api/v1/marketing/subscribe` | Request newsletter subscription |
| POST | `/api/v1/marketing/confirm` | Confirm subscription with an expiring token |
| POST | `/api/v1/marketing/unsubscribe` | Process an authorized unsubscribe |

### Webhooks

| Method | Endpoint | Purpose | Security |
|---|---|---|---|
| POST | `/api/v1/webhooks/payments/{provider}` | Verify payment events and reconcile state | Verify raw-body signature, replay controls and event ID |
| POST | `/api/v1/webhooks/brevo` | Sync configured unsubscribe/bounce/delivery events | Validate configured webhook authentication and deduplicate |

### Admin-only

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/admin/products` | List draft, active and archived products |
| POST | `/api/v1/admin/products` | Create product draft |
| PATCH | `/api/v1/admin/products/{id}` | Update content/pricing/publication state |
| POST | `/api/v1/admin/assets/presign` | Generate short-lived R2 upload URL |
| GET | `/api/v1/admin/orders` | Filter order queue |
| GET | `/api/v1/admin/orders/{id}` | Read full customer support/order details |
| POST | `/api/v1/admin/orders/{id}/processing` | Mark manual processing started; no supplier information recorded |
| POST | `/api/v1/admin/orders/{id}/shipment` | Record dispatch and customer tracking details |
| POST | `/api/v1/admin/orders/{id}/cancel` | Request cancellation under policy/state rules |
| GET | `/api/v1/admin/corporate-enquiries` | List corporate leads |
| PATCH | `/api/v1/admin/corporate-enquiries/{id}` | Update lead status and follow-up fields |

All admin routes require server-verified authentication and authorization. `{provider}` must resolve to a configured payment-provider adapter; it is not an arbitrary URL or code input.

## 4. Catalogue endpoints

### `GET /api/v1/products?locale=en&type=decorative_frame&limit=12`

Rules:
- `locale` is `en` or `hi`, default `en`.
- Return active products only.
- `limit` defaults to 12 and is capped at 24.
- Search/facets/pagination are deferred while the catalogue has two products.
- Response DTO contains slug, type, public title/summary, `priceRupees`, `currency`, public image URLs/alt text, public variant options, material disclosure and appropriate SEO fields.
- Never return supplier fields or raw MongoDB documents.

Example:

```json
{
  "data": [
    {
      "slug": "silver-coated-frame",
      "type": "decorative_frame",
      "title": "Silver-Coated Frame",
      "priceRupees": "1200.00",
      "currency": "INR",
      "images": [{
        "url": "https://media.example.com/products/sil-frame-001/hero.webp",
        "alt": "Silver-coated frame"
      }]
    }
  ],
  "meta": { "count": 1, "locale": "en" }
}
```

The media domain is configured server-side. Do not store or expose signed R2 upload URLs as permanent product image URLs.

### `GET /api/v1/products/{slug}?locale=hi`

Return the public product DTO in the requested language. Return `404` for drafts, archived listings or unknown slugs. The indexable product page itself must use server-rendered Next.js content; the API supports shared data and interactive experiences but should not be the sole source of SEO content.

## 5. Checkout quote

`POST /api/v1/checkout/quote`

Example request:

```json
{
  "items": [{ "slug": "silver-coated-frame", "variantKey": "default", "quantity": 1 }],
  "postalCode": "110001",
  "locale": "en"
}
```

Example response (shipping/tax numbers are illustrative only):

```json
{
  "data": {
    "items": [{
      "slug": "silver-coated-frame",
      "variantKey": "default",
      "quantity": 1,
      "unitPriceRupees": "1200.00",
      "lineTotalRupees": "1200.00"
    }],
    "amounts": {
      "subtotalRupees": "1200.00",
      "discountRupees": "0.00",
      "shippingRupees": "0.00",
      "taxRupees": "0.00",
      "totalRupees": "1200.00",
      "currency": "INR"
    },
    "eligiblePaymentMethods": ["prepaid"]
  }
}
```

Rules:
- Validate product/variant active state, quantities and applicable limits.
- Validate PIN-code serviceability and payment-method eligibility based on approved configuration.
- Recalculate current prices from MongoDB. Never trust totals posted by the client.
- The quote is informational; order creation recalculates and may reject stale prices or rules.
- No supplier stock or supplier details are queried/stored by the app. Manual availability confirmation, if needed, occurs outside the system.
- Replace the example zero shipping/tax values with the approved business/tax policy before production.

## 6. Create order and start payment

`POST /api/v1/orders`  
Required header: `Idempotency-Key: <random UUID>`.

Request fields include locale, product slugs/variants/quantities, customer name/email/phone, shipping address, optional gift note, payment method and separate explicit marketing consent.

Server behaviour:
1. Validate all fields, request size and locale.
2. Load active product/variant data from MongoDB.
3. Recalculate price, shipping, tax and total using exact decimal arithmetic.
4. Apply COD feature flag and product/PIN-code eligibility; default the high-value ring to prepaid only.
5. Create the order with immutable item/price snapshots and an idempotency guard.
6. For prepaid, create the payment-provider order/session server-side and return only required public checkout parameters.
7. Generate an opaque tracking token, persist only its hash and provide it securely through the order confirmation flow.
8. Store marketing consent only if the customer explicitly opted in.

Reusing the same idempotency key and payload returns the existing result; reusing it with a different payload returns `409`. Do not expose secret credentials or re-issue a tracking secret on arbitrary retries.

Example monetary values in order response:

```json
{
  "data": {
    "orderNumber": "SR-2026-7K3P9Q",
    "status": "pending_payment",
    "totalRupees": "1200.00",
    "currency": "INR",
    "payment": {
      "provider": "configured-provider",
      "providerOrderId": "provider-order-id",
      "publicKey": "provider-public-key"
    }
  }
}
```

Provider fields are placeholders pending gateway selection. The browser payment callback is not authoritative. A signed webhook or server-side verification must validate provider order ID, amount, currency and current state before marking payment successful.

## 7. Payment webhook

`POST /api/v1/webhooks/payments/{provider}`

1. Read the raw request body required for signature verification.
2. Verify signature and timestamp/replay controls before trusting fields.
3. Validate event ID, payment/provider order IDs, amount in rupees, currency and order mapping.
4. Deduplicate on `(provider, eventId)` via `integrationEventReceipts`.
5. Ignore events already processed; apply only allowed conditional status transitions.
6. Store retryable failures visibly; make replay safe.
7. Respond according to provider requirements after durable acceptance.

Never change payment status based on a query parameter, client callback or manual admin toggle.

## 8. Order tracking

`POST /api/v1/orders/track`

Request contains `orderNumber` and the opaque tracking token. Persist only a hash of the token, apply expiry and rate limits, and set `Cache-Control: no-store`.

Return only order number, current status, minimal status timeline, item title/quantity and carrier/tracking details once dispatched. Never return full address, contact details, payment IDs or internal notes.

## 9. Corporate gifting enquiry

`POST /api/v1/corporate-enquiries`

Accept company/contact details, business email, phone, expected quantity, budget per gift in rupees, target delivery date, destination, branding requirements, message and locale. Validate lengths/ranges, contact details and dates; add rate limits and anti-spam controls.

Persist the lead before asking Brevo to send a notification. A mail failure must not lose the enquiry. The MVP does not store supplier quotes or supplier-specific lead data.

## 10. Marketing subscriptions

- `POST /api/v1/marketing/subscribe`: accept email, locale, source, affirmative consent and consent-text version. Do not activate contacts without explicit consent.
- `POST /api/v1/marketing/confirm`: confirm a one-time expiring token, activate the record and sync the contact to Brevo.
- `POST /api/v1/marketing/unsubscribe`: use a verified opaque token/provider-compliant mechanism. Update local status and Brevo; never modify another person's subscription solely from a supplied email.

Bulk campaigns remain in Brevo. Transactional order emails are separate from promotional campaigns and must not be blocked by marketing unsubscribe.

## 11. Admin products and R2 assets

### Product actions

Product create/update validates bilingual copy, price in rupees, status, image keys and material disclosure. Publishing the ring requires an explicit admin action after its material/value publication gate has been met.

### `POST /api/v1/admin/assets/presign`

The server validates admin access, file type and file size (initial proposed cap: 10 MB), generates an unguessable R2 object key and returns a short-lived presigned PUT URL. Browser upload is direct to R2; credentials never reach client code. Restrict CORS to the approved admin origin. Attach uploaded object keys to products through an authenticated update.

## 12. Admin order operations without supplier-side records

- `GET /api/v1/admin/orders`: bounded list with controlled status/date filters.
- `GET /api/v1/admin/orders/{id}`: full order details for authorized admin/support.
- `POST /api/v1/admin/orders/{id}/processing`: set Silvaram's internal order/fulfilment status to `processing` and record timestamp/actor. Do not collect supplier name, supplier reference, supplier cost, external supplier order ID or supplier communications.
- `POST /api/v1/admin/orders/{id}/shipment`: record carrier, customer tracking number/URL and dispatch time; update status and send a transactional notification.
- `POST /api/v1/admin/orders/{id}/cancel`: check current state and policy. A cancellation record does not itself mean a payment refund is complete.
- `GET /api/v1/admin/corporate-enquiries` and `PATCH /api/v1/admin/corporate-enquiries/{id}`: view/update approved lead fields only.

Manual supplier communication/ordering can happen outside the application. Silvaram records only its own processing state and customer-facing delivery data.

## 13. Security and performance

- Validate server-side with a schema validator such as Zod.
- Use a vetted authentication/session library; every admin handler verifies the session and role. Apply CSRF protection where the selected session pattern requires it.
- Bound request sizes, quantities and field lengths.
- Rate-limit checkout, tracking, corporate enquiries, subscriptions, authentication and webhooks.
- Verify payment signatures against the raw body and match provider order, amount and currency.
- Keep secrets server-side; never use `NEXT_PUBLIC_*` for API keys or R2 credentials.
- Use allowlisted DTOs, controlled Mongo queries, secure session cookies and PII-redacted logs.
- Public catalogue reads may be cached and revalidated after product publication/update. Orders, tracking, admin, checkout and consent use `no-store`.
- Cache versioned R2 images aggressively.

## 14. Brevo integration

Use a server-side Brevo adapter with separate transactional templates for order/payment confirmation, shipment updates, corporate enquiry notifications and subscription confirmation, plus promotional campaigns in Brevo.

Persist business state before attempting mail. Provider failure must not undo an order or drop an enquiry. Record/retry failed notifications and keep API keys server-only. Only consent-eligible contacts receive marketing campaigns.

## 15. Future AI boundary

No autonomous AI actions are needed for launch. A future Gift Concierge may use approved public product data to recommend items or prepare a cart, but cannot change prices, material claims, payment/order state, admin data or marketing campaign membership. Normal validated checkout remains mandatory. An SEO/content assistant may draft content into human review, not auto-publish unverified product claims.

## 16. Open decisions before production

1. Payment gateway and provider-specific webhook contract.
2. Tax, invoices, shipping charges and refund/return rules.
3. COD enablement criteria and any phone verification.
4. Admin authentication provider and initial admin allowlist.
5. Tracking token expiry/recovery.
6. Brevo confirmation and webhook event configuration.
7. Final product material disclosures and ring publication decision.
8. Data retention/backups and privacy/legal review.

## 17. Approval checklist

- [x] API base path and response/error conventions accepted.
- [x] Prices represented in rupees, not paise.
- [x] No supplier-side information stored in the MVP.
- [x] Guest checkout and no customer accounts in v1.
- [ ] Server-side exact-decimal pricing and idempotency approved.
- [ ] Payment verification and webhook deduplication approved.
- [ ] Opaque-token tracking approved.
- [ ] Manual processing/shipment status flow approved.
- [ ] R2 presigned uploads admin-only and restricted to image files.
- [ ] Brevo transactional/marketing separation approved.
- [ ] Admin authorization, rate limits, caching, privacy and retry handling approved.

## References

- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js authentication: https://nextjs.org/docs/app/guides/authentication
- MongoDB Decimal128: https://www.mongodb.com/docs/manual/reference/bson-types/#decimal128-bson-data-type
- Cloudflare R2 presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Cloudflare R2 uploads: https://developers.cloudflare.com/r2/objects/upload-objects/
- Brevo transactional email: https://developers.brevo.com/docs/send-a-transactional-email
