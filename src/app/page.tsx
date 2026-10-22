import { getProductsCollection } from "@/server/db/collections";
import { toPublicProductDto } from "@/server/domain/products/schema";
import { PublicProductDto } from "@/types/products";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/product/HeroSection";
import { OccasionsSection } from "@/components/gifting/OccasionsSection";
import { UnboxingSuite } from "@/components/gifting/UnboxingSuite";
import { MaterialitySpecs } from "@/components/product/MaterialitySpecs";
import { PincodeTransitEstimator } from "@/components/commerce/PincodeTransitEstimator";
import { CorporateGiftingSection } from "@/components/corporate/CorporateGiftingSection";
import { FaqSection } from "@/components/trust/FaqSection";
import { StickyBottomDock } from "@/components/layout/StickyBottomDock";
import { Footer } from "@/components/layout/Footer";

async function getFeaturedProducts(): Promise<PublicProductDto[]> {
  try {
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

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const heroProduct = products[0];

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

        {/* Section 2: Intentional Gifting Occasions */}
        <OccasionsSection />

        {/* Section 3: The Ceremonial Unboxing Suite */}
        <UnboxingSuite />

        {/* Section 4: Honest Materiality & Specs */}
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
