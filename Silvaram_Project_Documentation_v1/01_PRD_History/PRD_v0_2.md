# Product Requirements Document (PRD)
## India-First Jewellery & Gifting E-commerce MVP

**Version:** 0.2 — founder feedback incorporated; review draft  
**Date:** 17 October 2026  
**Status:** Architecture direction approved by founder; creative direction and launch-operating decisions remain open for review  
**Brand name:** TBD  
**Market:** India only for MVP  
**Initial budget:** Up to ₹50,000  
**Business model:** Supplier-fulfilled / dropshipping, initially managed manually

> **Purpose of this document:** Define the first launchable product. This is deliberately an MVP: fast, accessible, distinctive, SEO-ready, and straightforward to operate. High-cost features and automation will be added only when the business has evidence to justify them.

## 1. Executive summary

Build a modern, youthful, India-first gifting and design e-commerce brand with a small curated catalogue, a fast mobile-first storefront, secure checkout, simple order administration, supplier-fulfilled delivery, and a corporate-gifting enquiry funnel. The experience should create curiosity, help shoppers imagine the recipient’s reaction, make gifting feel intuitive, and give customers a natural reason to tell someone else about the brand. A deep navy and silver visual system is the preferred direction. Distinctive design and restrained motion must support trust, product understanding, accessibility, checkout and page speed—not compete with them.

The first commercial experiments are:

- **Silver-coated frame:** supplier cost ₹450; proposed retail price ₹1,200. Exact base material, silver coating description, shipping/packaging inclusions, tax treatment, and return terms must be verified before publication.
- **Peacock ring:** supplier cost ₹8,000; proposed retail range ₹12,000–₹14,000. Supplier describes it as silver-plated/coated. Keep it unpublished until composition, craftsmanship/value claims, product documentation, shipping insurance, sizing, and return economics are confirmed.

Initially, the frame is the lower-risk test product, positioned as a thoughtful keepsake/gift rather than forcing a jewellery-only story around it. A corporate-gifting landing page will capture leads, but the MVP will not include a full B2B portal or automated supplier integration. The admin will manage product availability and fulfilment manually. The founder has approved Next.js App Router + React + TypeScript, MongoDB Atlas, and Next.js Route Handlers/server actions as the initial architecture direction; a separate Express service is deferred until a real integration or independent API need exists.

## 2. Product vision and positioning

**Working positioning:** A contemporary Indian gifting and design brand offering distinctive keepsakes and statement pieces for personal milestones, thoughtful gifts, and self-expression.

**Working brand promise:** “Make a moment mean more.” This is a creative working line, not approved final brand copy.

**Initial campaign direction:** “Give a memory a place to live.” This suits the frame as an initial SKU while leaving room to expand into jewellery and other giftable products. All copy remains subject to founder review and actual product capabilities.

### Product principles

1. **Trust before hype:** describe materials, coating, sizing, care, dispatch time, delivery, and returns accurately.
2. **Design-led, not animation-led:** distinctive art direction and restrained motion; avoid heavy effects that delay shopping.
3. **Small catalogue, strong merchandising:** start with one validated live product and only publish the ring when its claims and price are defensible.
4. **India-first operations:** INR pricing, Indian addresses and phone formats, locally suitable payments, domestic shipping policies, and GST/invoice requirements verified before launch.
5. **Manual first, automate later:** human-reviewed supplier fulfilment until volume and supplier capabilities justify integration.

## 3. Business objectives and success measures

### Objectives

- Launch a real, secure, mobile-first store within the ₹50,000 overall initial budget.
- Validate customer interest and fulfilment quality on a minimal set of SKUs.
- Create a consistent brand foundation that can support more products later.
- Capture and manage corporate-gifting enquiries using a low-friction form.
- Establish technical SEO and useful-content practices that support classic search and AI-powered search experiences.
- Build low-cost word-of-mouth opportunities into the product, gift experience, customer service and post-purchase journey rather than relying on paid media alone.
- Instrument the user journey so the founder can see where visitors drop off, whether sales are profitable, and how many qualified visits or orders come from direct sharing, referrals and creator content.

### MVP success measures (not sales guarantees)

- A customer can discover a product, understand its composition and terms, place an order, and receive an order confirmation without manual developer intervention.
- An admin can edit product content/availability, review orders, submit a supplier order, and record a tracking number.
- Analytics record product view, add-to-cart, checkout start, purchase, and corporate enquiry events.
- No critical checkout/security defects remain at launch.
- Representative pages target good Core Web Vitals at the 75th percentile when sufficient real-user data exists: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. These are performance targets, not guarantees.
- Search engines can access crawlable page content, unique metadata, canonical URLs, sitemap, robots rules, and valid structured data where appropriate.
- Actual contribution per order can be calculated using supplier, delivery, packaging, payment, return, tax, and acquisition costs.
- Word-of-mouth tracking is in place for referral/link traffic, creator codes, corporate enquiries, and optional user-generated content permissions; numeric targets are set only after a first baseline exists.

