"use client";

import React from "react";
import { Layers, ThumbsUp } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";

interface MaterialitySpecsProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function MaterialitySpecs({ product, onAddToCart }: MaterialitySpecsProps) {
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  return (
    <section id="materiality" className="w-full bg-porcelain py-20 px-6 lg:px-12 text-graphite border-b border-silver/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-cobalt block mb-2">
            Technical Honesty
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            Radical transparency in our metals & craft.
          </h2>
          <p className="text-sm text-graphite-muted mt-3 leading-relaxed">
            We believe luxury should be accessible and truthful. Here is every exact specification of how the Silveram Keepsake Frame is engineered.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Macro Visual & 3-Tier Layering System */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="w-full h-80 rounded-[4px] overflow-hidden bg-porcelain-muted relative border border-silver/40 shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTIkUfYS9k0jMwXKapmOXhyO-TV5vsZIu_Og5nt6DdEaijow_Z_u-YiZyk3xxd5J6KWmbd3A1k8m_a0UwdekrXO-GL8KdSUbRJyb201Z_JPpexaCzbKad9NaHXep1GGJBcuscPKRddopegIui4wOiC18Q8zRzhh0yL1gic_4dOT5KDX_7rMjPXmBaJRrVC7ufTcOsjDgSyxdKgvB7C08CX2gOnGh4ELeBcSVpd7iWXV0HRkL_gfN0s"
                alt="Extreme macro studio shot of silver bezel frame with fine micro textures"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-midnight/90 text-porcelain px-3 py-1 rounded-[4px] text-[10px] tracking-wider uppercase font-bold backdrop-blur-sm border border-silver/20">
                Cross-Section View
              </div>
            </div>

            {/* Purity Breakdown Graphic Card */}
            <div className="p-6 rounded-[4px] bg-white border border-silver/50 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-midnight flex items-center gap-2 uppercase tracking-wide">
                <Layers className="w-4 h-4 text-cobalt" />
                <span>The 3-Tier Layering System</span>
              </h4>

              <div className="space-y-4 text-xs text-graphite-muted">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-cobalt font-bold text-sm">01</span>
                  <div>
                    <p className="font-semibold text-midnight text-xs">
                      Substrate Core: Weighted Architectural Alloy
                    </p>
                    <p className="text-[11px] mt-0.5 leading-relaxed">
                      280 grams of solid composite metal. Feels reassuringly dense in hand, never flimsy or tin-like.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-cobalt font-bold text-sm">02</span>
                  <div>
                    <p className="font-semibold text-midnight text-xs">
                      Electro-Deposit: Pure 999 Fine Silver
                    </p>
                    <p className="text-[11px] mt-0.5 leading-relaxed">
                      High-micron bath deposition providing authentic silver luminosity, depth, and vintage luster.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-cobalt font-bold text-sm">03</span>
                  <div>
                    <p className="font-semibold text-midnight text-xs">
                      Armor: Nano-Ceramic Shield
                    </p>
                    <p className="text-[11px] mt-0.5 leading-relaxed">
                      Invisible baked barrier preventing sulfur air-oxidation. Wipe clean with dry lint-free cloth only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specification Matrix */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="overflow-hidden rounded-[4px] bg-white border border-silver/50 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-silver/30">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cobalt">
                    Dimension & Fit
                  </span>
                  <h3 className="font-serif text-2xl text-midnight font-normal mt-1">
                    The Specification Matrix
                  </h3>
                </div>
                <span className="px-3 py-1 bg-porcelain-muted text-midnight rounded-[4px] text-xs font-mono font-semibold border border-silver/40">
                  SKU: {product?.sku || "SIL-FRAME-001"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Outer Dimensions
                  </span>
                  <p className="text-sm font-semibold text-midnight">
                    18.5 cm × 23.5 cm × 1.8 cm
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    Designed for vertical tabletop or mantle display
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Photo Aperture Capacity
                  </span>
                  <p className="text-sm font-semibold text-midnight">
                    Fits 4" × 6" (with mat) or 5" × 7" (full)
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    Includes removable acid-free bevel matting
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Weight & Hand-Feel
                  </span>
                  <p className="text-sm font-semibold text-midnight">
                    360 grams (Gross unboxed weight)
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    Reassuring heft that stays grounded on tables
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Glass Spec
                  </span>
                  <p className="text-sm font-semibold text-midnight">
                    2.0mm High-Clarity Optical Glass
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    99% UV attenuation protects ink against fading
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Backing Easel
                  </span>
                  <p className="text-sm font-semibold text-midnight">
                    Charcoal Black Velvet Plush Easel
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    Dual-hinged brass fixtures for stability
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block mb-1 font-bold">
                    Pricing Integrity
                  </span>
                  <p className="font-serif text-lg font-bold text-midnight">
                    {priceDisplay} All-Inclusive
                  </p>
                  <p className="text-[11px] text-graphite-muted">
                    Includes GST, rigid keepsake box & envelope
                  </p>
                </div>
              </div>

              {/* Assurance Callout */}
              <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-porcelain-muted p-4 rounded-[4px] border border-silver/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-cobalt border border-silver/40">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-midnight">
                      7-Day "Delighted or Replaced" Guarantee
                    </p>
                    <p className="text-[11px] text-graphite-muted">
                      Transit damage replaced on immediate photo review, zero questions asked.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onAddToCart}
                  className="whitespace-nowrap px-6 py-2.5 bg-midnight text-white text-xs font-bold uppercase tracking-wider rounded-[4px] hover:bg-midnight-light transition-colors"
                >
                  Order Keepsake Frame
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
