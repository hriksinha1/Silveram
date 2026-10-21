# Silvaram Low-Level Design (LLD)
*India-first gifting and jewellery e-commerce*

**Version:** 0.1 — draft for founder review  
**Date:** 18 October 2026  
**Status:** Review draft; not approved for implementation  
**Parent:** PRD v0.3 and HLD v0.1, with the founder-approved changes recorded in this document  
**Brand:** Silvaram  
**Market:** India; pan-India delivery only where supplier/courier serviceability is verified  
**Launch target:** 2–3 weeks, conditional on supplier, payment, content, domain and compliance readiness

> **Boundary:** This LLD defines implementation-level module responsibilities, state transitions, interaction behaviours, integration patterns and tests. It intentionally does **not** define MongoDB collections/fields/indexes or endpoint-by-endpoint API contracts. Those belong to the next design stage, after this LLD is approved.

---

## 1. Purpose and implementation principles

This document converts Silvaram's approved product direction into an implementation blueprint that can be built through Google Stitch + Google Antigravity in a single Next.js codebase.

Principles:

1. **One deployable application for MVP.** Keep storefront, admin workflows and server-side integrations in a modular Next.js application. Do not add Express or microservices until a demonstrated integration or operational requirement justifies them.
2. **The server owns commercial truth.** Price, product publication, COD eligibility, order totals and payment status must be derived or verified server-side.
3. **Product trust before visual effects.** Authentic imagery and exact product-material claims take precedence over AI-generated visuals or marketing language.
4. **Motion should reward interaction, not delay shopping.** Prefer CSS transitions and a small number of controlled animations; provide reduced-motion behaviour.
5. **Manual operation is an explicit workflow.** Supplier forwarding, stock confirmation and tracking entry must be visible in admin; do not represent them as automated integrations.
6. **Integrations are adapters.** Brevo, R2, the payment gateway and the model provider sit behind server-only modules so vendors can be changed without rewriting UI/domain logic.
7. **Human approval for AI-generated marketing.** AI may draft and recommend; a person approves customer-facing content, pricing claims and email campaigns.

## 2. Decisions carried forward and new decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| L-01 | Brand is **Silvaram** | Founder-approved | Domain and social-handle availability still require checks. |
| L-02 | Next.js App Router + React + TypeScript + MongoDB Atlas + Route Handlers | Founder-approved | Separate Express service is deferred. |
| L-03 | Cloudflare R2 for product assets/media | Founder-approved | Use a custom media domain for public product imagery and cache delivery. |
| L-04 | Brevo for transactional email and consented marketing campaigns | Founder-approved | Transactional and marketing streams must be kept distinct. |
| L-05 | Small interaction animations | Founder-approved | Use CSS-first motion with a small progressive-enhancement budget. |
| L-06 | Google Stitch for exploration; Antigravity to implement the approved design in Next.js | Proposed workflow | Do not add Wix Studio to the production stack. |
| L-07 | Two products intended for launch; ring remains gated | PRD rule | The frame can launch first if ring evidence/fulfilment is not ready. |
| L-08 | Initial AI: internal SEO/content assistance, not auto-publishing | Recommendation for approval | Customer-facing Gift Concierge is a later phase. |
| L-09 | Manual supplier fulfilment and brand-owned customer support | Founder-approved | Admin must expose pending manual work and exceptions. |

### Decisions not made in this LLD

- Exact domain, final logo, approved tagline and social handles.
- Payment provider/account and final COD rules.
- Database schema, indexes, retention fields and migration plan.
- API endpoint paths, request/response schemas, webhook contracts and error payloads.
- Final screen layouts and design tokens; those follow the next UI/UX phase after database/API design as requested.

## 3. Application structure and module boundaries

The codebase should be modular within one deployable Next.js application. The following is a logical folder blueprint, not an API specification.

![Silvaram LLD component map](silvaram_lld_architecture.png)