## 4. Target users and primary journeys

### Consumer / gift buyer

Wants an attractive, trustworthy product with accurate material details, clear total price, delivery expectations, simple checkout, and support if something goes wrong.

**Journey:** Home or landing page → collection/product page → product details and delivery/returns → cart → guest checkout → payment/order confirmation → tracking/support.

### Corporate gifting buyer

Wants a supplier who can confirm budget, quantity, personalisation, packaging, lead time, delivery location, invoicing, and reliability.

**Journey:** Corporate gifting page → browse/ download curated catalogue (PDF may be handled manually at launch) → enquiry form → email/phone follow-up → quote and sample (manual process).

### Store operator / founder

Needs to manage product copy, prices, publication status, product availability, orders, tracking, policy pages, and corporate enquiries without changing code for routine tasks.

**Journey:** Protected admin → update SKU/product availability → review new order → confirm supplier stock → place supplier order → record tracking/status → handle exception/refund/contact.

## 5. Scope

### In scope — MVP / Release 1

- Responsive storefront, optimised for mobile.
- Home page with a clear value proposition, featured product, category/gifting paths, trust details, and corporate-gifting CTA.
- Shop/collection page with small curated catalogue; simple sort/filter only if useful for the actual SKU count.
- Product detail pages with product-specific title/description, clear photos, price, availability, material/composition, care, size/dimensions, dispatch estimate, shipping/returns, and support link.
- Cart and guest checkout.
- One online payment gateway selected and approved before launch. Razorpay is a candidate for India; exact integration is a later technical decision. No payment-card data stored by the application.
- COD decision pending fraud/RTO economics and supplier support. If enabled, it must be configurable, clearly disclosed, and measurable.
- Order confirmation page and email; customer-support contact details.
- Lightweight protected admin for products, order list/detail, status changes, tracking number, and corporate enquiries.
- Manual supplier fulfilment workflow: confirm availability, submit order to supplier, record supplier reference/tracking, and handle exceptions.
- Corporate gifting lead form: organisation/contact, email/phone, gift type, quantity range, budget per gift, delivery date/location, customisation notes, consent/notice text.
- Optional gift message/occasion field in checkout if supplier fulfilment can reliably print or include it; otherwise offer only an accurate gift-note alternative that operations can fulfil.
- Brand-led experience: deep-navy/silver visual direction, product-story modules, high-contrast calls to action, a minimal motion system, and product pages that make gifting decisions feel easier.
- About, Contact, FAQ, Shipping, Returns/Refunds, Privacy, Terms, and Grievance/Support information, reviewed for applicable Indian legal requirements before launch.
- Technical SEO basics, Product/Offer JSON-LD where eligible, Organization, BreadcrumbList, sitemap.xml, robots.txt, canonical URLs, open-graph metadata, Search Console/Analytics setup.
- Basic analytics events and a simple weekly business dashboard/reporting workflow.

### Out of scope — MVP

- Native iOS/Android apps.
- International/euro/North America selling, multi-currency, or multilingual support.
- Marketplace/multi-vendor seller accounts.
- Full B2B customer accounts, negotiated price lists, bulk cart, purchase-order workflow, credit terms, or approval flows.
- Automated supplier inventory/order API integration unless the supplier already has a low-effort supported interface and it is prioritised after launch.
- Loyalty points, automated referral rewards, subscriptions, wishlist, complex personalisation, advanced search, AI shopping chatbot, AI-generated product claims, virtual try-on, AR, 3D product viewers, and elaborate GSAP sequences. A lightweight post-purchase story/referral insert can be tested manually before software is built.
- Large editorial blog or automated content generation. A small set of useful, human-reviewed buying/care FAQs is sufficient initially.

### Later phases

- Expand SKU catalogue and collections after validating demand, contribution margin, and supplier reliability.
- Automated supplier order placement/tracking and inventory sync if available.
- Reviews and user-generated content with moderation and authenticity controls.
- Gift bundles, occasion filters, gift cards, creator/referral programs, and abandoned-cart recovery.
- Shareable “gift story” experience: a physical card or QR that lets a recipient view a personal note or lets the buyer share a campaign/story page, implemented only after privacy and fulfilment mechanics are defined.
- Double-sided referral reward, activated only after actual contribution margins and fraud/returns behaviour support the cost.
- Enhanced corporate quotation management, downloadable dynamic catalogue, bulk-order workflow, and CRM integration.
- Additional countries only after Indian operations and unit economics are stable.

