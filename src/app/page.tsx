import Link from "next/link";
import { getProductsCollection } from "@/server/db/collections";
import { toPublicProductDto, PublicProductDto } from "@/server/domain/products/schema";
import { formatRupeesDisplay } from "@/server/db/decimal";

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
      {/* 1. Slim Announcement Bar */}
      <div className="bg-midnight-dark text-silver text-xs py-2 px-4 text-center tracking-wider uppercase font-medium border-b border-white/5">
        Pan-India Insured Delivery · Gift-Ready Packaging on Every Order
      </div>

      {/* 2. Compact Header */}
      <header className="sticky top-0 z-40 bg-porcelain/90 backdrop-blur-md border-b border-silver/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl tracking-widest text-midnight uppercase font-bold group-hover:text-cobalt transition-colors">
              SILVERAM
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-graphite">
            <Link href="#collection" className="hover:text-midnight transition-colors">
              Collection
            </Link>
            <Link href="#gifting" className="hover:text-midnight transition-colors">
              Gift Ritual
            </Link>
            <Link href="/corporate-gifting" className="hover:text-midnight transition-colors">
              Corporate Gifting
            </Link>
            <Link href="/about" className="hover:text-midnight transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="#collection"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-porcelain bg-midnight rounded-sm hover:bg-midnight-light transition-colors"
            >
              Explore Frame
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Midnight Gallery Hero Section */}
      <section className="bg-midnight text-porcelain relative overflow-hidden py-20 lg:py-28 px-6 border-b border-silver/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-white/10 text-silver text-xs uppercase tracking-widest rounded-full font-medium">
              Keepsakes & Design
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight font-normal text-porcelain">
              Give a memory <br />
              <span className="italic text-silver">a place to live.</span>
            </h1>
            <p className="text-silver/80 text-lg max-w-lg leading-relaxed font-light">
              Thoughtful keepsakes for the people who make life matter. Crafted in silver coat, finished with architectural restraint.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href="#collection"
                className="px-8 py-3.5 bg-porcelain text-midnight font-medium text-sm tracking-wide rounded-sm hover:bg-silver transition-all shadow-sm"
              >
                Make it a gift — {heroProduct ? formatRupeesDisplay(heroProduct.priceRupees) : "₹1,200.00"}
              </a>
              <Link
                href="/corporate-gifting"
                className="px-6 py-3.5 border border-silver/30 text-silver font-medium text-sm tracking-wide rounded-sm hover:bg-white/5 transition-all"
              >
                B2B & Milestone Inquiries
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] bg-gradient-to-b from-white/10 to-white/5 rounded-sm p-4 border border-silver/20 shadow-2xl flex flex-col items-center justify-center text-center group">
              <div className="w-full h-full border border-silver/30 rounded-sm p-6 flex flex-col items-center justify-center space-y-4 bg-midnight-dark/60">
                <div className="w-20 h-20 rounded-full border border-silver/40 flex items-center justify-center text-silver/60 text-xs tracking-widest font-mono">
                  SILVERAM
                </div>
                <div className="font-serif text-xl text-porcelain">
                  {heroProduct ? heroProduct.title : "Silver-Coated Keepsake Frame"}
                </div>
                <div className="text-sm font-medium text-silver">
                  {heroProduct ? formatRupeesDisplay(heroProduct.priceRupees) : "₹1,200.00"}
                </div>
                <div className="text-xs text-silver/60 max-w-xs leading-relaxed">
                  Verified electroplated silver coat over precision base alloy core.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Collection Showcase */}
      <section id="collection" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-graphite-muted font-semibold">
            The Launch Listing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            Honest Materials, Enduring Craft
          </h2>
          <p className="text-graphite-muted text-sm leading-relaxed">
            Every product detail is verified and independently disclosed. No simulated claims or inflated purity grades.
          </p>
        </div>

        {heroProduct ? (
          <div className="bg-porcelain-pure border border-silver/60 rounded-sm shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-silver/30 text-graphite rounded-sm">
                  Available for Immediate Dispatch
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-midnight font-normal">
                  {heroProduct.title}
                </h3>
                <p className="text-graphite/80 text-sm leading-relaxed">
                  {heroProduct.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-silver/30">
                <div className="text-xs text-graphite-muted bg-porcelain p-3.5 rounded-sm border border-silver/40">
                  <span className="font-semibold text-graphite block mb-1">Material Transparency:</span>
                  {heroProduct.materialDisclosure}
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <div className="text-2xl font-serif text-midnight font-medium">
                    {formatRupeesDisplay(heroProduct.priceRupees)}
                  </div>
                  <span className="text-xs text-graphite-muted">All taxes included</span>
                </div>

                <button
                  type="button"
                  className="w-full py-3.5 bg-midnight text-porcelain font-medium text-sm tracking-wide rounded-sm hover:bg-midnight-light transition-colors"
                >
                  Order Guest Checkout — {formatRupeesDisplay(heroProduct.priceRupees)}
                </button>
              </div>
            </div>

            <div className="bg-porcelain-muted border-t md:border-t-0 md:border-l border-silver/40 p-12 flex items-center justify-center">
              <div className="text-center space-y-4 max-w-xs">
                <div className="text-5xl font-serif text-midnight/20">4×6</div>
                <div className="font-serif text-lg text-midnight">Standard Portrait & Landscape</div>
                <p className="text-xs text-graphite-muted leading-relaxed">
                  Includes anti-tarnish protective coating, glare-resistant glass panel, and velvet backing stand.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-graphite-muted">
            Connecting to product catalogue...
          </div>
        )}
      </section>

      {/* 5. Gifting Ritual & Trust Pillars */}
      <section id="gifting" className="bg-porcelain-muted py-16 px-6 border-y border-silver/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-midnight font-medium">Material Integrity</h4>
            <p className="text-xs text-graphite-muted leading-relaxed">
              We state exactly what each item is made of. Never confusing silver coat with solid 925 sterling.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-midnight font-medium">Gift-Ready Unboxing</h4>
            <p className="text-xs text-graphite-muted leading-relaxed">
              Shipped in rigid, tamper-evident protective packaging suitable for immediate presentation.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-midnight font-medium">Insured Pan-India Transit</h4>
            <p className="text-xs text-graphite-muted leading-relaxed">
              Tracked end-to-end delivery with verified carrier status updates sent directly to your phone and email.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-midnight text-silver/80 text-xs py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-serif text-lg uppercase tracking-widest text-porcelain font-bold">
              SILVERAM
            </div>
            <p className="text-silver/60">India-first gifting and silver design store.</p>
          </div>

          <div className="flex gap-6 text-silver/70">
            <Link href="/policies/shipping" className="hover:text-porcelain transition-colors">
              Shipping Policy
            </Link>
            <Link href="/policies/returns" className="hover:text-porcelain transition-colors">
              Returns & Refunds
            </Link>
            <Link href="/policies/privacy" className="hover:text-porcelain transition-colors">
              Privacy
            </Link>
            <Link href="/policies/terms" className="hover:text-porcelain transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