```text
src/
  app/
    [locale]/                 # English/Hindi public route groups
      page.tsx                # Home
      products/[slug]/        # Product detail
      collections/            # Small collection/discovery pages
      gift-guide/             # Gift finder / gifting inspiration
      corporate-gifting/      # B2B enquiry page
      policies/               # Shipping, returns, privacy, terms
    admin/                    # Protected admin pages
    ...                       # Framework route handlers; exact contracts later
  components/
    layout/                   # Header, footer, locale switch, mobile nav
    product/                  # Product media, price, material, care, details
    gifting/                  # Occasion prompts, gift note, gift finder
    commerce/                 # Cart controls, checkout presentation, status UI
    forms/                    # Validated fields and form feedback
    motion/                   # Reusable motion primitives and reduced-motion helpers
    trust/                    # Delivery, return, material transparency components
  server/
    domain/                   # Catalogue, pricing, orders, fulfilment, corporate leads
    integrations/
      payments/               # Provider-specific payment adapter
      r2/                     # R2 object/media adapter
      brevo/                  # Transactional and marketing email adapter
      ai/                     # Model-provider adapter; feature-gated
    auth/                     # Admin session and permission checks
    validation/               # Shared server-side validation utilities
    observability/            # Structured logs, audit events, error reporting
  content/
    policies/                 # Version-controlled approved policy copy
    locales/                  # Static UI copy; long-form translations reviewed
  styles/
    tokens.css                # Brand tokens, focus, reduced motion
```

### 3.1 Dependency rules

- `app/` assembles pages and route-level presentation; it should not contain pricing/payment business logic.
- `components/` remain presentational where possible. Components must not contain provider API keys or access MongoDB/R2/Brevo directly.
- `server/domain/` owns business rules and coordinates persistence through repository functions introduced in the database design stage.
- `server/integrations/` contains vendor-specific SDKs and maps vendor responses into application-level outcomes.
- All privileged integrations must be server-only. Never import a server module into a Client Component.
- Public page props contain only approved product facts; supplier costs, private notes and PII must never cross into the public component tree.

## 4. Page and component responsibilities

| Area | Responsibilities | MVP constraints |
|---|---|---|
| Home | Brand promise, published products, gift intent, trust details, corporate CTA | Avoid a giant autoplay hero or long animation before product/value is visible. |
| Product detail | Actual product imagery, exact materials, dimensions/sizing, price, care, dispatch estimate, returns and CTA | A product that fails its publication gate cannot render as purchasable. |
| Cart | Quantity, selected items and estimated order summary | Totals displayed in UI are provisional; server recomputes at checkout. |
| Checkout | Contact/delivery capture, serviceability checks and prepaid/COD option | Guest checkout; no customer-account system in MVP. |
| Confirmation/status | Acknowledgement and clear next steps | Paid status comes from server verification, not only a browser redirect. |
| Corporate gifting | Budget/quantity/occasion/customisation/delivery enquiry | Saves lead and triggers Brevo notification; no B2B checkout. |
| Admin | Product publish/unpublish, order queue, supplier confirmation, dispatch/tracking notes, corporate lead status | Only authorised operator(s); every mutation checked on server. |
| Gift finder | Recipient, occasion and budget prompts leading to available products | MVP should be rule-based; do not require a live LLM call to complete the journey. |

## 5. Rendering, state and interaction boundaries

### 5.1 Rendering strategy

- Use server rendering or static generation/revalidation for public content and published products.
- Use Client Components only where browser interaction is necessary: cart interaction, locale toggle, mobile navigation, product gallery state, gift finder, form feedback and animation.
- Do not cache checkout, admin, payment actions, enquiry submissions, personal status views or any response containing customer-specific information as public content.
- Revalidate/invalidate product pages and associated metadata whenever product publication, price or sellable availability changes.
- Product schema/metadata must reflect the actual visible page and verified product claims.

### 5.2 State ownership

- **Server-authoritative state:** published status, price, availability, shipping/COD eligibility, order totals, order/payment status and admin permissions.
- **Client-only transient state:** open navigation, gallery index, selected gift-finder answers and cart presentation before checkout.
- **Persisted order state:** changes only through validated server-side operations and verified provider events where relevant.
- **Do not infer:** a successful payment from query parameters, a successful supplier dispatch from a local button click, or a delivered order from an unverified tracking entry.

### 5.3 Form behaviour

- Validate inputs in the browser for fast feedback and validate again on the server.
- Preserve entered values after recoverable validation failures where safe.
- Show clear loading, success, failure and retry states; prevent accidental double-submission.
- Enquiry forms must include consent/notice language appropriate to follow-up and must be protected against spam and abusive volume.

## 6. Animation and interaction specification

### Visual north star

**Midnight Gallery + Gift Ritual**: midnight navy, silver contrast, clean white/ivory surfaces for reading, and warm storytelling in gift-related sections. The final palette, type scale and screen compositions are deliverables of UI/UX design, not fixed by the LLD.

### Motion rules

