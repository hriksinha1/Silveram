# High-Level Design (HLD)
## India-First Jewellery & Gifting E-commerce MVP

**Version:** 0.1 — architecture proposal for founder review  
**Date:** 18 October 2026  
**Status:** Draft for review; not approved for implementation  
**Parent document:** PRD v0.3  
**Scope:** High-level system structure and responsibilities only. This document does not define detailed component design, MongoDB schema, API contracts, or endpoint-level validation; those are explicitly deferred until HLD approval.

## 1. Purpose and design goals

This HLD translates the approved PRD direction into a first-release architecture for a two-product, India-first, supplier-fulfilled gifting store. The architecture favours fast delivery, public-page crawlability, safe payment handling and low operating complexity over premature service separation.

### Goals

- Support a bilingual (English/Hindi) storefront with server-rendered public product content.
- Provide a reliable guest-checkout and order-management path using a payment provider rather than handling card data.
- Allow the founder to operate a manual dropshipping workflow through a small protected admin.
- Capture corporate-gifting enquiries and notify the business without a full CRM or B2B portal.
- Support careful caching and image delivery while keeping price/order state authoritative on the server.
- Keep the codebase modular so a separate Express service or supplier API integration can be introduced later without rebuilding the UI.

### Non-goals

No microservices, Kubernetes, separate Express backend, custom payment processing, automated supplier ERP integration, customer accounts, complex B2B checkout, loyalty engine, AI shopping chatbot, AR, or large animation system in the MVP.

## 2. Architecture decisions at a glance

| Concern | Proposed decision | Reason / caveat |
|---|---|---|
| Web application | Next.js App Router + React + TypeScript | One deployable application with SSR/static rendering and server-side operations. |
| Application endpoints | Next.js Route Handlers for explicit HTTP integrations/webhooks; server-only modules/actions as appropriate | Avoid an independent API deployment for current scope. |
| Data store | MongoDB Atlas | Matches founder preference and catalogue/order scale. Exact document model is not part of HLD. |
| Public product rendering | Static/server rendering or controlled revalidation | Supports crawlers and speed; cache policy must protect freshness of price/availability. |
| Payments | An India-capable third-party gateway; Razorpay is a candidate only | Provider is not selected until business onboarding, fees, settlement, refunds and callbacks are verified. |
| Admin | Server-authenticated operator-only routes | Customer accounts are not required for guest checkout. Authentication mechanism to be chosen in detailed design after provider/hosting choice. |
| Supplier workflow | Manual stock confirmation, order submission and tracking entry | Founder confirmed manual fulfilment; keep supplier API integration out of MVP. |
| Email | Transactional email provider or verified-domain SMTP | Used for order status and corporate enquiry notifications; provider selection remains open. |
| Images | Responsive images through Next.js image handling and/or image CDN | Use authentic product photos; CDN vendor remains open. |
| Hosting | Managed Next.js-capable hosting + managed MongoDB Atlas | Reduces ops; deployment vendor/region and budget still need confirmation. |
| Analytics | Privacy-reviewed web analytics + Google Search Console | Track funnel outcomes without sending card data or unnecessary PII. |

## 3. System context

The system has five main actors/dependencies:

1. **Customer:** discovers product, switches language, views material details, checks delivery/returns, places a prepaid order or an eligible COD order, and receives status updates.
2. **Founder/admin:** manages product publication and stock availability, monitors orders and corporate leads, and forwards valid orders to the supplier.
3. **Supplier:** confirms stock, receives manually forwarded order details, dispatches product, and returns tracking/exception details to the founder.
4. **Payment provider:** creates/handles checkout and emits a payment result/webhook; the application verifies the relevant signatures and does not trust browser-only payment status.
5. **Supporting services:** transactional email, image/media delivery, analytics/Search Console, and courier/carrier used by the supplier or business.

The system does not assume supplier stock, shipment tracking or COD is integrated. Manual steps must be visible as operational tasks rather than simulated as automated states.

## 4. Proposed logical architecture

![High-level system architecture](jewellery_docs_assets/hld_architecture.png)

### 4.1 Presentation layer

The Next.js App Router serves public pages and application routes. Server-rendered/static/revalidated output is used for public catalogue and informational content. Small client components support interactions such as cart state, language switch, mobile navigation and forms. Checkout, confirmation, protected admin, or any user-specific pages must not be publicly cached.

