"use client";

import React from "react";
import { ArrowRight, ChevronDown, Gift, Truck, ShieldCheck } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";

interface HeroSectionProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function HeroSection({ product, onAddToCart }: HeroSectionProps) {
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  return (
    <section id="hero" className="relative w-full bg-midnight text-porcelain overflow-hidden py-16 lg:py-24 border-b border-silver/20">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cobalt/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-white/10 text-silver mb-6 self-start border border-silver/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Edition 01 — The Keepsake Frame • {priceDisplay}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-porcelain mb-6 leading-[1.1]">
              Give a memory<br />
              <span className="italic font-normal text-silver">a place to live.</span>
            </h1>

            {/* Body Narrative */}
            <p className="text-silver/80 text-base sm:text-lg max-w-xl mb-8 font-light leading-relaxed">
              Thoughtful keepsakes crafted for the people who make life matter. Hand-finished silver-coated photo frame with museum-grade archival matting, engineered for modern Indian spaces.
            </p>

            {/* Specifications Micro-Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-[4px] bg-white/5 backdrop-blur-sm mb-8 border border-silver/20 text-porcelain">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-silver/60 font-semibold">
                  Coating
                </span>
                <span className="text-xs sm:text-sm font-semibold text-porcelain">
                  999 Fine Silver Clad
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-silver/60 font-semibold">
                  Finish
                </span>
                <span className="text-xs sm:text-sm font-semibold text-porcelain">
                  Anti-Tarnish Sealed
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-silver/60 font-semibold">
                  Standard Dispatch
                </span>
                <span className="text-xs sm:text-sm font-semibold text-porcelain">
                  24–48 Hours
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onAddToCart}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[4px] bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-[0.98]"
              >
                <span>Make it a Gift — {priceDisplay}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#materiality"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[4px] bg-white/10 hover:bg-white/15 text-silver text-xs font-bold tracking-widest uppercase transition-colors border border-silver/30"
              >
                <span>Explore The Object</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Gift & Delivery Guarantee */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-silver/70 text-xs">
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-cobalt" />
                <span>Complimentary Rigid Box & Card</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cobalt" />
                <span>All-India Express Courier</span>
              </div>
            </div>
          </div>

          {/* Right: Gallery Composition with Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main Focal Image */}
              <div className="relative overflow-hidden rounded-[4px] bg-midnight-dark border border-silver/30 shadow-2xl">
                <img
                  className="w-full h-[450px] sm:h-[520px] object-cover object-center"
                  alt="Intricate silver-coated antique embossed photo frame resting on ivory console with luxury gift box"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VseaLqacLCWHqIb2xcXrF6nT0MXMvZcWNjGLVlT8p-vDlTjZ4dNg0NRkekEhH-SC4r2IL_faHE7OLeh5SPZ_A1uejHvfOiYnSqdaMXFs7dUqmNkXvIeB5FAEw6aunPBhn2FdaJ_Qoy0rQcvAWh0pjIQFc6YpfrUR36bvT2woO5_E7Ib8V8Ar83HBlxk_mvpp2MoGu_EXtzqP-FTjL1Nwqli0FDzslxtBLfBrDiBFGh5vz5_hzVyj-fOjY"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Seal Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[4px] bg-midnight/90 backdrop-blur-md border border-silver/30 flex items-center justify-between text-porcelain shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cobalt/20 flex items-center justify-center text-cobalt">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-porcelain leading-tight">
                        Silveram Certified Electroplated Coating
                      </p>
                      <p className="text-[11px] text-silver/70">
                        Nano-ceramic sealant guaranteed against indoor tarnishing
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-lg font-bold text-silver">
                    {priceDisplay}
                  </span>
                </div>
              </div>

              {/* Accent Floating Tag */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-porcelain text-midnight shadow-md border border-silver/50">
                <span className="w-2 h-2 rounded-full bg-cobalt" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Includes Bespoke Photo Print
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