| Interaction | Behaviour | Implementation guidance |
|---|---|---|
| Navigation/menu | Short fade/slide for open and close | CSS transition; keyboard and focus behaviour remain correct. |
| Product card hover | Small image scale or gentle reveal of a secondary image | Keep movement subtle; no layout shift; disable on reduced motion/touch where appropriate. |
| Product gallery | Smooth cross-fade or controlled slide between real product images | Do not delay first product image or block touch gestures. |
| Add-to-cart | Immediate button feedback and a small cart-state confirmation | No blocking full-screen transition; prevent duplicate action. |
| Gift-story preview | Optional card/reveal interaction showing what a gift note/story could feel like | Do not promise supplier-printed notes or QR inserts until fulfilment capability is confirmed. |
| Scroll entrance | Optional one-time opacity/transform reveal for selected sections | Use sparingly; avoid scroll-jacking and repeated motion on every scroll. |
| Form feedback | Short success/error state transition | State must also be conveyed textually and to assistive technology. |

### Motion implementation

- Start with CSS transitions, `transform` and `opacity`; these are usually easier to keep lightweight than a large animation system.
- Add a React motion library only if the prototype genuinely requires sequencing/shared-layout behaviour that CSS cannot express cleanly.
- No autoplay sound, no cursor hijacking, no mandatory animation before add-to-cart/checkout, and no perpetual motion on essential text.
- Respect `prefers-reduced-motion`; use a simplified/no-motion fallback for decorative transitions.
- Check mobile touch behaviour, focus visibility and layout stability. Motion must not cause CLS or hide content before it is readable.
- Target usability first; Lighthouse performance goals remain in the PRD. Verify with a production build on representative mobile viewports.

## 7. Cloudflare R2 media handling

### Purpose and layout

