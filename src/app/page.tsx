import { getProductsCollection } from "@/server/db/collections";
import { toPublicProductDto } from "@/server/domain/products/schema";
import { PublicProductDto } from "@/types/products";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/product/HeroSection";
import { LetterRitual } from "@/components/gifting/LetterRitual";
import { OccasionsSection } from "@/components/gifting/OccasionsSection";
import { UnboxingSuite } from "@/components/gifting/UnboxingSuite";
import { RealMoments } from "@/components/trust/RealMoments";
import { MaterialitySpecs } from "@/components/product/MaterialitySpecs";
import { PincodeTransitEstimator } from "@/components/commerce/PincodeTransitEstimator";
import { CorporateGiftingSection } from "@/components/corporate/CorporateGiftingSection";
import { FaqSection } from "@/components/trust/FaqSection";
import { StickyBottomDock } from "@/components/layout/StickyBottomDock";
import { Footer } from "@/components/layout/Footer";

async function getFeaturedProducts(): Promise<PublicProductDto[]> {
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_URI.startsWith("mongodb")) {
      return [];
    }
    const productsCol = await getProductsCollection();
    const activeProducts = await productsCol
      .find({ status: "active" })
      .sort({ featuredRank: 1 })
      .toArray();

    return activeProducts.map((p) => toPublicProductDto(p, "en"));
  } catch (error) {
    console.error("Failed to load featured products from database:", error);
    return [];
  }
}

const FALLBACK_PRODUCT: PublicProductDto = {
  sku: "SIL-FRAME-001",
  slug: "silver-coated-frame",
  type: "decorative_frame",
  title: "The Sacred Keepsake Frame • Lakshmi-Ganesha Edition",
  shortDescription: "An architectural devotional keepsake frame featuring pure 999 fine silver clad relief of Sri Lakshmi & Sri Ganesha in monolithic optical acrylic.",
  description: "Crafted with precision geometry, this architectural devotional sanctuary preserves your most sacred blessings and cherished memories.",
  materialDisclosure: "Verified Composition: Precision engineered structural composite core with verified electroformed 999 fine silver cladding. Anti-tarnish nano-ceramic sealed.",
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

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const heroProduct = products[0] || FALLBACK_PRODUCT;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Unified Fixed Header with Announcement Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <AnnouncementBar />
        <Header />
      </header>

      {/* 2. Main Content Container (with top offset for fixed header) */}
      <main className="w-full pt-[116px] bg-porcelain flex-1">
        {/* Section 1: Cinematic Midnight Hero */}
        <HeroSection product={heroProduct} />

        {/* Signature Storytelling Interaction: A letter for someone you love */}
        <LetterRitual />

        {/* Section 2: Intentional Gifting Occasions */}
        <OccasionsSection />

        {/* Section 3: The Ceremonial Unboxing Suite */}
        <UnboxingSuite />

        {/* Section 4: Real Indian Family Moments (Curated Placement Photography) */}
        <RealMoments />

        {/* Section 5: Honest Materiality & Specs */}
        <MaterialitySpecs product={heroProduct} />

        {/* Section 4: Real-Time Pincode Transit Estimator */}
        <PincodeTransitEstimator />

        {/* Section 5: Corporate & Curated Gifting Suite */}
        <CorporateGiftingSection />

        {/* Section 6: Compact Honest FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 4. Sticky Conversion Bottom Dock */}
      <StickyBottomDock product={heroProduct} />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
