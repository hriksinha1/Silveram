# Product Requirements Document (PRD)
## India-First Jewellery & Gifting E-commerce MVP

**Version:** 0.3 — founder clarifications incorporated  
**Date:** 18 October 2026  
**Status:** Proposed baseline for architecture review; critical launch blockers remain  
**Brand name:** Not supplied in this document; founder indicates a name exists  
**Market:** India only, pan-India shipping subject to supplier/courier confirmation  
**Launch target:** 2–3 weeks, conditional on supplier, payment, compliance and content readiness  
**Budget cap:** ₹50,000 initial launch budget  
**Business model:** Supplier-fulfilled / dropshipping; orders and fulfilment handled manually in the MVP

> This PRD is the source of truth for the first release. It records decisions already made, identifies assumptions that still need validation, and separates launch scope from deferred enhancements. Architecture is intentionally simple: Next.js App Router + React + TypeScript, MongoDB Atlas and Next.js Route Handlers. A separate Express service is deferred until a concrete need exists.

## 1. Executive summary

Build a youthful, minimalist, emotionally resonant Indian gifting and design e-commerce brand. The store will launch with two planned products: a silver-coated decorative/photo frame and a peacock ring described by the supplier as silver-plated or silver-coated. The website will use an editorial midnight-navy/silver design with warmer gifting storytelling, authentic product imagery, restrained motion, bilingual English/Hindi customer-facing content, prepaid checkout plus carefully limited COD if operationally supportable, a simple admin, and a corporate-gifting enquiry flow.

The experience should create curiosity, help shoppers imagine the recipient’s reaction, build confidence with accurate product facts, and give customers a natural reason to recommend the brand. The site must remain fast, accessible, crawlable and commercially clear. Word-of-mouth is a hypothesis to validate through the quality of the product and unboxing, optional gift storytelling, responsive support, and later referral experiments—not a substitute for sound unit economics.

### Current products and known economics

- **Silver-coated frame:** supplier cost ₹450; intended retail price ₹1,200; raw price-minus-supplier-cost spread ₹750 (62.5% of retail price). The cost and target price were provided by the founder. Exact base material, coating description, cost inclusions, packaging, shipping, taxes and return terms remain to be confirmed.
- **Peacock ring:** supplier cost ₹8,000; intended retail price ₹12,000–₹14,000; raw spread ₹4,000–₹6,000 (33.3%–42.9% of retail price). The cost and target range were provided by the founder. The supplier describes the product as silver-plated/coated; exact composition, construction, documentation, value proposition, sizing, insurance and return economics must be validated.

The above prices are not evidence of profitability. The business must calculate contribution per SKU after shipping, packaging, payment fees, taxes, returns/RTO, discounts and acquisition costs before scaling advertisements.

**Publication gate:** Both products are in the intended launch catalogue. The frame can be published only after its material and fulfilment facts are verified. The ring must remain hidden/unpurchasable until its composition and all product claims are verified, the ₹12,000–₹14,000 price is approved, and safe insured fulfilment and returns are confirmed. If this gate is not met, the ring may be held back without blocking the frame launch; founder confirmation of this fallback is still required.

## 2. Product vision and positioning

**Working positioning:** A contemporary Indian gifting and design brand offering distinctive keepsakes and statement pieces for meaningful moments, personal milestones and self-expression.

**Creative direction:** “Midnight Gallery + Gift Ritual”—deep navy and silver contrast, minimalist product presentation, elegant light surfaces for shopping, and human gifting stories. Final brand name, logo, tagline and voice are not included because the founder has not supplied them yet.

**Working campaign line:** “Give a memory a place to live.” This is a creative hypothesis suited to a frame, not approved final copy or a permanent brand promise.

### Brand experience sequence

1. **Curiosity:** a strong product-led visual or gifting prompt earns attention without hiding the item or price.
2. **Imagination:** connect the product to a real moment—thank you, milestone, celebration, memory or “just because.”
3. **Confidence:** provide verified material facts, dimensions/size, care, dispatch estimate, delivery coverage, returns and support.
4. **Gift intent:** make gift-ready choices and a message option clear if fulfilment can reliably support them.
5. **Memory and sharing:** invite feedback and optional sharing after delivery, with privacy respected.

### Principles