## 6. Product and catalogue requirements

### Initial SKU records

**SKU A — Silver-coated frame (candidate launch SKU)**
- Supplier cost: ₹450 (user-provided; inclusions not confirmed).
- Proposed retail: ₹1,200 (user-provided).
- Required before publication: exact base material, coating description, size/dimensions, weight where helpful, packaging, supplier photos or approved product photography, dispatch SLA, shipping cost, breakage handling, returns/exchange terms, tax/invoice information, and product availability confirmation process.
- Do not claim “solid silver” or “925 sterling silver” without reliable evidence.

**SKU B — Peacock ring (draft/unpublished until verified)**
- Supplier cost: ₹8,000 (user-provided).
- Proposed retail: ₹12,000–₹14,000 (user-provided).
- Known material statement: silver-plated/coated; composition/purity otherwise unknown.
- Required before publication: exact material and base metal, plating/coating specification, stones (if any), size/resize policy, weight and dimensions, care instructions, evidence for design/craftsmanship/value claims, high-quality real product images/video, authenticity documentation where applicable, insured-shipping quote, and written return/damage arrangement.
- Do not describe it as solid silver or 925 silver unless independently substantiated. Price acceptance is unvalidated; no paid ads until product-market and value proposition are tested.

### Catalogue behaviour

- Each product has a stable internal SKU, slug, name, short and long description, images with alt text, price in INR paise, status (draft/published/archived), supplier cost (admin-only), public material attributes, dispatch estimate, stock/availability state, shipping/return notes, SEO title/description, and created/updated timestamps.
- Supplier cost and internal margin are never exposed to public clients or included in public JSON-LD.
- Products can be draft, published, unavailable, or archived. Unavailable products cannot be purchased.
- The backend is the source of truth for price and availability at checkout; never trust client-submitted price totals.
- Price changes and out-of-stock status must propagate to product pages and structured data.

## 7. Functional requirements and acceptance criteria

Priority definitions: **P0 = required for launch; P1 = valuable if time/budget allow; P2 = later.**

### Storefront and discovery

- **FR-01 (P0):** Home, collection, product, cart, checkout, confirmation, informational-policy, and corporate-gifting pages are responsive at common mobile, tablet, and desktop widths.
- **FR-02 (P0):** Product detail pages show real product images, accurate composition/material copy, total price, availability, dimensions/sizing where relevant, care, shipping/dispatch estimate, return policy, and contact/help route.
- **FR-03 (P0):** Each indexable page has a unique title, meta description, canonical URL, open graph fields, one clear primary heading, useful internal links, and readable text present in server-rendered HTML.
- **FR-04 (P0):** Cart quantity updates and removal work; totals are recalculated server-side before order creation.
- **FR-05 (P0):** Guest checkout validates name, phone, email, shipping address, postal code, and any required delivery fields; displays a final price/order summary before payment.
- **FR-06 (P0):** The site clearly displays shipping, returns, privacy, terms, support/grievance, and payment information before the customer commits to purchase.
- **FR-07 (P1):** Category/occasion navigation and a lightweight search/filters are added only when catalogue breadth warrants them.

### Payments and orders

- **FR-08 (P0):** Payment provider session/order is created server-side; webhook signatures are verified server-side; duplicate webhook delivery does not create duplicate orders or fulfillment events.
- **FR-09 (P0):** An order record is persisted with line-item snapshots (SKU/name/price/quantity at time of order), customer/shipping details, payment state, fulfilment state, totals, timestamps, and provider references.
- **FR-10 (P0):** A payment/order confirmation email is sent or queued after the appropriate verified state. Email failures are logged and retried; the order itself is not lost if email fails.
- **FR-11 (P0):** Admin can view orders, update a controlled status, add tracking/provider details, and see an audit trail of important status changes.
- **FR-12 (P0):** Fulfilment states have explicit allowed transitions; e.g. pending payment → paid → awaiting supplier confirmation → processing → shipped → delivered, with cancelled/refunded/exception paths. Actual state machine to be specified in LLD.
- **FR-13 (P0):** No live order is accepted when a product is explicitly unavailable. Because supplier availability is not integrated, a human must verify stock and the store must display a realistic dispatch window. Policy for supplier stock-outs after payment must be approved before launch.
- **FR-14 (P1):** Customer-facing order tracking page or link is added if carrier/provider data is available; otherwise, email/WhatsApp updates are manually managed for MVP.

### Admin and corporate gifting

