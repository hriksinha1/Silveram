# Silvaram Project Documentation Pack

**Pack version:** 1.0  
**Prepared:** 21 October 2026  
**Purpose:** Central bundle of all primary documents created so far, including previous PRD revisions and current database/API design revisions.

## Start here

1. `04_Database_and_API/Current_Decisions_Addendum_v0_2` records the latest founder-approved decisions.
2. `04_Database_and_API/Database_Design_v0_2` is the current database design. It uses rupees (not paise) and stores no supplier-side information in the MVP database.
3. `04_Database_and_API/API_Design_v0_2` is aligned with the current database decision: rupee-denominated decimal strings and no supplier-side fields/endpoints in the app.
4. `03_LLD/LLD_v0_1` describes implementation-level responsibilities; read it with the current decisions addendum and database/API v0.2.
5. `02_HLD/HLD_v0_1` is the architecture proposal; read it with the current decisions addendum.
6. `01_PRD_History/PRD_v0_3` is the most recent PRD file that was created before the latest brand/data-model clarification. The addendum takes precedence where older text conflicts.
7. `05_UI_UX/Google_Stitch_Brief_v0_1.md` is the design-generation brief for Google Stitch; the approved design is to be implemented in Next.js using Antigravity. Wix is not in the current stack.

## Current confirmed direction

- Brand name: **Silvaram** (domain/social-handle/trademark checks remain to be done).
- Application: Next.js App Router, React, TypeScript, MongoDB Atlas and Route Handlers.
- Media: Cloudflare R2; store object keys and metadata in MongoDB.
- Email: Brevo, separating transactional messages from permission-based marketing.
- Money: MongoDB Decimal128 amounts expressed in rupees; API JSON serializes values as exact decimal strings such as `"1200.00"`.
- Supplier data: no supplier names, supplier costs, supplier SKUs, supplier inventory, supplier order IDs/references or supplier communications persisted in the MVP database. Manual coordination can happen outside the app; the app keeps only order state and customer-facing shipment/tracking data.
- Catalogue: frame and peacock ring planned, with a material/claims/value verification gate before the ring is published.
- Design: Midnight Gallery + Gift Ritual; deep navy and silver, minimal layout, emotional gifting narrative and restrained accessible animations.
- No Wix production layer; no Express service in MVP.

## Version history included

- PRD v0.1, v0.2 and v0.3 are included for history.
- HLD v0.1 and LLD v0.1 are included with their architecture diagrams.
- Database Design v0.2 and API Design v0.2 are the current money/supplier-data references.
- Prior review-pack ZIPs are preserved under `99_Previous_Review_Packs` for archive purposes. They contain earlier document snapshots and may not include the latest amendments.

## Implementation gate

Before implementation, confirm payment provider and webhook details, tax/invoice treatment, shipping fees and return/refund policy, COD eligibility, admin authentication, tracking-token lifecycle, R2 domain/CORS setup, and Brevo sender/consent configuration. Do not generate implementation code from superseded paise/supplier-reference examples in historical drafts.