### 4.2 Application/domain layer

Keep domain logic in server-only modules with clear boundaries (not as one large Route Handler):

- **Catalogue/content:** product publication status, display data, material details, availability and SEO metadata.
- **Pricing/checkout:** server-authoritative price and total calculations, eligible delivery/COD rules and creation of an order intent.
- **Payment coordination:** provider order/session creation, signature verification, webhook handling and idempotent event processing.
- **Order management:** order state, customer notification triggers and operational audit trail.
- **Supplier fulfilment:** manual queue/status fields, supplier reference, dispatch and tracking notes, cancellation/refund exception workflow.
- **Corporate enquiries:** form validation, persistence, notification and lead state.
- **Admin access:** authenticate operator and enforce authorisation at server boundaries.
- **SEO and localisation:** metadata generation, locale-aware page content, structured data generated only from visible and verified product facts.

Route Handlers are the HTTP boundary for webhooks and operations that need a stable request/response contract. Server Actions may be used for suitable first-party form mutations, but sensitive operations still invoke the same server-only domain functions and enforce validation/authorisation.

### 4.3 Data layer

MongoDB Atlas is the operational system of record for published catalogue facts, orders, payment state references, fulfilment state, corporate enquiries, and audit events. The database is only accessed from server-side code. Connection reuse, environment/network configuration, indexes, validation and backup details belong in the LLD/database design; they are not fixed in this HLD.

Do not store raw card numbers or security codes. Retain provider reference IDs and only the payment metadata necessary for reconciliation. Public product responses must exclude supplier cost, internal margin, operator notes and private customer details.

### 4.4 External services

- **Payment gateway:** prepaid checkout; COD remains an application/operational rule and is not assumed to be provided by the payment gateway.
- **Transactional email:** order confirmation/status and corporate enquiry notice. Email failure must not undo a valid order or lead; retry/alert behaviour is specified later.
- **Images:** responsive, compressed product photography with correct intrinsic dimensions. No generated image may replace accurate photos on the purchasable product page.
- **Analytics/Search Console:** commerce funnel events and search/index monitoring. Avoid logging names, emails, phone numbers, address or payment payloads in analytics.
- **Supplier/courier:** manual process outside the system. Admin records stock confirmation, supplier reference, tracking and exceptions.

## 5. Main system flows

### 5.1 Product discovery

1. Browser requests home/product/collection page and locale.
2. Next.js renders approved product facts, metadata and visible structured data on the server or from a controlled cached result.
3. Product images load in responsive formats, with hero priority and other images lazy-loaded where appropriate.
4. Unpublished or gated product data is excluded from public pages, search listings, sitemap and Product structured data.

**Key invariant:** a product may be displayed as purchasable only if it is published, approved for claims, and available for sale under the current operational rules.

### 5.2 Prepaid checkout

1. Customer submits cart and contact/delivery details.
2. Server re-reads product price/publication/availability and calculates totals. Client-supplied totals are not trusted.
3. Server creates an order/payment intent with a pending state and calls the payment provider using server credentials.
4. Customer completes the provider checkout.
5. Browser result is a UX signal only; server verification and/or signed provider webhook establishes payment state.
6. The application deduplicates repeated callbacks and transitions the order to the appropriate state once.
7. Confirmation is displayed/sent after the verified state; the order appears in the admin supplier-fulfilment queue.
8. Founder checks stock and forwards order manually; tracking and dispatch statuses are recorded in admin.

**Failure handling:** payment pending/failed/abandoned, duplicate webhooks, provider timeout, email failure, supplier stock-out and refund/cancellation must all be visible states. Detailed state transitions belong in the LLD.

### 5.3 COD order (conditional)

1. Server evaluates explicit eligibility policy (product, value, PIN code, availability and any required confirmation).
2. If eligibility cannot be reliably enforced or fulfilment partner terms are not confirmed, the checkout does not offer COD.
3. An accepted COD order is marked awaiting confirmation/fulfilment, not paid.
4. Founder confirms supplier availability and follows the agreed verification process before forwarding it.
5. Collection/payment state is updated after provider/carrier/supplier confirmation.

**Proposed default:** prepaid is primary, COD only for selected eligible orders, and COD for the peacock ring remains disabled until risk, insurance and RTO economics are proven.

### 5.4 Corporate enquiry