- **FR-15 (P0):** Admin routes are inaccessible to anonymous users; role checks are enforced on the server, not only in the UI.
- **FR-16 (P0):** Admin can create/edit/publish/unpublish products, images, prices, material fields, SEO metadata, and availability. Supplier costs are admin-only.
- **FR-17 (P0):** Corporate enquiry submission is validated, persisted, timestamped, and notifies the business email. An admin can mark its status (new/contacted/quoted/won/lost) and add notes.
- **FR-18 (P0):** The corporate form asks for business contact, company, expected quantity, budget, required delivery date, location, and optional customisation. Avoid collecting unnecessary personal data.
- **FR-19 (P1):** Downloadable corporate catalogue and tiered quotation templates may be maintained manually until demand warrants tooling.

### Analytics and operational visibility

- **FR-20 (P0):** Events exist for product_view, add_to_cart, begin_checkout, purchase (only after verified payment/order state), and corporate_enquiry_submit. Events must avoid exposing sensitive personal data.
- **FR-21 (P0):** The founder can report weekly on visits, product views, add-to-cart rate, checkout completion, paid orders, order value, refund/return rate, corporate leads, and contribution margin using known costs.
- **FR-22 (P1):** Email/CRM automation and abandoned checkout flows are added after consent/privacy and provider requirements are reviewed.

## 8. Technical direction (founder-approved baseline)

### Recommended MVP stack

- **Storefront/rendering:** Next.js App Router + React + TypeScript, using server components and static/server rendering where appropriate.
- **Server/API:** Start with Next.js Route Handlers/server actions in the Node.js runtime for product, checkout, order, admin, and enquiry operations. This keeps deployment and operations simpler than running a separate Express service for a two-SKU launch.
- **Database:** MongoDB Atlas with schema validation at the application boundary and explicit indexes. Use a maintained MongoDB driver or a suitable ODM after the LLD decision.
- **Styling/components:** Tailwind CSS plus a small accessible component system (e.g. shadcn/ui) with a custom brand layer.
- **Motion:** CSS transitions and transforms for most effects; optionally Motion/Framer Motion for a few high-value moments. Respect `prefers-reduced-motion`. Avoid adding GSAP unless a specific interaction truly requires it.
- **Payments:** Indian provider such as Razorpay, pending account eligibility, fee review, settlement behaviour, webhook support, and a successful sandbox test.
- **Email:** Transactional email provider selected before launch; SPF, DKIM, and DMARC configured for the sending domain.
- **Hosting/CDN:** Choose after a deployment spike; prefer CDN delivery for assets, HTTPS, preview deployments, environment secrets, and easy rollback.
- **Monitoring:** Error reporting and uptime checks, plus lightweight structured logs. Avoid unnecessary infrastructure at MVP scale.

### Why this is a MERN-adjacent recommendation

Next.js is React-based and runs on Node.js, while MongoDB remains the database. It replaces a separate Express layer with built-in server endpoints for the MVP. That is a deliberate reduction in operational complexity, not a rejection of React/Node/MongoDB. Add Express as a separate API only if there is a real need for a reusable API consumed by multiple clients, supplier integrations, or independent scaling. If strict classic MERN is a non-negotiable requirement, record it as an architecture decision and plan the extra deployment, authentication, CORS, logging, and API-contract work explicitly.

### Prohibited shortcuts

- No secrets, payment keys, or database credentials in browser code or source control.
- No accepting prices or payment status from client state without server verification.
- No long-lived admin credentials hardcoded in the codebase.
- No fake reviews, fake scarcity, unsupported silver/purity claims, or copied competitor content.
- No dependency on client-rendered-only product data for critical SEO content.

## 9. Performance, SEO and AEO requirements

### Performance

- Target good Core Web Vitals on the 75th percentile of real visits as data becomes available: LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, CLS ≤ 0.1.
- Initial internal QA target: Lighthouse mobile performance ≥ 90 on representative home/product pages in a stable test environment. This is a budget, not a promise; repeat after image/content/third-party-script changes.
- Use responsive AVIF/WebP images when supported, explicit image dimensions/aspect ratios, lazy-load below-the-fold media, and prioritise only the real hero image.
- Keep above-the-fold JavaScript small; do not load animation or analytics bundles unnecessarily on every route.
- Avoid autoplay video with sound, expensive scroll-bound effects, layout-triggering animation, and large third-party chat widgets in the initial build.
- Use caching/revalidation for catalogue pages while ensuring price and availability changes invalidate relevant cache entries.

### Classic SEO