- Trust before hype; never imply that a coated product is solid silver or 925 sterling silver without evidence.
- Design-led, not animation-led; avoid blocking the product, price or purchase action.
- Two planned launch SKUs, not an open-ended catalogue.
- India-first payments, address handling, customer service, policies and shipping.
- Manual first, automate only after the supplier and business justify it.
- No fake reviews, fake scarcity, invented testimonials, misleading material claims or dark patterns.

## 3. Objectives and success measures

### Business objectives

- Launch a real, secure, mobile-first store within the ₹50,000 budget cap, provided external dependencies are ready.
- Validate product interest and fulfilment quality for the frame and, only after its publication gate, the ring.
- Establish reusable visual and technical foundations for additional SKUs.
- Capture corporate-gifting enquiries with a dedicated landing page and a manual follow-up workflow.
- Support foundational SEO and answer-engine discoverability (AEO) through accessible, accurate, crawlable content—not special markup promises.
- Track the complete funnel and channel contribution so that low-cost growth experiments are measured rather than assumed to work.

### MVP success measures

- A customer can browse the published product(s), understand its composition and terms, place an order, and receive a confirmation.
- An admin can edit product facts and availability, review orders, forward an order to the supplier manually, and record tracking/status.
- The payment/order flow does not rely on unverified browser state; webhook or provider callbacks are verified server-side where applicable and handled idempotently.
- Corporate enquiries are saved and notify the business inbox; an operator can track their status.
- Analytics record product view, add-to-cart, checkout start, verified purchase and corporate enquiry without transmitting unnecessary personal data.
- No critical checkout, access-control, payment-integrity or product-claim defects remain at launch.
- Performance aims for good Core Web Vitals at the 75th percentile when sufficient real-user data exists: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Lighthouse mobile ≥ 90 is an internal target on representative pages, not a guarantee.
- Contribution margin can be calculated for each SKU with actual operating costs.
- Referral and creator attribution can be measured before automated rewards are enabled.

## 4. Target users and main journeys

### Consumer / gift buyer
Wants an attractive and trustworthy product, easy gift inspiration, clear price, realistic delivery expectations, simple checkout and responsive support.

**Journey:** home/landing page → product page → materials/care/delivery/returns → cart → guest checkout → payment or COD eligibility decision → confirmation → status updates/support → optional feedback/share.

### Corporate gifting buyer
Wants a responsive supplier who can confirm quantity, budget, personalisation, packaging, delivery date, invoicing and reliability.

**Journey:** corporate-gifting page → view or request a concise catalogue → enquiry form → business follow-up → quote/sample/terms by email or phone. No full B2B portal in MVP.

### Founder / operator
Needs a small protected admin for product content and availability, orders, supplier references, tracking, exception handling and corporate leads.

**Journey:** admin login → product/order/enquiry list → check supplier stock → manually place order with supplier → record tracking/status → send update → resolve exception/refund.

## 5. Scope and releases

### In scope — MVP / Release 1

- Responsive, mobile-first storefront; bilingual English and Hindi for principal customer-facing pages.
- Home page with brand story, published products, gifting intent cues, trust details and corporate-gifting CTA.
- Product pages for the frame and ring as approved by their publication gates. A hidden/unapproved product must not appear in listings, search results, sitemap or structured data and must not be purchasable.
- Simple product/collection navigation appropriate to a two-SKU catalogue.
- Product detail fields: title, truthful composition/material wording, photos, price, dimensions/sizing where relevant, care, availability, dispatch/delivery estimates, returns, support and SEO metadata.
- Cart and guest checkout.
- One payment gateway selected after account eligibility, fee, settlement and refund workflow are checked. Prepaid digital payment is the default.
- Limited COD only if supplier/carrier support, eligibility controls and a workable confirmation/fraud/RTO process are validated. Proposed safety default: COD disabled for the ₹12,000–₹14,000 ring; final rule must be confirmed before activation.
- Order confirmation and transactional email; business support details.
- Lightweight protected admin for product content/availability, order review, status/tracking, and corporate enquiries.
- Manual supplier workflow: confirm stock, submit order, record supplier reference and tracking, handle order exceptions.
- Corporate-gifting landing page and enquiry form; enquiry notifications and manual lead statuses.
- Gift message/occasion only if fulfilment supports it correctly. If the supplier cannot include a message, offer no promise to do so; a later insert/card can be tested after operations are proven.
- Gift-story concept in the design and post-purchase messaging; automated referral rewards and QR recipient pages are deferred until fulfilment and privacy design are proven.
- Essential policy pages: About, Contact, FAQ, Shipping, Returns/Refunds, Privacy, Terms, seller/contact and grievance information as applicable, after legal review.
- Technical SEO: server-rendered or static public content, unique titles/descriptions, canonical URLs, robots.txt, sitemap, appropriate JSON-LD, Open Graph, internal links, Search Console and privacy-reviewed analytics.
- Minimal analytics events for commerce and corporate lead funnel.

