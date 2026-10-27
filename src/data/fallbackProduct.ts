import type { PublicProductDto } from "@/types/products";

/** Bundled catalogue entry. Shown while Appwrite loads, or when it is unconfigured/unreachable. */
export const FALLBACK_PRODUCT: PublicProductDto = {
  sku: "SIL-FRAME-001",
  slug: "silver-coated-frame",
  type: "decorative_frame",
  title: "The Sacred Keepsake Frame • Lakshmi-Ganesha Edition",
  shortDescription:
    "An architectural devotional keepsake frame featuring pure 999 fine silver clad relief of Sri Lakshmi & Sri Ganesha in monolithic optical acrylic.",
  description:
    "Crafted with precision geometry, this architectural devotional sanctuary preserves your most sacred blessings and cherished memories.",
  materialDisclosure:
    "Verified Composition: Precision engineered structural composite core with verified electroformed 999 fine silver cladding. Anti-tarnish nano-ceramic sealed.",
  priceRupees: "1200.00",
  compareAtPriceRupees: null,
  currency: "INR",
  images: [
    {
      url: "/products/frame-01.webp",
      alt: "Silveram Sacred Keepsake Frame",
      width: 933,
      height: 1400,
      position: 0,
    },
  ],
  variants: [
    {
      key: "default",
      label: "Standard Tabletop (18.5 × 23.5 cm)",
      priceRupees: "1200.00",
      options: { size: "tabletop" },
      active: true,
    },
  ],
  featuredRank: 1,
};