1. Visitor submits the corporate-gifting form in their chosen supported language.
2. Server validates and stores the enquiry with minimal necessary personal/business data.
3. The system sends a business notification; failure is logged and surfaced to the operator.
4. Founder qualifies the lead and follows up manually; status and notes are kept in admin.

### 5.5 Manual supplier fulfilment

1. A paid order or accepted COD order becomes ready for operational review.
2. Founder confirms product stock and dispatch estimate with supplier.
3. Founder manually submits the order using the agreed secure channel.
4. Supplier dispatches; founder records reference/tracking and updates the customer through the supported notification process.
5. If stock is unavailable, damaged, lost or delayed, the operator uses the approved customer communication/cancel/refund process.

The customer-facing page must not imply real-time supplier inventory or automatic carrier tracking when those features do not exist.

## 6. Deployment view and recommended service classes

### Proposed topology

- **Next.js application hosting:** managed host supporting the chosen Next.js version/runtime, TLS, preview deploys, environment secrets and rollback. Vercel is a candidate due to Next.js alignment, but final vendor choice requires current plan/usage and budget review.
- **Database:** MongoDB Atlas managed deployment with least-privilege credentials, private/network allowlisting where feasible, backups enabled and recovery tested. Use a deployment/region strategy supported by the chosen plan and reviewed for latency, cost and applicable data obligations.
- **Media:** start with Next.js image optimisation and hosted assets or use a dedicated image CDN if supplier photography volume/quality warrants it. Select a provider only after checking free limits, bandwidth and image transforms.
- **Email:** use a transactional email provider or business-domain SMTP. Configure SPF, DKIM and DMARC before sending customer/order messages; a verified business inbox must receive test messages.
- **Payments:** provider sandbox account first, then controlled production credentials. Never commit secret keys into source control.
- **Monitoring:** host logs plus a low-cost error tracker/uptime check. Alerts should include payment integration failures, order/webhook exceptions and corporate enquiry email failure without exposing PII.
- **Analytics:** install only necessary scripts; use a documented consent/privacy approach and exclude sensitive payload fields.

**Service choice remains open.** The architecture depends on capabilities, not on an unapproved vendor commitment. A simple managed platform is preferred over self-managed servers for a 2–3 week, ₹50,000-budget MVP.

## 7. Performance, rendering and caching strategy

- Public product/content pages should be server-rendered, statically generated or cached/revalidated when the content is stable. Public text and links must be available to crawlers without requiring client-side interaction.
- Cache policy must be deliberate. Public product response caches may be short-lived/revalidated; any product publication, price or availability update must invalidate/revalidate affected product/collection/metadata output.
- Do not cache checkout, admin, user-specific status, payment operations, form submission results or webhook responses as public content.
- Optimise images to appropriate responsive widths; give all images explicit aspect ratio/dimensions to prevent layout shift; prioritise only the actual largest-content image.
- Avoid large animation bundles, autoplay sound, heavy third-party widgets and expensive scroll effects. Test with animation disabled and `prefers-reduced-motion` enabled.
- Performance target: good Core Web Vitals at p75 as data is available; internal Lighthouse mobile score ≥90 is a QA goal, not a launch guarantee.

## 8. SEO, AEO and localisation architecture

- Define the locale URL, canonical and `hreflang` strategy before finalising routes. English and Hindi must have accurate translations rather than a cosmetic language toggle.
- Product pages use unique locale-aware title/description, readable heading hierarchy, descriptive internal links and accurate alt text.
- Generate sitemap entries only for approved, indexable pages and products; `robots.txt` must not accidentally block important content. Admin, checkout and private pages should not be indexed.
- Use Organization/BreadcrumbList and Product/Offer structured data only where appropriate; structured data must match visible facts and approved purchase availability. Do not mark up fake review/rating values.
- Add useful visible answers about material/coating, care, delivery, returns, dimensions/sizing and gift selection. AEO means clarity, crawlability and usefulness; no special schema can guarantee appearance in an AI answer.
- Connect Google Search Console and monitor crawl/index and structured-data issues after launch.

## 9. Security and trust boundaries

### Trust boundaries

