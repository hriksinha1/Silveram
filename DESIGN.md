# Silveram Design System & Direction Specification
**Version:** 0.3.0 · Google Stitch Architectural Brief  
**Status:** Consolidated Production System · *Midnight Gallery + The Gift Ritual*  
**Brand:** Silveram (India-First Gifting & Keepsakes Atelier)  
**Primary Anchor SKU:** The Sacred Keepsake Frame • Lakshmi-Ganesha Edition (₹1,200.00)

---

## 1. Three Exploratory Design Directions & Evaluation

Before converging on the production architecture, three distinct design directions were evaluated:

### Direction 1: Midnight Gallery
- **Canvas:** Full deep Midnight Navy (`#0C1B36`) throughout.
- **Tone:** Austere, museum-like, architectural, high drama.
- **Strengths:** Elevated product perceived value; pure silver cladding caught dramatic virtual specular glints against dark background.
- **Risks:** Can feel intimidating, overly solemn, or cold for day-to-day gifting. Forms and text inputs suffer from contrast strain if all surfaces are dark.

### Direction 2: The Gift Ritual
- **Canvas:** Warm Porcelain (`#F7F5F0`) as the dominant surface with Midnight Navy as an anchor.
- **Tone:** Intimate, tactile, warm, sentimental, deeply human.
- **Strengths:** Natural reading comfort for long-form dedications, checkout transparency, packaging unboxing clarity.
- **Risks:** Lacks the initial cinematic punch and sacred gravitas expected of pure 999 silver coated religious heirlooms.

### Direction 3: Electric Editorial
- **Canvas:** High-contrast grid with vibrant Electric Cobalt (`#6178FF`) structural lines, dynamic asymmetric blocks, and ultra-bold contemporary sans-serif typography.
- **Tone:** Youthful, modern, energetic, avant-garde.
- **Strengths:** High conversion urgency and distinct Gen-Z/millennial gifting appeal.
- **Risks:** Distracts from spiritual and emotional reverence; can cross the line into tech/crypto aesthetics.

### The Winning Consolidated Strategy: *Midnight Gallery + The Gift Ritual*
Rather than creating an overcrowded Franken-page, Silveram implements a **rhythmic dual-canvas hierarchy**:
1. **Midnight Gallery Canvas (`#0C1B36`):** Reserved strictly for the **Hero 3D Tabletop Stage**, the **Signature Letter Ritual**, the **Ceremonial Unboxing Suite**, and the **Curated Placement Sanctuaries**.
2. **Gift Ritual Porcelain Canvas (`#F7F5F0`):** Used for **Intentional Gifting Occasions**, **Honest Materiality & Specs**, **Real-Time Pincode Transit**, and the **Slide-Over Bag Drawer & Checkout Modal**.
3. **Electric Cobalt Accent (`#6178FF`):** Employed with extreme restraint (<3% visual weight) purely for active focal rings, laser badge indicators, and primary action anchors.

---

## 2. Colour System & Contrast Matrix

All colours meet or exceed **WCAG 2.1 AA** (and AAA where specified) contrast ratios.

| Token Name | Hex Code | Role & Surface | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| **Midnight Navy** | `#0C1B36` | Primary cinematic canvas, dark buttons, text on porcelain | `14.2:1` on `#F7F5F0` (AAA) |
| **Porcelain** | `#F7F5F0` | Primary daytime canvas, letter card paper, light cards | `14.2:1` with `#0C1B36` (AAA) |
| **Silver Mist** | `#D9DFE8` | Architectural borders, subtle foil sheen, hairline grids | Structural separator |
| **Electric Cobalt** | `#6178FF` | Restrained interactive focus, active badges, status pings | Verified on dark / white |
| **Graphite** | `#222B3A` | Secondary body text on light backgrounds | `10.8:1` on `#F7F5F0` (AAA) |
| **Graphite Muted**| `#64748B` | Captions, hallmarks, timestamps, metadata | `4.6:1` on `#F7F5F0` (AA) |
| **Emerald Sanctuary** | `#10B981` | Transit verification, authentication checkmarks | Verified on dark backgrounds |

---

## 3. Typography Scale & Multilingual Rhythm

### Typefaces
- **Editorial Serif Display:** `Playfair Display` (Latin) / High-legibility Devanagari system serif. Used for emotional headlines, memory dedications, and certificate wordmarks.
- **Functional Clean Sans:** `Plus Jakarta Sans`. Used for navigation, product specs, pricing, form fields, and status indicators.
- **Technical Monospace:** `JetBrains Mono` / `ui-monospace`. Used for coordinates, SKU tags (`SLV-INS-999`), and mathematical ratios ($\Phi = 1.618$).

### Type Scale
- **Display 1 (Hero Title):** `3.75rem (60px)` · Line height `1.08` · Letter-spacing `-0.02em` · Normal weight
- **Display 2 (Section Title):** `2.5rem (40px)` · Line height `1.15` · Normal weight
- **Heading 3 (Card / Letter Title):** `1.5rem (24px)` · Line height `1.25` · Normal weight
- **Body Large (Editorial Lead):** `1.125rem (18px)` · Line height `1.6` · Light weight (`300`)
- **Body Standard:** `0.875rem (14px)` · Line height `1.5` · Light / Regular
- **Caption / Hallmark:** `0.6875rem (11px)` · Line height `1.4` · Letter-spacing `0.05em`
- **Micro Code / Coordinate:** `0.5625rem (9px)` · Line height `1.2` · Letter-spacing `0.25em` · All Caps