Cloudflare R2 will store approved product photos and website media. Configure a custom media domain such as `media.silvaram.example` as a documentation placeholder; replace it after the production domain is selected. Cloudflare documents that custom-domain access enables Cloudflare Cache for R2 objects; public bucket access must therefore be treated deliberately. Reference: [R2 cache configuration](https://developers.cloudflare.com/cache/interaction-cloudflare-products/r2/) and [R2 public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).

Suggested logical separation:

- **Public product media:** approved product images and publicly served decorative assets only.
- **Restricted staging/original uploads:** optional admin-only area for unreleased product photos and working files; do not expose these by using public paths.
- **Environment separation:** development/staging assets must not be accidentally referenced by production product pages.

### Upload and publishing flow

1. Admin uploads the exact product photo through a protected flow.
2. Server checks admin authorization, file size/type allowlist and intended object key; generates a short-lived, narrowly scoped upload URL when direct browser upload is used.
3. Browser uploads directly to R2 over HTTPS; R2 credentials never reach the browser.
4. Server validates upload completion, records the asset as a draft and prevents publication until the operator associates it with the correct product and confirms its accuracy/rights.
5. On publication, the asset is referenced by its stable media URL; content updates trigger the relevant page revalidation.

R2 supports S3-compatible presigned URLs for individual GET/PUT operations, and Cloudflare warns that anyone possessing a URL can perform its permitted action until expiry. Use short expiry, constrained object keys and appropriate content-type checks. Reference: [R2 presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/).

### Image delivery rules

- Provide descriptive alt text; alt text describes the real item, not marketing adjectives alone.
- Use responsive dimensions, compressed WebP/AVIF where supported and stable aspect ratios.
- Prioritise the actual hero/LCP image; lazy-load below-the-fold gallery images.
- Configure the Next.js image loader/remote allowlist deliberately for the approved R2 media hostname; do not allow arbitrary remote image hosts.
- Keep original masters; use versioned/stable asset keys so replacing a photo does not produce stale CDN content.
- Do not publish AI-generated imagery as an exact representation of the frame or ring. Conceptual campaign art must be clearly separated from photos of the sale item.

## 8. Brevo email integration

Brevo is the selected email service for both transactional messages and permissioned marketing communication. These uses have different trigger and consent requirements and must stay separate in the application.

### Transactional stream

- Order created / payment confirmed / order status change (only after the associated event is verified).
- Corporate enquiry acknowledgement and internal notification.
- Operational emails use approved templates and minimal required personal information.
- Email failures must not undo an order or enquiry that was successfully persisted. Record the failure, retry safely or expose it to the admin for manual follow-up.

### Marketing stream

- Newsletter/promotional campaigns only to contacts with recorded, appropriate permission and a working unsubscribe/suppression process.
- Do not automatically add checkout addresses to marketing campaigns without a compliant consent path.
- Keep marketing opt-in independent of purchase completion.
- Do not use Brevo to blast scraped or purchased lists. For B2B prospecting, use targeted, relevant outreach and respect objections/opt-outs and applicable law/provider terms.
- Require human approval of campaign content, target segment, language and send time. Never let an AI agent send or schedule a campaign without a human gate.

### Integration constraints

- Keep API keys in server-side environment secrets only.
- Use separate templates/labels for transactional versus campaign communication.
- Verify sending domain and configure SPF/DKIM/DMARC before launch; test delivery to multiple mailbox providers.
- Use provider webhooks/events for relevant delivery, bounce and unsubscribe states if configured; verify incoming webhook requests according to current Brevo documentation.
- Keep personally identifiable data out of application logs and analytics events.

References: [Brevo transactional email API](https://developers.brevo.com/docs/send-a-transactional-email) and [Brevo marketing webhooks](https://developers.brevo.com/docs/marketing-webhooks).

## 9. Payment, order and manual fulfilment behaviour

Detailed provider-specific API contracts are deferred, but the behaviour must be implemented as follows:

1. Checkout submits product identifiers and quantities—not trusted final totals.
2. Server validates product publication, current price, quantity limits, serviceability and COD eligibility and calculates the order total.
3. Prepaid payment is initiated through the selected gateway; gateway secrets remain server-side.
4. Payment success is accepted only after the provider's documented verification process (signed webhook and/or signature verification), with duplicate notifications handled idempotently.
5. The customer sees a pending state until the payment is verified. An ambiguous result is not automatically treated as paid or failed.
6. An operator sees orders requiring manual supplier confirmation. They confirm stock and fulfilment terms before forwarding the order to the supplier.
7. The operator records supplier acceptance, dispatch/tracking information and exceptions. Customer communications use verified facts only.
8. Supplier stock-out, damage, delayed dispatch or loss triggers the documented support path; refund/cancellation must follow provider capability and approved policy.

### COD gate

- Prepaid-first is the safe launch default.
- Do not enable COD until shipping partner/supplier support, PIN-code serviceability, return-to-origin cost ownership, order confirmation and reconciliation are tested.
- The ring should default to prepaid-only until explicit risk approval. Do not introduce COD merely because it improves a checkout metric.

## 10. AI agent strategy and guardrails

### What will (and will not) drive traffic

An agent is a productivity tool, not a traffic source by itself. Search visits depend on useful content and technical discoverability; word-of-mouth depends on product experience and share-worthy service. For Silvaram, AI should reduce the cost/time of doing these tasks, not mass-produce thin pages or unsolicited emails.

### Recommended sequence

**Phase 0 / pre-launch: use the build agent, not a runtime shopping bot.**

- Use Google Stitch to iterate the visual concepts.
- Export/hand off approved screens into Antigravity and implement them in the Next.js repository. Google has documented this export workflow. Reference: [Google Stitch product update](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/).
- Keep AI-generated code reviewed, type-checked, linted, tested and previewed; never grant the coding agent production secrets or unrestricted production access.

**Phase 1 / internal content assistant (optional, post-launch or controlled pre-launch):**

- Use a server-side model API adapter. Gemini API is the recommended first candidate because it supports function calling and fits the Google-oriented build workflow; keep the model behind an interface so it can be swapped after cost/quality evaluation.
- Allowed functions should be read/draft-only: read approved product facts and FAQs, propose topic clusters, generate a draft product description or gift-guide outline, suggest internal links and prepare a bilingual draft.
- Human reviews every claim and publishes manually. The model must not invent silver purity, prices, inventory, delivery promises, testimonials or reviews.
- Do not connect it to order mutation, refunds, supplier dispatch, customer-data exports or bulk-email sending.

**Phase 2 / customer-facing Gift Concierge:**

- First experiment with a rule-based gift finder: recipient, occasion and budget map to verified catalogue records.
- Add a model-driven concierge only if traffic/conversion data justifies it. The model may interpret customer needs and explain recommendations, but catalogue search and displayed product facts come from application logic. Use a bounded FAQ/product tool set, rate limiting, budget caps, logging without PII and an easy handoff to human support.

### Model/product comparison

| Option | Best fit for Silvaram | Recommendation |
|---|---|---|
| Google Antigravity | Build, refactor, test and iterate on the codebase | Use for development; not a website runtime agent. |
| Gemini API | A custom internal content assistant, then possibly a bounded Gift Concierge | Preferred first API candidate; evaluate quality/cost and keep provider-neutral boundaries. |
| OpenAI API / agents | A viable alternative if quality, tooling or account access is better for the use case | Keep as a provider alternative; do not add alongside Gemini by default. |
| Grok API | Technically supports tool/function calls | No clear MVP advantage for this stack; consider only after benchmark testing. |
| Dots / Meta Muse | General-purpose personal/work agents, not the default embedding architecture for the Silvaram store | Do not treat the consumer agent app as the website integration. Use a documented developer API and server-side guardrails if a provider is selected. |

References: [Gemini API function calling](https://ai.google.dev/gemini-api/docs/function-calling), [OpenAI tools](https://developers.openai.com/api/docs/guides/tools), [xAI function calling](https://docs.x.ai/developers/tools/function-calling), [OpenAI Dots announcement](https://openai.com/index/introducing-dots/).

## 11. SEO, AEO and bilingual content behaviour

- Route structure and locale strategy must be finalised during UI/UX and API/database design, before URLs are published.
- Server-render the meaningful content of product and gifting pages; avoid loading the product name/description only after JavaScript runs.
- Product facts, materials, prices and availability must match visible copy and any structured data.
- Provide accurate titles/descriptions, canonical handling, language alternates, sitemap/robots behaviour and breadcrumb/product structured data where applicable.
- English and Hindi must be human-reviewed. Avoid machine-translating material claims, policies or support commitments without review.
- Create content that answers actual purchase questions: composition, dimensions, care, delivery, returns, gift selection and packaging.
- AI-drafted SEO content is not automatically publishable. Merge duplicate topics, require useful original value and review facts. Do not generate hundreds of near-duplicate pages or make inclusion in AI answers a promise.
- Configure analytics and Google Search Console after the domain is connected. Track impressions/clicks, qualified visits, product engagement, checkout conversion and referrals.

## 12. Error handling, logs and operational visibility

- Use structured server logs with correlation identifiers for checkout/payment/notification errors, but remove names, email addresses, phone numbers, full addresses, payment secrets and raw webhook payloads where not needed.
- Public forms should return plain-language validation messages and a safe retry option; do not expose stack traces or provider credentials.
- External-service failure must be isolated: an email outage must not undo a confirmed order; a model API outage must not break checkout; an R2 upload failure must not publish a broken image.
- Admin should clearly show unsent/retry-needed notifications and orders with unresolved supplier/payment states.
- Use a low-cost error tracker/uptime monitor once chosen, and establish who is responsible for reviewing alerts.
- Apply timeouts and bounded retries to third-party calls; avoid unbounded retry loops for paid or mutating operations.

## 13. Security, privacy and accessibility details

- Secrets stored only in deployment secret management; separate development/staging/production keys.
- Admin actions authorised server-side on every request; no security based only on hiding UI buttons.
- Validate all fields and constrain file types/sizes before R2 upload. Presigned URLs must be short-lived and scoped to a single intended object/operation.
- Payment webhooks require provider signature verification and duplicate-event protection.
- Add rate limiting/spam protection for sign-in, checkout, corporate enquiry and any AI endpoints.
- AI prompts must use approved public product/policy material and must not include customer addresses, payment details or private order notes unless specifically justified and approved.
- Keyboard navigation, visible focus states, labels, form error announcements and adequate contrast are required.
- Respect `prefers-reduced-motion`; essential information cannot be available only through hover or animation.
- Provide a fallback when scripts, animation or AI services are unavailable.

## 14. Test and acceptance strategy

### Component/UI tests

- Product card, price display, language switch, cart controls, gift-finder outcomes, form validation states and animation reduced-motion behaviour.
- Product details show accurate material text and do not imply unsupported purity claims.

### Integration tests

- Product published/unpublished visibility and SEO output.
- Server-side recalculation of totals; invalid or stale product state is rejected safely.
- Payment pending/success/failure and duplicate webhook handling using gateway sandbox or fixtures.
- Brevo transactional notification, marketing opt-in independence, unsubscribe/suppression handling and failure isolation.
- Admin asset upload flow rejects disallowed type/size and does not expose R2 credentials.
- Corporate enquiries persist even if notification delivery fails.
- Locale routes and metadata render correctly for English and Hindi.

### End-to-end tests

- Frame: product page → cart → prepaid checkout sandbox → verified confirmation → admin fulfilment queue → manual dispatch/tracking entry.
- Ring: remains unavailable when the publication gate is false; once approved, test its actual product facts and COD restriction.
- Corporate gifting enquiry from mobile and desktop.
- No AI provider access or availability is required for shopping/checkout to function.

### Launch checks

- Keyboard and reduced-motion review; mobile viewport review; production-like performance run.
- Core Web Vitals goals remain LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at p75 once field data is sufficient; Lighthouse ≥ 90 is a target, not a guarantee.
- Correct domain, TLS, email authentication, payment gateway production settings and environment secrets.
- Product-image accuracy, rights, language review and policies signed off by the business.
- Test that admin/checkout responses and private/customer-specific information are not publicly cached or indexed.

## 15. Suggested delivery sequence for the 2–3 week target

| Window | Work | Completion gate |
|---|---|---|
| Days 1–3 | Confirm domain, asset rights/specs, supplier terms, payment provider, COD rule and Brevo sender setup | No unresolved blocker silently bypassed. |
| Days 4–6 | Convert Stitch prototype into implementation-ready screens; setup Next.js code structure, theme tokens and R2 media delivery | Responsive design direction approved; no Wix layer. |
| Days 7–10 | Catalogue/product pages, cart/checkout shell, admin basics and manual fulfilment workflow | Critical shopping and admin paths work in preview. |
| Days 11–13 | Payment sandbox/verification, Brevo transaction templates, corporate enquiry and bilingual content | Integration failures handled without data loss. |
| Days 14–17 | SEO/accessibility/motion/performance hardening and full end-to-end tests | No critical issue in purchase, publication gates or security. |
| Days 18–21 | Soft launch, controlled real order, operations checklist and monitored rollout | Launch only if supplier/payment/content/legal gates are met. |

The timeline assumes prompt provider onboarding, usable professional product images and a supplier ready to confirm operational terms. If not, launch the verified frame first and defer the ring or any non-essential feature.

## 16. Critical unresolved questions for LLD approval

1. What is the approved production domain and who controls its DNS? Is the intended `media` subdomain available for R2?
2. Is the product imagery licensed for Silvaram's use, and are the frame and ring photos exact representations of the shipped items?
3. What is the final R2 bucket/domain arrangement for public assets versus unreleased uploads? Who is allowed to publish media?
4. Which payment gateway will be onboarded, and what exact COD, refund, settlement and webhook facilities are available?
5. Does the supplier support pan-India serviceability, insured ring delivery, branded/plain packaging, gift notes, return freight and damage claims?
6. Which Brevo plan/account will be used? Who owns the sending domain and approves marketing-consent wording and Hindi campaigns?
7. Is the first AI scope accepted as an internal draft-only content assistant after launch, with the customer-facing Gift Concierge deferred?
8. What is the business/admin contact and who will operate the admin queue during launch?
9. Who approves final Hindi translations and policy content?

## 17. Review and sign-off checklist

Approve or amend the following before the next stage:

- [ ] The module boundaries and folder blueprint are appropriate.
- [ ] The CSS-first motion budget is sufficient; reduced motion is mandatory.
- [ ] Cloudflare R2 public-media and restricted-upload handling is appropriate.
- [ ] Brevo transactional/marketing separation and human approval rules are accepted.
- [ ] AI remains draft-only initially; no agent can publish, change orders, issue refunds or send campaigns autonomously.
- [ ] Wix is not added to the selected Next.js production stack.
- [ ] The LLD boundary is respected: database schemas and detailed API contracts remain deferred.
- [ ] Critical operational unknowns have owners and a resolution plan.

**Next stage after LLD approval:** database design and API contract design. After those documents are locked, proceed to the detailed UI/UX design in Google Stitch and implement via Antigravity.

---

## References

- Google Stitch design/export workflow: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/
- Google Antigravity IDE overview: https://www.antigravity.google/docs/ide/overview/
- Cloudflare R2 presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Cloudflare Cache with R2: https://developers.cloudflare.com/cache/interaction-cloudflare-products/r2/
- Cloudflare R2 public buckets: https://developers.cloudflare.com/r2/buckets/public-buckets/
- Brevo transactional email: https://developers.brevo.com/docs/send-a-transactional-email
- Brevo marketing webhooks: https://developers.brevo.com/docs/marketing-webhooks
- Gemini API function calling: https://ai.google.dev/gemini-api/docs/function-calling
- OpenAI API tools: https://developers.openai.com/api/docs/guides/tools
- xAI function calling: https://docs.x.ai/developers/tools/function-calling
- Wix Studio FAQs: https://support.wix.com/en/article/wix-studio-faqs-using-the-studio-editor

---
**End of Silvaram LLD v0.1 — draft for founder review.**