- **Browser → application:** treat all submitted product IDs, amounts, quantities, coupon/discount values, COD requests and form fields as untrusted.
- **Application → payment provider:** server-only credentials; create provider intent/order server-side and store provider references.
- **Payment provider → application webhook:** verify signature using the provider's documented raw body/signature mechanism and secret; reject invalid signatures; deduplicate events.
- **Application → database:** least-privilege server credentials, input validation, no direct browser database connection.
- **Admin interface:** authenticated session plus server-side authorisation for every protected action; log significant changes.
- **Analytics/email:** send minimal needed fields; no payment secrets/card data; avoid PII in event names/URLs/log messages.

### Required security controls

- HTTPS; secret management per environment; no keys in browser bundles or repository.
- Server-side validation and access control; rate limits/abuse prevention for login, checkout, payment initiation, enquiry form and public endpoints where necessary.
- Secure cookie/session settings appropriate to the chosen auth approach; protect against injection, XSS, CSRF where relevant, and insecure direct object references.
- Payment verification and idempotent order transitions. Do not mark orders paid based only on a success query parameter or client callback.
- Database backup/restore plan and a documented access-revocation path.
- Privacy notice, retention handling and customer support/privacy workflow reviewed before launch.

Detailed threat modelling, admin auth method, session settings, rate limits and exact error handling belong in LLD/security review.

## 10. Logical data domains (not a schema)

This HLD identifies responsibility domains only. It does **not** decide collections, fields, object shapes or indexes.

- **Catalogue domain:** public product facts, language variants, publication state, price and availability.
- **Order domain:** order totals and item snapshots, customer/delivery details required to fulfil the purchase, order status.
- **Payment domain:** provider references, verification/settlement state and reconciliation metadata; never raw card data.
- **Fulfilment domain:** supplier confirmation, manual reference, courier/tracking details, exceptions and operator notes.
- **Corporate lead domain:** enquiry contact details, business requirements, consent/notice state and lead status.
- **Admin/audit domain:** operator identity/role and significant state changes.

Single source of truth: the application database is authoritative for catalogue publication, local order status and corporate leads; payment provider is authoritative for gateway-side payment evidence; supplier/carrier communication is operational evidence recorded by the operator until integrations exist.

## 11. Operational ownership and failure handling

| Event / failure | Expected high-level response | Owner in MVP |
|---|---|---|
| Supplier stock-out after order | Pause fulfilment; contact customer; cancel/refund according to policy; adjust listing availability | Founder/admin |
| Payment callback duplicated | Verify and process idempotently; do not duplicate order or fulfilment | Application |
| Payment result ambiguous | Leave order pending/reconciliation; inspect provider dashboard/logs before action | Founder/admin + application |
| Email notification fails | Keep order/lead persisted; log/retry or surface alert; send manually if necessary | Application + founder |
| Supplier misses dispatch estimate | Contact supplier; notify customer with revised facts or offer approved remedy | Founder/admin |
| Courier damage/loss | Use supplier/carrier terms, capture evidence, handle replacement/refund and update stock/policy | Founder/admin |
| Corporate form abuse/spam | Validation, rate limiting and spam detection; keep genuine leads accessible | Application |
| Admin access concern | Revoke sessions/credentials, inspect audit trail, rotate secrets if needed | Founder/admin |

Backups, restore frequency, retention windows and service-level targets need to be confirmed based on hosting/provider cost and risk.

## 12. Repository/starter strategy

A UI starter may shorten the initial build, but it is not a substitute for security review. Candidate repositories mentioned in the PRD must be rechecked at the moment of adoption for license, current activity, supported versions, dependencies, demo credentials, authentication, checkout path and data persistence. Never deploy a starter's demo payment provider or seeded administrator credentials with live orders.

**Adoption gate:**

1. Clone and run in a clean environment.
2. Review the license and dependency audit.
3. Run lint, type checking, tests and the production build.
4. Trace product-page HTML/metadata, image handling and mobile performance.
5. Inspect admin authentication/authorisation and remove demo credentials.
6. Trace server-side checkout price calculations, order persistence, payment verification and webhook idempotency.
7. List what must be replaced and assess whether reuse still saves time against the 2–3 week target.

If an existing starter introduces more work than it saves, use its design inspiration/components selectively and keep the application baseline minimal.

## 13. Phased implementation plan (conditional 2–3 weeks)