### Out of scope — MVP

- Separate Express API service.
- Mobile apps, international sales, multi-currency or international shipping.
- Marketplace/multi-vendor accounts.
- Customer accounts, loyalty points, subscriptions, wishlist and advanced search.
- Full B2B portal, bulk checkout, negotiated price lists, purchase orders, credit terms and approvals.
- Automated supplier inventory/order API, unless supplier unexpectedly provides a secure low-effort integration that is separately approved.
- Automated referral-reward engine, QR gift-story microsite, advanced gift quiz or AI shopping chatbot.
- AR/virtual try-on, WebGL scenes, scroll-jacking, full-screen intro animations or GSAP by default.
- Custom-built CMS or custom payment system.
- Unsupported claims about hallmarks, purity, stones or craftsmanship.

## 6. Functional requirements and acceptance criteria

Priority: **P0 = launch required; P1 = useful after core journey works; P2 = deferred.**

### Storefront, language and discovery

- **FR-01 (P0):** Home, product, cart, checkout, confirmation, policies and corporate-gifting pages work on common mobile, tablet and desktop viewport sizes.
- **FR-02 (P0):** Published product pages show actual SKU imagery and verified product facts: material/coating, price, dimensions/sizing, care, availability, delivery/dispatch, returns and support.
- **FR-03 (P0):** English/Hindi language selection works for all launch-critical navigation, checkout labels, error messages, policies and product content. Human review is required for Hindi copy; untranslated fallback or mixed-language text must not be presented as complete localisation.
- **FR-04 (P0):** Every indexable locale/page has unique title/description, canonical URL, one clear H1, meaningful internal links, alt text, and crawlable content in initial HTML. Locale URLs and hreflang/canonical policy are to be fixed in HLD/LLD.
- **FR-05 (P0):** Cart quantity changes and removal work; authoritative price/discount/shipping totals are calculated server-side.
- **FR-06 (P0):** Guest checkout validates required customer/contact/address fields and displays the final payable total and relevant terms before order commitment.
- **FR-07 (P0):** Availability, delivery, shipping, return/refund, privacy and support details are visible before purchase.
- **FR-08 (P1):** Search/filter, gift finder and richer collection navigation are deferred until more SKUs exist.

### Payment, orders and fulfilment

- **FR-09 (P0):** Payment order/session is created server-side; payment signature/webhook is verified server-side according to chosen provider docs; duplicate callbacks cannot create duplicate paid orders or fulfilment actions.
- **FR-10 (P0):** Order stores a snapshot of the bought product name/SKU/price/quantity and relevant totals so later product edits do not rewrite history. Exact schema is deferred to database design.
- **FR-11 (P0):** Customer order confirmation is generated only after the appropriate verified event/state. Email failure must not lose the order; failures are logged and retried or surfaced to the operator.
- **FR-12 (P0):** Admin can view an order and update a controlled fulfilment state, supplier reference, tracking and notes. Exact state transitions are deferred to the LLD.
- **FR-13 (P0):** Supplier stock is manually verified before dispatch. If stock is unavailable after payment, the business must have a pre-approved customer communication, cancellation and refund process.
- **FR-14 (P0):** Pan-India is a business objective, not a guarantee until supplier/carrier PIN-code coverage, delivery SLAs, charge handling and exceptions are tested. Block unsupported PIN codes or disclose unavailable delivery clearly.
- **FR-15 (P0):** COD, if enabled, has a controlled eligibility rule and a recorded payment/collection state; COD is not automatically permitted for every product/location. Ring COD remains disabled by default.
- **FR-16 (P1):** Automated carrier tracking integration is deferred; manual tracking/status updates are acceptable for MVP.

### Admin and corporate gifting

- **FR-17 (P0):** Admin functions are protected by server-side authentication/authorisation; hiding UI controls alone is not security.
- **FR-18 (P0):** Admin can publish/unpublish a product and edit customer-facing copy, images, price, availability and SEO metadata. Internal supplier cost/margin is never exposed to public clients.
- **FR-19 (P0):** Corporate form validates and records company/contact details, email/phone, product/gift type, quantity range, budget per gift, required date, location, customisation and consent/notice text as applicable.
- **FR-20 (P0):** New corporate enquiry notifies the business inbox; admin can mark new/contacted/quoted/won/lost and add operational notes.
- **FR-21 (P1):** Downloadable corporate catalogue and quotation templates are maintained manually.