- Server-render/SSG public product and category content so core text and links appear in initial HTML.
- Unique descriptive titles/meta descriptions, canonical URLs, stable human-readable slugs, heading hierarchy, descriptive anchor text, internal links, and meaningful alt text.
- Valid sitemap.xml and robots.txt; ensure products meant to be indexed are crawlable. `noindex` checkout/account/admin/private URLs as appropriate.
- JSON-LD: Organization and BreadcrumbList site-wide where applicable; Product/Offer on purchasable product pages only with visible facts matching the structured data. Never fabricate ratings/reviews or use unsupported values.
- Submit the site to Google Search Console, monitor indexing/merchant listing warnings, and use Google Analytics or a privacy-reviewed equivalent for traffic/conversion analysis.
- Keep product price/availability consistent across visible page content, structured data, and any future merchant feed.

### AEO / answer-engine discoverability

For this PRD, AEO means making pages clear, factual, useful, crawlable, and easy for search systems to interpret—not attempting to game AI answers.

- Create useful, original explanations for material/coating, care, sizing, delivery, returns, gifting occasions, and product selection.
- Add concise FAQs where they answer real customer questions; make answers visible in page content and keep them current.
- Make facts consistent across product pages, policies, social profiles, and any future merchant listings.
- Use structured data only where supported and aligned to the visible page.
- Measure organic impressions/clicks and indexed pages in Search Console; do not promise inclusion in AI Overviews or AI-generated answers.
- Do not add an `llms.txt` file or custom AI schema as a launch blocker; Google's current guidance says there are no extra technical requirements or special structured data for its AI features beyond SEO fundamentals.

## 10. Visual and interaction direction

### 10.1 Creative north star

**Creative intent:** youthful, editorial, minimal, modern and emotionally resonant. The interface should create a small moment of curiosity, help a buyer imagine a real recipient using or remembering the gift, make the next action obvious, and leave the customer with a story worth sharing. Avoid generic “luxury” clichés, visual clutter, and manipulative urgency.

**Brand experience sequence:**
1. **Curiosity:** show one strong visual or question that earns attention without hiding the product or price.
2. **Imagination:** connect the item to a real moment—thank you, milestone, memory, celebration, or “just because.”
3. **Confidence:** explain materials, dimensions, delivery, returns, packaging, and support clearly.
4. **Gift intent:** make it simple to choose gift-ready options and add a note where fulfilment supports it.
5. **Memory and sharing:** create an optional, natural way to share the gifting story after delivery.

**Working message:** “Give a memory a place to live.” It is a campaign hypothesis suited to the frame, not an approved final brand slogan. Longer-term brand language should expand beyond photo frames as more SKUs are validated.

### 10.2 Preferred visual system (subject to a design prototype review)

- **Midnight Navy:** `#0C1B36` — primary brand/background colour for hero and story sections.
- **Porcelain:** `#F7F5F0` — calm light surface for product discovery and readable product details.
- **Silver Mist:** `#D9DFE8` — borders, metallic-neutral accents, dividers and supporting type on dark surfaces (contrast must be checked per use).
- **Electric Cobalt:** `#6178FF` — a sparing accent for focus, interactive highlights and selected CTAs; recheck text/background contrast and use a compliant variant when needed.
- **Graphite:** `#222B3A` — primary text on light surfaces.

The navy/silver pairing is the preferred direction, not a final locked palette. Use dark hero/story canvases to make silver surfaces stand out; use calm light backgrounds for accurate product detail and legible specifications. The product photo must remain visually truthful, especially for coated items. The site should not be dark on every page: visual pacing between dark editorial sections and light shopping surfaces is intentional.

**Typography direction:** editorial display type for short emotional headlines paired with a highly legible sans-serif for prices, product information and forms. Self-host or subset fonts where practical to control loading cost. Avoid using novelty typography for long-form descriptions or checkout.

**Layout direction:** strong negative space; asymmetrical editorial composition in hero/story sections; precise, calm product grid; large authentic product imagery; restrained rounded corners; visible price and product facts; clear shopping CTA. The result should feel art-directed, not like a generic template with a dark theme applied.

### 10.3 Signature interactions (launch-safe)

- A polished, fast hero reveal where the product remains visible and the CTA immediately available.
- Subtle product-card/image hover or press response; do not rely on hover for essential information.
- A clean cart drawer/transition and reassuring checkout state changes.
- Optional gift-note interaction if supplier operations can fulfil it correctly.
- A later-phase “gift story” QR/card experiment that creates a shareable moment without exposing personal information by default.

**Motion budget:** prefer CSS opacity/transform transitions. Use one motion library only if needed for a specific interaction; do not add GSAP or WebGL by default. No scroll-jacking, blocking intro animation, custom cursor dependency, autoplay sound, or animation before a price/add-to-cart action is available. Respect `prefers-reduced-motion`. Motion must not cause layout shifts or materially damage Core Web Vitals.