- **Phase 0 — unblock (Days 1–3):** brand/domain, verified product facts, supplier SLAs and costs, delivery/COD rules, business/payment accounts, policy/tax input, Hindi reviewer and photo rights.
- **Phase 1 — design/system setup (Days 4–7):** select responsive design prototype, freeze basic tokens, repo audit, environments, domain and initial route structure.
- **Phase 2 — core commerce (Days 8–12):** published product pages, cart/guest checkout, chosen gateway sandbox, order persistence, protected admin and manual fulfilment queue.
- **Phase 3 — release support (Days 13–16):** reviewed Hindi content, corporate enquiry, email notifications, SEO metadata/structured data, analytics.
- **Phase 4 — go-live QA (Days 17–21):** test payments/webhooks, duplicate events, supplier stock-out/refund, supported PIN codes, security/accessibility, mobile performance, SEO/indexing and live smoke test.

A missing business account, supplier agreement or ring material evidence can push the date. Prefer shipping a verified frame-only store over bypassing material or payment safety gates; founder should confirm this fallback.

## 14. Major risks and mitigations

- **Brand name missing:** prevents domain/handle and trademark screening; close before release.
- **Ring's high price versus silver-plated/coated claim:** product value and trust may be hard to substantiate; require documentation and founder approval; keep unpublished if unresolved.
- **Supplier fulfilment unknowns:** define written dispatch, shipping, returns, damage, stock and packaging terms; place test order.
- **COD/RTO economics:** start prepaid-first; COD policy should be narrow and configurable; disable ring COD by default.
- **Bilingual scope versus timeline:** use reviewed content and a small set of launch pages; do not rely on machine translation alone for policy/product claims.
- **Pan-India fulfilment not proven:** maintain serviceability rules and realistic estimates; test representative locations/PIN codes.
- **Over-engineering:** no separate Express service or advanced growth automation at launch.
- **Performance regressions from creativity:** motion budget, reduced-motion support, image optimisation and performance QA.
- **Policy changes:** revisit e-commerce policy requirements before launch and ahead of 1 January 2027, when the 2026 amendment is scheduled to take effect.

## 15. Decisions required to approve HLD

Please approve or amend the following before LLD/database/API design begins:

1. **Single Next.js deployable:** accept Next.js Route Handlers/server-only modules for MVP; no separate Express service. (Recommended: accept.)
2. **MongoDB Atlas remains source of record:** accept provider choice subject to region/backup/cost review. (Recommended: accept.)
3. **Public cache strategy:** allow static/server-rendered or revalidated product content, with explicit invalidation on publish/price/availability change; never publicly cache checkout/admin. (Recommended: accept.)
4. **Payment trust model:** server-side order creation, server-side verification/signature-verified webhook and idempotent processing required. (Required for launch.)
5. **Manual supplier fulfilment:** app records progress but no automatic supplier dispatch/inventory claim. (Recommended: accept.)
6. **COD:** prepaid primary; COD only after explicit eligibility and supplier/carrier confirmation; ring COD off by default. (Recommended: accept.)
7. **Bilingual routes:** confirm English/Hindi URL and canonical/`hreflang` pattern in LLD; no incomplete translation. (Required to close before implementation.)
8. **Deployment/provider selections:** Vercel, payment gateway, transactional email, image host and analytics are candidates only. Approve the principle of managed low-ops hosting or state vendor constraints. 
9. **Ring publication gate:** confirm it may be held back if product evidence/value/insured delivery are unresolved. (Recommended: accept.)
10. **Recovery/operations:** accept a documented manual reconciliation/backup/restore process appropriate to MVP budget; exact schedules set after provider selection.

## 16. Boundaries for the next artefacts

The HLD stops at logical responsibilities, system flows, deployment topology, caching/security boundaries and provider classes. It intentionally does not define:

- React component or module-level design.
- Exact MongoDB collection names, fields, schema validation or indexes.
- Endpoint list, HTTP payload schemas or response codes.
- Detailed order/payment state machine transitions.
- Exact authentication library/session configuration.
- Specific rate limits, retry delays or test-case matrix.

After the founder reviews and approves this HLD, the next documents can be created in order: **LLD → MongoDB database design → API contract → implementation plan**. No detailed API/database work should proceed before this approval.

## References

- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- MongoDB Next.js integration: https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/
- Google Search Central — AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Razorpay — payment verification: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/
- Department of Consumer Affairs — consumer protection rules: https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/consumer-protection
- PIB — 2026 E-Commerce Rules amendment announcement: https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=294532

---
**End of HLD v0.1 — submitted for founder review. No LLD, database schema or API contract has been generated.**