### Word-of-mouth and analytics

- **FR-22 (P0):** Track product_view, add_to_cart, begin_checkout, verified purchase, corporate enquiry, referral/creator source where available, and optional gift-message selection. Never send card data or unnecessary customer PII to analytics.
- **FR-23 (P0):** Customer messaging requests honest feedback, makes sharing optional, and is not conditional on a positive review. Support issues should be resolved before promotional asks.
- **FR-24 (P1):** Referral codes/links and two-sided rewards are considered only after actual per-order contribution margin and returns/RTO are measured.
- **FR-25 (P2):** QR gift-story page, gift quiz, automated referrals, loyalty and CRM flows are deferred.

## 7. Design, interaction and accessibility requirements

### Preferred system

- **Midnight Navy:** `#0C1B36` — anchor colour for hero and story sections.
- **Porcelain:** `#F7F5F0` — light shopping surface.
- **Silver Mist:** `#D9DFE8` — dividers, neutral accents and supporting surfaces; use contrast-checking per component.
- **Electric Cobalt:** `#6178FF` — restrained accent; choose compliant variants when used for text or small controls.
- **Graphite:** `#222B3A` — primary text on light backgrounds.

The final palette and typography require contrast testing and a prototype review. Use authentic photography that accurately represents the SKU, with deliberate dark/light visual pacing; don't make every page dark.

### Motion budget

- Use CSS opacity/transform for most transitions.
- Keep a polished but short hero reveal, subtle product-card response and clear cart/checkout state transitions.
- Do not hide product, price or CTA behind animation. Do not use scroll-jacking, autoplay sound, custom cursor dependence or expensive WebGL for MVP.
- Respect `prefers-reduced-motion`; animation must not cause layout shifts or materially degrade Core Web Vitals.
- Use no more than one motion library unless a reviewed design requires otherwise.

### Accessibility

Target WCAG 2.2 AA practices where applicable: semantic structure, keyboard support, visible focus, useful alt text, labels/errors, accessible drawer/dialog behaviour, adequate contrast and usable touch targets. Generated visual comps do not guarantee accessibility; test the actual implementation.

## 8. Technical direction (approved baseline)

- **Application:** Next.js App Router + React + TypeScript.
- **Server/API:** Next.js Route Handlers for explicit HTTP operations and webhooks; server-only modules/server actions where appropriate. Do not deploy Express in MVP.
- **Database:** MongoDB Atlas. Use a maintained official driver or suitable ODM selected in LLD; keep DB credentials server-only and handle connection reuse appropriately for the deployment model.
- **Styling:** Tailwind CSS and accessible reusable primitives with a bespoke design layer.
- **Motion:** CSS first; optional lightweight motion library only if justified.
- **Payments:** choose an India-capable gateway after onboarding and fee/settlement/refund review; Razorpay is a candidate, not yet approved.
- **Images:** use a responsive image pipeline/CDN and correct dimensions; provider choice is open.
- **Email:** transactional provider/SMTP setup with authenticated sending domain (SPF, DKIM, DMARC); provider choice is open.
- **Hosting:** managed Next.js hosting with preview deployments, HTTPS, environment secrets and rollback; final provider choice is open.
- **Analytics/monitoring:** privacy-reviewed analytics, Search Console, structured error logs and a lightweight uptime/error alert.

This is MERN-adjacent by design: React/Next.js + Node runtime + MongoDB. A separate Express service would add deployment, auth, CORS, monitoring and contract overhead without a current MVP requirement. Add Express only for a concrete reusable API, independent scaling or integration need.

## 9. SEO, AEO and performance

### Performance

- Target good Core Web Vitals at the 75th percentile once there is enough real-user data: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- Internal Lighthouse mobile target ≥ 90 for representative public pages in stable conditions; investigate regressions instead of treating one score as proof.
- Use responsive AVIF/WebP where supported, explicit dimensions/aspect ratios, below-the-fold lazy loading and high priority only for the true hero image.
- Minimise above-the-fold JavaScript and third-party scripts. No heavy motion library on all routes without evidence.
- Cache/revalidate public catalogue pages intentionally; keep checkout, admin, personalised pages and payment operations out of public caches. Ensure product edits invalidate cached output/metadata.