---

## 4. Spacing, Elevation & Geometry

### Spacing Scale
- `2xs: 4px` · `xs: 8px` · `sm: 12px` · `md: 16px` · `lg: 24px` · `xl: 32px` · `2xl: 48px` · `3xl: 64px` · `4xl: 96px` · `5xl: 128px`

### Border Radius Hierarchy
- **Pills & Circular Badges:** `rounded-full` (`9999px`) for all action CTAs, language pills, audio toggles, and status badges.
- **Architectural Cards & Letter:** `rounded-[12px]` with hairline `1px` borders (`border-white/10` or `border-silver/40`).
- **Inner Modules / Input Fields:** `rounded-[8px]` or `rounded-[6px]`.

### Elevation & Depth Physics
- **Letter Ritual Card:** `shadow-[0_30px_70px_rgba(0,0,0,0.45)]`
- **3D Tabletop Contact Shadow:** Realistic elliptical blurred grounding gradient (`scaleX(1) scaleY(1)` with `blur-md`).
- **Slide-Over Cart Drawer:** Fixed viewport drawer with `backdrop-blur-xl` overlay (`bg-midnight/70`).

---

## 5. Signature Components Specification

### 5.1 The Signature Letter Ritual (`LetterRitual.tsx`)
- **Metaphor:** A sealed physical envelope resting on a deep Midnight Navy canvas.
- **States:**
  1. *Closed Envelope:* Features an embossed geometric wax seal (`SLV RITUAL`), an invitation caption, and the `Open your letter` button.
  2. *Opening Movement:* On click, the envelope pocket recedes and the warm porcelain letter rises upward (`translateY(-80px)` to `-112px`).
  3. *Story Pages (01 to 04):* Each page presents an intimate narrative phase:
     - Page 1: *The thought* (`It always starts with someone.`)
     - Page 2: *The search* (`Then you look for a way to say it.`)
     - Page 3: *The choosing* (`A little thing can hold a lot of meaning.`)
     - Page 4: *The moment* (`And then, the moment is theirs.` + Closing line)
  4. *Navigation:* "Turn the page →" inside the letter. "← Previous" available from Page 2 onward.
  5. *Resolution:* Page 4 reveals the primary CTA `Find their keepsake ↗` and secondary `Read the letter again` reset.
- **Strict Constraint:** Never autoplay story pages. The user controls pacing completely.

### 5.2 3D Tabletop Physicality & Inscription Studio (`FrameViewer3D.tsx`)
- Upright portrait orientation ($933 \times 1400$ ratio).
- Interactive 3D flip card revealing the laser-engraved silver plaque on the reverse.
- Mobile horizontal thumb swipe gesture recognition (`onTouchStart`/`onTouchEnd`).
- Architectural Blueprint wireframe toggle.
- Live bilingual inscription synchronization with the Cart Drawer.

### 5.3 Ceremonial Unboxing Suite (`UnboxingSuite.tsx`)
- Rigid 1200 GSM presentation box graphic with live reactive satin ribbon switcher:
  - *Imperial Navy:* Devotion & Sanctuary
  - *Kashi Crimson:* Auspiciousness & Blessings
  - *Sacred Saffron:* Divinity & Warmth
  - *Temple Pearl:* Purity & Peace
- Serialized Certificate of Authenticity card preview.

### 5.4 Slide-Over Cart Drawer (`CartDrawer.tsx`)
- Live preview card showing chosen front angle or reverse engraved plaque.
- Archival Photo Upload Dropzone ($260\text{ GSM}$ archival luster print).
- Framing preference selector (`Pre-Installed in Frame` vs `In Gold-Foil Envelope`).
- Transparent zero-surprise summary (Plaque free, Photo free, Packaging free).

---

## 6. Motion & Web Audio Micro-Interactions

### Sound Synthesis (Zero-Asset Web Audio API)
No external MP3 files, 0 network bytes, 0ms latency:
1. **Metallic Silver Chime (`playSilverChime`):** Synthesized bell overtones ($2100\text{ Hz}, 2800\text{ Hz}, 3500\text{ Hz}$ sine waves with exponential decay over $0.9\text{s}$) triggered when flipping the frame or selecting presets.
2. **Satin Ribbon Rustle (`playPaperRustle`):** Synthesized bandpass filtered noise ($1400\text{ Hz}$, $Q=2.5$ for $120\text{ms}$) triggered when switching ribbon swatches or opening the letter.
3. **Tactile Micro-Click (`playTactileClick`):** Rapid $800\text{ Hz} \to 120\text{ Hz}$ pitch drop over $30\text{ms}$ on toggle buttons.
4. **Mute State:** Fully persistent via `localStorage`, controllable via discreet toggles in both Header and Footer.

### Reduced Motion Compliance
All CSS animations and GSAP sequences adhere to `@media (prefers-reduced-motion: reduce)`. Essential content, forms, and shopping flows remain 100% accessible immediately without motion dependencies.

---

## 7. Analytics Specification

Non-sensitive interaction telemetry is dispatched via standard custom browser events (`silveram_analytics`):
- `gift_story_opened`: Triggered on "Open your letter" click.
- `gift_story_page_viewed`: Dispatched with `{ pageIndex: number }`.
- `gift_story_previous_clicked`: Dispatched with `{ pageIndex: number }`.
- `gift_story_completed`: Dispatched when reaching Page 4.
- `gift_story_cta_clicked`: Dispatched when clicking `Find their keepsake ↗`.
