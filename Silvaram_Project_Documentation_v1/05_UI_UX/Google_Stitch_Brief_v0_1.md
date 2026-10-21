# Google Stitch Prompt — India-First Gifting & Silver Design Store

## Goal
Create a high-fidelity responsive e-commerce design concept for a new India-first gifting and design brand. The first live product is expected to be a silver-coated photo frame priced around ₹1,200; the brand may later expand into silver-plated statement jewellery, keepsakes, gift sets and corporate gifting. Do not make the website feel like a generic jewellery Shopify theme or a drop-shipping catalogue.

## Emotional response to design for
The customer should feel curiosity first, imagine the reaction of the gift recipient, understand the item and its material honestly, feel reassured about delivery/returns, and have an optional reason to tell someone about the brand. The mood is youthful, modern, minimalist, art-directed and a little futuristic—but human and warm rather than cold sci-fi.

## Visual system to explore
- Midnight Navy: `#0C1B36`
- Porcelain: `#F7F5F0`
- Silver Mist: `#D9DFE8`
- Electric Cobalt: `#6178FF` (sparingly; verify contrast before finalising)
- Graphite: `#222B3A`
- Use navy for the hero and storytelling moments; use light/porcelain surfaces for product details, specs and checkout clarity.
- Pair an editorial display face for short headlines with a clean, highly legible sans-serif for product info, price and forms.
- Use generous negative space, asymmetric editorial composition, authentic product imagery, clear hierarchy and minimal chrome.

## Generate three different directions
1. **Midnight Gallery:** deep navy canvas, one highly art-directed silver frame, quiet editorial headline, minimal navigation, clear shopping CTA.
2. **The Gift Ritual:** porcelain product-shopping surfaces, warm emotional copy, a simple gift note/occasion interaction, navy as the anchor colour.
3. **Electric Editorial:** stronger youthful typography, restrained cobalt accents, modular product/story grid, still elegant and easy to shop.

Do not combine all three into a busy page. Present them as three separate concepts to compare, then refine one system.

## Initial homepage layout
1. A slim announcement bar with a useful fact only when true (e.g. dispatch/packaging detail); do not invent free shipping or limited stock.
2. A compact header with wordmark placeholder, Shop, Gifts, Corporate Gifting, About, Search and Cart.
3. Hero headline concept: **“Give a memory a place to live.”** Supporting line: “Thoughtful keepsakes for the people who make life matter.” CTA: **“Make it a gift.”** This is draft copy, not final branding.
4. A large, beautiful product image on contrasting navy with a secondary light-background image showing accurate product details.
5. A short “For the moments that matter” storytelling section with prompts such as “A thank-you,” “A milestone,” “Just because.” Do not make these fake product categories while only one SKU exists; link to the same product or a gift concierge if appropriate.
6. Product facts and trust: material/coating, dimensions, price, delivery estimate, care and return terms, using only verified details.
7. Corporate gifting panel and enquiry CTA.
8. Compact FAQ and a refined footer with contact, shipping/returns and policy links.

## Product detail page
- Real product gallery with clear scale and accurate colour; no generated visual may misrepresent the real SKU.
- Clearly visible price and purchase CTA without a blocking intro animation.
- Verified base material and coating, dimensions, weight where useful, care, dispatch estimate and return policy.
- Optional gift message only if the fulfilment workflow truly supports it.
- A restrained story module that explains the gifting use case, without unsupported claims.
- Fast mobile layout with readable text, obvious quantity/availability and accessible controls.

## Motion and interaction constraints
- Lightweight hero reveal; subtle image/card response; clean cart drawer transition.
- Prefer CSS transforms/opacity or a small motion library; no WebGL, scroll-jacking, custom cursor dependency or autoplay sound.
- Respect `prefers-reduced-motion`; no essential information can depend on hover or animation.
- Keep the product title, price, availability, delivery information and CTA accessible immediately.
- Design for accessible contrast and keyboard/touch use.

## Design deliverables
- Desktop homepage at 1440 px, mobile homepage at 390 px, product page, cart drawer, corporate gifting landing page and a small design token sheet.
- Show component states for primary CTA, hover/focus, unavailable product, form errors, cart empty/filled and reduced-motion behavior where possible.
- Document colour roles, typography scale, spacing, border radius, buttons, inputs, product card and animation principles in a reusable `DESIGN.md`.

## Hard constraints
- Do not fabricate silver purity, hallmarking, product dimensions, stones, reviews, stock scarcity, delivery guarantees or customer testimonials.
- Do not copy the visual identity or page layouts of CaratLane, Tanishq or another competitor. Use them only as category references, not as templates.
- The design must be implementable in Next.js App Router + React + TypeScript + Tailwind CSS, with MongoDB and Next.js Route Handlers handled later in engineering. The prototype does not need a functional backend.
- Prioritise speed, readability, trust and share-worthy presentation over decorative effects.