### SEO/AEO

- Public product content rendered in initial HTML (static/server rendering as applicable).
- Unique metadata, stable slugs, canonical URLs, locale-aware URL strategy, internal links, image alt text, sitemap and robots rules.
- Product/Offer structured data only for purchasable, approved products; Organization and BreadcrumbList where appropriate. Structured data must match visible content; no fabricated rating/review fields.
- Useful, original customer answers for composition/coating, care, sizing, delivery, returns and gift selection. FAQs must answer real questions and remain visible/current.
- Submit to Google Search Console and monitor index coverage, rich-result warnings and organic funnel metrics. Do not promise rankings or inclusion in AI Overviews/AI Mode.
- No `llms.txt` or custom AI schema as launch blockers; Google’s published guidance says standard SEO best practices apply to its AI search features, with no extra technical requirements or special structured data for inclusion.

## 10. Security, privacy and India-first operational compliance

- HTTPS; secrets in host-managed environment variables; no server keys or DB URI in client bundles or source control.
- Validate inputs; authorise protected actions on the server; rate-limit authentication, checkout, webhooks as appropriate, and corporate enquiry submissions.
- Verify payment signatures/webhook signatures using the provider's current instructions. Use idempotency/duplicate-event protection. Never store raw payment card data.
- Secure admin sessions/cookies and limit access to required operator roles; audit important state changes without logging sensitive data.
- Minimise collected personal data and analytics payloads; define retention/deletion handling and publish a privacy notice reviewed by qualified counsel.
- Verify seller identity/contact, grievance details, pricing/charges, shipping, cancellation/refund/return and product disclosures under applicable Indian e-commerce rules before launch.
- Government sources announced the 2026 E-Commerce Rules amendments will come into force on 1 January 2027. Because the store is being built in October 2026 and may operate across that date, policy/compliance review should consider both the currently effective rules and the forthcoming amendments.
- Verify any legally applicable GST registration/invoicing/tax treatment and silver-product/material claims with an appropriately qualified professional. This document is not legal or tax advice.

## 11. Analytics and commercial guardrails

Track at minimum: sessions/source, product views, add-to-cart, checkout start, successful purchase after verification, average order value, refund/return/RTO outcomes, contribution estimate by SKU, corporate enquiry, enquiry status, referral/creator attribution, and optional gift-message selection.

Do not make spend decisions from follower counts alone. Review weekly:

- Contribution before advertising and after attributed acquisition costs.
- Paid versus organic/referral orders.
- Checkout completion and payment failure rates.
- Supplier confirmation/dispatch time, delivery exceptions and complaint/return rate.
- Corporate leads, quote rate and closed business.

No fixed sales/revenue target is set before the first baseline. The ₹50,000 cap includes product verification, web setup, media/content, fulfilment/returns reserve, initial tests and contingency; line items must be kept within the budget.

## 12. Timeline and launch plan (2–3 weeks, conditional)

The requested timeline is an aggressive target, not a guarantee. It is realistic only if the brand name, product specifications and policies are available promptly and supplier/payment accounts can be tested without delay.

- **Days 1–3 — blockers:** confirm brand/name/domain, product facts and actual photos, supplier shipping/returns/stock/COD terms, target price and ring publication gate, GST/legal details, and Hindi content owner.
- **Days 4–7 — design and setup:** select/prototype the navy-hybrid design, adapt a starter UI only after code/license/security review, configure environments and core pages.
- **Days 8–12 — commerce journey:** product pages, cart, guest checkout, payment sandbox, orders/admin, transactional email and manual fulfilment flow.
- **Days 13–16 — bilingual and B2B:** complete reviewed Hindi strings/content, corporate enquiry flow, policies, metadata/structured data, analytics.
- **Days 17–21 — QA and soft launch:** full test orders, phone/PIN code coverage, payment/webhook/idempotency tests, security/access checks, accessibility/reduced motion, mobile performance and SEO verification.

If product documentation, payment onboarding or supplier policies are not resolved, launch the verified frame first and postpone the ring. Do not bypass a publication gate to meet the calendar.

## 13. Explicit decision log

### Founder-approved decisions

