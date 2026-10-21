# Silvaram — Current Decisions & Change Addendum

**Version:** 0.2 · **Date:** 21 October 2026 · **Status:** Founder-approved decisions, with remaining launch gates noted

This addendum accompanies PRD v0.3, HLD v0.1, LLD v0.1, Database Design v0.2 and API Design v0.2. If earlier documents conflict with this addendum or the v0.2 database/API designs, use this addendum and the newest designs as the current direction.

## Founder-approved decisions

1. **Brand:** Silvaram. Domain, social handles and any name/trademark conflicts still need verification.
2. **Architecture:** Next.js App Router, React, TypeScript, MongoDB Atlas and Next.js Route Handlers for the MVP. Express is deferred until a concrete need exists.
3. **Assets:** Cloudflare R2 for product images/media. MongoDB stores R2 object keys and metadata, not image binaries.
4. **Design-to-code workflow:** Google Stitch for exploration and screen design, Google Antigravity to implement the approved design in the Next.js repository. No Wix layer in the current production plan.
5. **Email:** Brevo for transactional email and consent-based marketing campaigns. Keep the two email categories separate.
6. **Visual direction:** Midnight Gallery + Gift Ritual—deep navy, silver contrast, minimal layouts, emotional gifting stories, youthful details and a small amount of interaction animation. Motion must be accessible and must not block product information or checkout.
7. **Launch scope:** frame and peacock ring are planned as the two product listings. The ring remains unpublished/unpurchasable until product composition, claims, price justification, sizing, returns and insured fulfilment are verified.
8. **Supplier data:** No supplier-side information is stored in the MVP database. No supplier names, costs, supplier SKUs, stock quantities, supplier order IDs/references or supplier conversations are captured. Manual coordination may occur outside the app. The app tracks Silvaram's order state and the customer's carrier/tracking information.
9. **Money representation:** Monetary fields use rupees, not paise. MongoDB uses Decimal128; API JSON uses exact decimal strings such as `"1200.00"`. The UI displays INR formatting and does not calculate authoritative checkout totals.
10. **MVP data model:** Five collections: `products`, `orders`, `corporateEnquiries`, `marketingSubscriptions`, `integrationEventReceipts`.
11. **Marketing/privacy:** Newsletter subscription is optional and requires explicit consent; unsubscribe/bounce state must be respected. Bulk campaigns run from Brevo.
12. **AI:** No autonomous AI order/payment actions in MVP. First candidates are a human-reviewed SEO/content assistant and later a bounded gift recommender using public, approved product data.

## Operational workflows retained

The founder wants supplier-fulfilled/dropshipping operations, but no supplier-specific data in the app. Manual contact with the supplier therefore takes place out-of-band. Inside Silvaram, authorised staff can mark an order as processing and record shipment carrier/tracking details. Do not add supplier-specific fields or endpoints unless the founder approves that scope later.

## Open launch gates

- Payment gateway and provider-specific webhook verification.
- Tax/invoice treatment, shipping pricing, cancellation/refund/return terms.
- COD rules and eligibility; default high-value ring to prepaid-only.
- Product material evidence and accurate English/Hindi content.
- Admin authentication, production domain and R2 public media domain.
- Brevo sender-domain setup, consent text and unsubscribe event handling.
- Data retention/backups and legal/privacy review.

## Document order of precedence

1. Current Decisions & Change Addendum v0.2
2. Database Design v0.2
3. API Design v0.2
4. PRD v0.3, HLD v0.1 and LLD v0.1 (read with this addendum)
5. Earlier PRD v0.1/v0.2 and prior review packs (historical versions)