### 10.4 Word-of-mouth and sales experience requirements

Word-of-mouth is an operating system, not a visual effect. It should be earned by a combination of product quality, trustworthy material claims, on-time fulfilment, appealing packaging, a thoughtful note, responsive support and an easy-to-share story. Avoid fake scarcity, fake reviews, spammy referral prompts, or rewards conditional on positive reviews.

**MVP / low-cost experiments:**

• Gift-intent copy and an optional message/occasion field only when the fulfilment workflow supports it.

• A simple branded insert/thank-you card supplied or packed by the fulfilment partner if reliable; otherwise defer it until operationally feasible.

• Post-delivery follow-up that asks for honest feedback and resolves problems first; offer an optional “share your gifting story” link separately.

• Founder-led short-form content showing real product details, packing tests, design context and gifting moments. Product visuals used on sale pages must be authentic and match the actual SKU.

• A small number of relevant micro-creators or customer creators, using tracked links/codes and written usage permission. Track whether the content drives qualified product visits or sales, not just views.

• A manual corporate gifting pilot with a concise PDF/landing page, direct personalised outreach and sample/lead follow-up where budget allows.

**Later-phase growth loops (only after product economics and fulfilment are stable):**

• A QR-enabled gift-story card or recipient note page with privacy-safe, hard-to-guess links and a clear deletion/expiry policy where applicable.

• Referral rewards for both the referrer and new buyer. Set the reward ceiling from actual per-order contribution margin after returns, taxes, fulfilment and desired profit; do not pre-commit to a discount now.

• Gift bundles, gift finder/occasion quiz and saved gifting preferences after the catalogue has enough genuine options to make the recommendations useful.

• User-generated content and creator partnership loops with clear customer consent and content rights.

**Measures to instrument:** share/referral link clicks, referral sessions and orders, creator-code orders, gift-note selection, corporate enquiry source, post-delivery feedback, and optional UGC permissions. Establish a baseline first; do not set unsupported growth guarantees. Review contribution margin by channel every week.

### 10.5 AI-assisted design workflow

Use Google Stitch to explore three genuinely different visual directions before implementation. Stitch supports prompt-led iterative UI design and a transferable `DESIGN.md` format, which is useful for communicating colour roles, typography, spacing and component rules to AI coding tools. Treat generated screens/code as prototypes, not as proof of production quality. See the Google Stitch official update and its portable DESIGN.md explainer in the References section.

Suggested directions to prototype:

**Direction A — Midnight Gallery:** navy canvas, silver product hero, quiet editorial type, minimal navigation.

**Direction B — The Gift Ritual:** light/porcelain shopping surfaces, emotional gifting prompts, gift-note and occasion cues, with navy used as the anchor.

**Direction C — Electric Editorial:** a sharper youthful art direction with cobalt accents, assertive type and a modular product/story grid.

Compare the directions on mobile readability, clarity of product/material, purchase CTA visibility, emotional memorability, accessibility, performance feasibility, and ability to extend from a frame to jewellery and corporate gifting. Pick a small system of reusable design tokens and components; do not build three separate themes.

Use Higgsfield or other generative creative tools for moodboards, campaign concepts and short-form storyboard exploration if useful, but never allow generated content to invent product materials, stones, dimensions, hallmarks, customer quotes or supplier capabilities. Replace concept art with authentic product photography before a SKU goes on sale. Keep image licensing and tool terms under review.

### 10.6 Accessibility

Target WCAG 2.2 AA practices where applicable: semantic HTML, keyboard navigation, visible focus, sufficient contrast, labelled fields/errors, accessible dialogs/drawers, descriptive image alt text, and usable 44×44 CSS pixel target sizing where practical. Validate chosen colour pairs with a contrast checker; colour tokens alone do not guarantee accessible contrast.

## 11. Security, privacy and compliance requirements

- Enforce HTTPS; store secrets in deployment environment settings; rotate compromised keys.
- Validate and normalise all external input; apply server-side authorisation to admin routes and API actions; rate-limit login, checkout creation, enquiry submissions, and other abuse-prone endpoints.
- Verify payment webhooks and make order processing idempotent. Never store raw card data.
- Restrict admin functionality by role; log critical actions without logging secrets or unnecessary personal data.
- Use secure session/cookie settings appropriate to the auth approach; protect against injection, cross-site scripting, CSRF where relevant, and insecure direct object references.
- Publish accurate legal and policy pages, grievance/support contact, seller identity, pricing/shipping/return terms, and product claims before launch. Have a qualified Indian professional confirm GST/invoicing, consumer-protection, privacy/data handling, and any hallmarking/material disclosure obligations that apply to the actual products and business structure.
- Marketing pixels, remarketing, and email collection must be reviewed against applicable privacy/consent obligations before enabling.