- **D-01 — Architecture:** Next.js App Router + React + TypeScript, MongoDB Atlas and Next.js Route Handlers initially. A separate Express service is deferred until an evidenced need exists.
- **D-02 — Intended launch catalogue:** frame and peacock ring. Both are in the intended catalogue, but each must pass its publication gate; ring may be held back if evidence or operational readiness is incomplete.
- **D-03 — Visual direction:** Midnight Gallery + Gift Ritual: deep navy/silver contrast with emotional gifting storytelling. Final tokens and typography require prototype and accessibility review.
- **D-04 — Product assets:** professional product photos are reported as available. Confirm exact SKU match and usage rights before publishing.
- **D-05 — Supplier workflow:** orders are forwarded to the supplier manually; admin must support stock confirmation and tracking notes.
- **D-06 — Payment model:** prepaid plus limited COD. Exact eligibility is unresolved; proposed default is prepaid-first, ring COD disabled, and COD limited by product/PIN code/value once fulfilment terms are verified.
- **D-07 — Customer support:** the brand owns customer communication and return decisions; supplier fulfils orders. A written supplier agreement is still required.
- **D-08 — Corporate gifting:** MVP landing page + enquiry form + inbox notification + manual lead management.
- **D-09 — Word-of-mouth:** gift storytelling first; automated referral incentives and QR story pages follow only after validation.
- **D-10 — Language:** English and Hindi at launch, subject to human-reviewed translation and support coverage.
- **D-11 — Shipping ambition:** pan-India shipping, limited to verified serviceable PIN codes and realistic delivery promises.
- **D-12 — Integrations:** recommend low-cost, low-operations options; provider choices remain open.
- **D-13 — Timeline:** target 2–3 weeks, conditional on access, supplier documentation, provider onboarding and fast decisions.

### Unresolved decision

- **D-14 — Brand identity:** founder selected “have-name” but the actual brand name was not supplied in the answers or project documents. Domain, social handle and name-conflict checks cannot be completed until it is provided.

## 14. Critical unresolved questions and launch blockers

These questions must be answered before production launch; some can be resolved during HLD/implementation, but they cannot be silently assumed.

### Blockers (P0)

1. **Brand identity:** What is the exact brand name? Which domain/social handles are available? Has name/trademark conflict checking been performed?
2. **Ring publication gate:** May the ring remain hidden and be launched later if material evidence, price justification or insured fulfilment is not approved in time? Recommended default: yes.
3. **Material and listing evidence:** What is the exact base material/coating for the frame and ring? What evidence will substantiate all claims? Do product photos match the exact sellable variants and are usage rights clear?
4. **Supplier written terms:** What is included in ₹450 and ₹8,000; dispatch time, pan-India serviceability, packaging, shipping, damage/loss process, return freight, refund responsibility, stock confirmation, blind shipping, gift note/insert, invoices and bulk capacity?
5. **COD rule:** Is COD available from supplier/carrier for all intended PIN codes? Define eligibility, value cap, confirmation and RTO responsibility. If unclear, launch prepaid-only and consider COD after validation.
6. **Payment provider/account:** Which eligible business account will be used, how will settlement/refund work, and can webhooks be tested before launch? Razorpay is only a candidate at this stage.
7. **Tax and seller information:** Business/legal name, support/grievance contact, GST/invoice/tax position and final policy text must be confirmed with qualified advice.
8. **Bilingual owner:** Who approves Hindi copy and who responds to Hindi customer questions?

### Important but not necessarily launch blockers

9. Exact domain/hosting and email providers, spend limits and access credentials.
10. Carrier/serviceability checker and final shipping fee/free-shipping policy.
11. Whether gift note can be fulfilled by supplier; if not, remove the customer promise and defer physical insert.
12. Final analytics/cookie/consent approach and retention settings appropriate to the providers selected.
13. Brand logo/tagline and final copy tone; can be frozen after name is known.

## 15. Acceptance and sign-off

The PRD is accepted when the founder agrees the release scope, publication gates, bilingual requirement, COD policy, supplier workflow, creative direction, and decision log accurately represent the intended MVP. The HLD is a separate review artefact and must be approved before any LLD, database schema or API contract is created.

### References

- Next.js — Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- MongoDB — Integrate Next.js with MongoDB: https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/
- Google Search Central — AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central — Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Razorpay — Web integration and payment signature verification: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/
- Department of Consumer Affairs — Consumer protection rules: https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/consumer-protection
- Press Information Bureau — 2026 E-Commerce Rules amendment announcement: https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=294532

---
**End of PRD v0.3 — revised to reflect founder clarifications; subject to closure of listed launch blockers.**
