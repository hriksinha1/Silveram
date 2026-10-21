---
name: Luminescent Modernity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d1daee'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dfe8fd'
  surface-container-highest: '#dae3f7'
  on-surface: '#131c2a'
  on-surface-variant: '#45474d'
  inverse-surface: '#283140'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#515e7d'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0c1b36'
  on-primary-container: '#7684a4'
  inverse-primary: '#b8c6ea'
  secondary: '#344cd4'
  on-secondary: '#ffffff'
  secondary-container: '#5067ee'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#161c23'
  on-tertiary-container: '#7e848c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b8c6ea'
  on-primary-fixed: '#0c1b36'
  on-primary-fixed-variant: '#394764'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#000f5d'
  on-secondary-fixed-variant: '#1533be'
  tertiary-fixed: '#dde3ec'
  tertiary-fixed-dim: '#c1c7d0'
  on-tertiary-fixed: '#161c23'
  on-tertiary-fixed-variant: '#41474f'
  background: '#f9f9ff'
  on-background: '#131c2a'
  surface-variant: '#dae3f7'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  spec-numeral:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-regular:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style

This design system expresses a dual sensibility: the architectural quietude of contemporary silversmithing paired with an energetic, digitally native vitality. The visual language speaks to an intentional, design-conscious audience seeking modern heirloom jewelry without traditional bridal weight or ephemeral fast-fashion tropes. 

The aesthetic is grounded in an art-directed editorial minimalism with subtle neo-brutalist structural discipline. It embraces generous asymmetric white space, sharp typographic contrasts, and refined metallic precision. Rich storytelling moments unfold against deep oceanic canvases, transitioning seamlessly into crisp, warm light surfaces for technical disclosures, silver purity specifications, and transactional clarity. The emotional atmosphere is calm, cerebral, authentic, and decisively modern.

## Colors

The palette operates on purposeful dynamic polarity:

- **Porcelain Canvas (`#F7F5F0`)**: The primary light ground for detailed product viewports, spec sheets, transparent pricing schedules, and checkout flows. Its warm mineral undertone prevents visual fatigue and avoids sterile hospital whites.
- **Midnight Navy (`#0C1B36`)**: The primary brand anchor. Used for structural framing, footers, full-bleed hero passages, and immersive storytelling sections.
- **Electric Cobalt (`#6178FF`)**: The youthful kinetic accent. Applied with disciplined restraint to interactive highlights, focused tabs, cart alerts, and verified badge accents. When used with text, ensure pairing meets APCA/WCAG contrast compliance against porcelain or deep navy grounds.
- **Silver Mist (`#D9DFE8`)**: The metallic hairline tone. Utilized for 1px architectural grid boundaries, hairline dividers, and muted badge backgrounds.
- **Graphite (`#222B3A`)**: The neutral text baseline for primary copy, technical hallmarks, and crisp high-contrast interactive buttons.

Surface transitions must be binary and architecturally defined—avoid gradient transitions between porcelain and midnight navy zones.

## Typography

Typography establishes an intentional dialogue between classical jewelry editorial craft and contemporary technical transparency.

- **Editorial Serifs (Playfair Display)**: Reserved strictly for brand narratives, collection titles, emotional pull quotes, and hero hooks. Never italicize arbitrarily; use italics only for poetic product names or tactile material notes (e.g., *925 Sterling Silver*).
- **Geometric Sans (Plus Jakarta Sans)**: Handles all transactional and structural heavy lifting. Numerical currency displays (₹ INR figures), hallmarking codes (e.g., BIS 925), pin-code validation prompts, weight metrics, and navigation rely on this crisp, low-distortion sans.
- **Numbers and Currency**: Always render currency marks and numerical amounts in tabular/proportional sans-serif with medium to semi-bold weights for rapid ocular scanning.

## Layout & Spacing

The layout model is driven by an asymmetric 12-column responsive fluid grid designed around gallery proportions:

- **Desktop (1200px and up)**: 12 columns with generous `margin` (3rem) and dynamic `gutter` (1.5rem). Modules follow uneven rhythms (e.g., 5-column product imagery paired with 7-column staggered narrative copy).
- **Tablet (768px – 1199px)**: 8 columns with 2rem margins and 1.25rem gutters. Content blocks coalesce into alternating modular pairs.
- **Mobile (below 768px)**: 4 columns with `margin-mobile` (1.25rem) and `gutter-mobile` (1rem). Product grids collapse into clean single-column presentation or horizontal snap carousels for detail cards.

Spacing emphasizes vertical breathing room. Narrative text blocks must never touch full container edges; use interior padding (`space-lg` to `space-xl`) to establish an open white-cube exhibition feel.

## Elevation & Depth

This design system avoids blurry layered drop shadows, faux skeuomorphism, and heavy blur effects. Depth is articulated purely through tonal planes and sharp micro-boundaries:

- **Zero-Shadow Philosophy**: Floating cards and popups do not cast fuzzy shadows. Instead, surfaces separate through flat structural contrast (e.g., Porcelain layers against Silver Mist hairline rules `#D9DFE8`).
- **Architectural Hairlines**: Use razor-sharp 1px solid borders in Silver Mist to define layout boundaries, card perimeters, and pinned navigation elements.
- **High-Contrast Dark Canvas Depth**: Storytelling cards placed over Midnight Navy surfaces use a slightly lifted tone (`#132445`) framed with a 10% opacity white boundary to signal depth without optical weight.
- **Modals & Drawers**: Pinned checkout panels or pincode entry sheets use flat backdrops with a 40% Midnight Navy veil, sliding in cleanly with strict 1px hairline delimiters.

## Shapes

The shape vocabulary prioritizes structured, tailored precision:

- A subtle **Soft (`1`)** roundness (4px baseline) is used across interactive elements, badges, and image frames. This softens raw industrial brutalism while avoiding the mass-market, casual feel of circular pills or deep bubbly corners.
- Micro-elements such as trust chips and purity tags maintain crisp 2px to 4px boundaries.
- Full bleed imagery retains sharp, perpendicular cuts against hairline dividing grids.

## Components

### Buttons
- **Primary Action**: Solid Graphite (`#222B3A`) ground, Porcelain (`#F7F5F0`) sans-serif medium typography, 4px border radius. Hover state transitions to pure Midnight Navy (`#0C1B36`).
- **Kinetic Accent**: Electric Cobalt (`#6178FF`) ground with white text, strictly reserved for immediate conversion triggers (e.g., "Add to Keepsake Box", "Verify Delivery").
- **Secondary / Ghost**: Transparent fill with a 1px Silver Mist (`#D9DFE8`) border, Graphite text. Transitions to subtle Porcelain tint on hover.

### Trust Indicators & Hallmarks (India-First Specs)
- **Purity Badges**: Minimalist tabular chips highlighting "925 Certified Sterling Silver", "Anti-Tarnish Rhodium Sealed", and "Hallmarked". Framed in 1px Silver Mist with micro-dot status lights.
- **Pincode & Delivery Validator**: Compact, integrated hairline input fields paired with an immediate inline validation button. Success indicators render with an Electric Cobalt micro-check and definitive delivery date estimates (e.g., "Arrives by Friday to 560001, Bangalore").

### Product Display Cards
- Uncluttered presentation featuring a light Porcelain surface, 1px Silver Mist structural border, zero shadow, and asymmetrical image framing.
- Price display: Strict numerical clarity displaying the Indian Rupee symbol (`₹1,200`) in semi-bold Plus Jakarta Sans, alongside clear net weight and metal purity declarations.

### Input Fields & Selectors
- Flat surfaces with 1px Silver Mist borders. Focused states snap cleanly into a 1px Electric Cobalt stroke without outer halo rings. Typography remains crisp Graphite.

### Checkboxes & Segmented Controls
- Minimalist squared forms with 2px corner radii. Checked state fills with Midnight Navy or Electric Cobalt bearing a hairline white tick mark.