## 12. Template/repository evaluation

The project is small enough that a starter can reduce UI setup time, but no repository should be treated as a complete, secure, India-ready dropshipping system without audit. For visual direction, first prototype in Google Stitch; for implementation, audit a Next.js repository and use it only as a scaffold. Keep generated design exploration separate from the source of truth for the product facts and backend behaviour.

### Candidate A — Next.js Ecommerce Starter by Epic Design Labs

Repository: https://github.com/Epic-Design-Labs/nextjs-ecommerce-starter  
**Potential fit:** Good candidate for storefront scaffolding. README describes Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, product catalog, cart, checkout flow, auth/account shells, dynamic metadata, sitemap/robots, JSON-LD helpers, accessibility features, and an MIT license. Product data and repository layer are configurable; checkout uses a pluggable provider with a demo provider.

**Caveats:** GitHub activity/ adoption appears modest (repository page showed 12 stars and 10 commits when checked on 17 Oct 2026). Demo account credentials, JSON-backed data, demo checkout provider, auth/session handling, admin authorisation, and dependency/security posture need a code audit. Do not deploy it as-is with live customers. The existing behaviours are scaffolding, not proof of production readiness.

**Recommendation:** Use as a *candidate UI scaffold only*, subject to a clean clone/build/test, license review, dependency audit, and focused inspection of checkout/auth/data persistence. Replace demo data and demo payment behaviour; add the production database, verified payment webhooks, supplier-fulfilment process, and tested admin access.

### Candidate B — Vercel Commerce

Repository: https://github.com/vercel/commerce  
**Potential fit:** High-quality server-rendered Next.js commerce patterns.

**Caveat:** Current project positioning says Vercel will actively maintain the Shopify version. It is better fit if the business chooses Shopify as commerce backend, not if MongoDB/custom backend is a firm requirement.

### Candidate C — Medusa + Next.js starter

Documentation: https://docs.medusajs.com/resources/nextjs-starter  
**Potential fit:** More mature commerce primitives, with headroom for more complex catalogue and operations.

**Caveats:** Medusa uses its own commerce backend and PostgreSQL rather than MongoDB. More infrastructure and concepts than this two-SKU MVP probably needs. Official documentation notes the standalone Next.js starter is deprecated since Medusa v2.14.0; use the currently documented `create-medusa-app` starter path if selecting Medusa.

### Decision

**Provisional recommendation:** Start with Candidate A for design/product-list UI only, then implement the minimum secure backend and real payment/fulfilment flows. Re-evaluate before coding if the founder prefers quickest time-to-market over custom architecture; a managed platform such as Shopify could reduce maintenance burden, though it changes the stack and adds platform/payment/app costs.

**Repository adoption gate:**
1. Clone and run on supported Node version.
2. Review license and transitive dependencies.
3. Run lint, type-check, tests, production build, and available security audit.
4. Trace checkout end-to-end; confirm all price calculations and order creation occur server-side.
5. Trace auth/admin routes and remove demo credentials and insecure placeholders.
6. Confirm actual HTML output, metadata, image handling, schema correctness, mobile performance, and reduced-motion behavior.
7. Create an issue list and estimate the cost of replacing mock data/auth/checkout before adopting.

## 13. Risks and mitigations

- **Product authenticity/value uncertainty:** keep the ring unpublished until composition and pricing justification are substantiated.
- **Supplier stock-out after purchase:** establish a stock confirmation cadence and a written cancel/refund SLA; later integrate inventory if supplier supports it.
- **Dropship fulfilment quality:** place test orders and define packaging, dispatch, tracking, return, breakage, and escalation responsibilities in writing.
- **Low contribution margin:** calculate per-SKU costs including shipping, payment fees, refunds/RTO, tax, ad spend and fixed costs before deciding promotions.
- **Over-engineering:** restrict MVP to catalog, checkout, order admin, corporate lead capture, and foundational SEO/performance.
- **Animation harms performance/accessibility:** use a motion budget, test real devices, and preserve reduced-motion behavior.
- **SEO/AEO expectations exceed reality:** implement best practices but do not promise rankings, traffic or AI citations.
- **Template security assumptions:** audit and replace demo provider/account behaviour before production.

## 14. Open decisions for founder review

**Already aligned:** Next.js App Router + React + TypeScript, MongoDB Atlas, and Next.js Route Handlers/server actions first; Express may be added later if a concrete integration/reuse/independent-scaling need appears. Preferred creative direction is youthful and minimalist with navy/silver contrast and a word-of-mouth-led growth strategy.

These items should be resolved before the relevant implementation begins:

**Decision 1 — Brand identity:** Final brand name, domain, social handles, logo, tagline and tone of voice. Validate the proposed navy/silver/cobalt palette with three Stitch prototypes before locking the tokens.

**Decision 2 — Positioning and first SKU:** Approve the initial gifting-led positioning and whether the silver-coated frame is the sole live SKU at launch; keep the ring unpublished until composition/value claims are verified.

**Decision 3 — Supplier agreement:** Confirm supplier legal name and written terms: cost inclusions, availability, dispatch SLA, shipping, packaging, blind shipping/brand inserts, returns/damages, warranty, invoice/GST handling, bulk quantities, branding options and escalation contact.

**Decision 4 — Delivery and COD:** Choose delivery provider/aggregator, shipping coverage, free-shipping threshold, delivery promise and COD policy.

**Decision 5 — Payments:** Confirm payment gateway and settlement/refund workflow.

**Decision 6 — Customer notifications:** Decide email only, manual WhatsApp, or a transactional WhatsApp integration later.

**Decision 7 — Authentication:** Confirm admin authentication and roles; customer accounts are not recommended for the MVP (use guest checkout).

**Decision 8 — Operations tooling:** Confirm hosting, transactional email sender, analytics, error monitoring and budget constraints.

**Decision 9 — Gifting and bulk fulfilment:** Confirm whether the supplier can add branded inserts/gift notes, fulfil corporate quantities, and handle returns/damage under written terms.

**Decision 10 — Compliance:** Confirm applicable legal, tax, product-labelling and privacy obligations with qualified advisors.

## 15. Release readiness checklist

Do not launch live payments until every P0 item below passes:

- [ ] Approved brand/domain, contact details and policy content.
- [ ] Supplier has passed sample and test-order review.
- [ ] Product material claims and all visible product details verified.
- [ ] Ring remains unpublished unless verified and approved.
- [ ] Prices/taxes/shipping/returns are reviewed and consistently displayed.
- [ ] Payment test passes; signature-verified webhook and idempotency tested.
- [ ] Order created once; notification errors don't lose orders.
- [ ] Supplier stock-out/cancel/refund process rehearsed.
- [ ] Admin authorisation and secrets checked; no demo credentials remain.
- [ ] Checkout/product mobile QA, keyboard accessibility, reduced-motion and major-browser checks pass.
- [ ] Sitemap, robots, canonicals, metadata, structured data and Search Console are configured.
- [ ] Analytics events verified and do not leak personal/payment data.
- [ ] Backups/recovery approach, monitoring and support owner are defined.
- [ ] Corporate enquiry notification and lead follow-up process are tested.

## 16. Review process and next documents

This PRD is the source of truth for the next artefacts. Review and approve or change requirements before detailed design is created.

1. **HLD:** application boundaries, deployment view, key components, trust boundaries, payment/order sequence, supplier fulfilment sequence, caching and observability.
2. **LLD:** page/component breakdown, module responsibilities, order state machine, validation, error handling, admin auth, idempotency, caching/invalidation and testing strategy.
3. **Database design:** MongoDB collections, key shapes, indexes, validation, retention and audit fields.
4. **API contract:** endpoints, request/response schemas, auth/roles, error codes, webhook verification, idempotency and rate limits.
5. **Implementation plan:** repository audit report, scaffold decision, milestones, tasks and definition of done.

**Review status:** Please review this PRD first. Items in Section 14 are explicit decision points; no HLD/LLD/database/API contract should silently assume answers to them.

## 17. References

1. Google Search Central — AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
2. Google Search Central — JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
3. Google Search Central — Product structured data / merchant listings: https://developers.google.com/search/docs/appearance/structured-data/product and https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
4. web.dev — Core Web Vitals: https://web.dev/articles/vitals
5. Epic Design Labs — Next.js ecommerce starter: https://github.com/Epic-Design-Labs/nextjs-ecommerce-starter
6. Vercel — Next.js Commerce: https://github.com/vercel/commerce
7. Medusa — Next.js starter storefront docs: https://docs.medusajs.com/resources/nextjs-starter
8. Google Labs — Stitch real-time design workflow (May 2026): https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/
9. Google Labs — Stitch DESIGN.md format (Apr 2026): https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
10. Dribbble — jewellery e-commerce design references: https://dribbble.com/search/jewellery-ecommerce-website
11. Nekativ — Spanos fine jewellery e-commerce case study: https://www.nekativ.com/projects/spanos-website
12. Higgsfield — AI website/creative workflow overview (use for concepting, not product-fact authority): https://higgsfield.ai/blog/build-website-with-ai

---
**End of PRD v0.2 — Founder feedback incorporated; pending detailed review**
