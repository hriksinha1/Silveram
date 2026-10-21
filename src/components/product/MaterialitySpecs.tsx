"use client";

import React, { useRef } from "react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MaterialitySpecsProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

const specs = [
  { label: "Outer Dimensions", value: "18.5 × 23.5 × 1.8 cm", note: "Tabletop vertical & horizontal" },
  { label: "Aperture Capacity", value: '4" × 6" with mat / 5" × 7" full', note: "Acid-free bevel mat included" },
  { label: "Net Weight", value: "360 Grams", note: "Weighted reassuring desktop heft" },
  { label: "Optical Glass", value: "2.0 mm Ultra-Clear", note: "99% UV attenuation against fading" },
  { label: "Backing Easel", value: "Black Velvet Plush", note: "Dual-hinged brass fixtures" },
  { label: "Pricing Integrity", value: "₹1,200 All-Inclusive", note: "GST & rigid keepsake box included" },
];

export function MaterialitySpecs({ product, onAddToCart }: MaterialitySpecsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  useGSAP(
    () => {
      gsap.from(".spec-item", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="materiality"
      ref={containerRef}
      className="w-full bg-porcelain-muted py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-lg">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-cobalt block mb-3">
              Craft & Honesty
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal leading-tight">
              Radical transparency in our metals.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-graphite-muted max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            Every specification is verified. Never confusing electroplated silver with solid sterling silver.
          </p>
        </div>

        {/* 3-Tier Layering System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-[6px] bg-white border border-silver/40 shadow-sm space-y-3">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">01 / SUBSTRATE</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Architectural Base Alloy</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              280g solid composite core. Dense, stable, and reassuring in hand.
            </p>
          </div>

          <div className="p-8 rounded-[6px] bg-white border border-silver/40 shadow-sm space-y-3">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">02 / DEPOSIT</span>
            <h4 className="font-serif text-xl text-midnight font-normal">999 Fine Silver Clad</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              High-micron pure silver bath providing authentic heirloom luminosity.
            </p>
          </div>

          <div className="p-8 rounded-[6px] bg-white border border-silver/40 shadow-sm space-y-3">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">03 / ARMOR</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Nano-Ceramic Sealant</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              Invisible baked layer preventing indoor sulfur tarnish and fingerprint marks.
            </p>
          </div>
        </div>

        {/* Minimal Specification Grid */}
        <div className="p-8 sm:p-12 rounded-[6px] bg-white border border-silver/40 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-silver/30">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-midnight">
              Technical Matrix
            </span>
            <span className="font-mono text-xs text-graphite-muted">
              SKU: {product?.sku || "SIL-FRAME-001"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {specs.map((s) => (
              <div key={s.label} className="spec-item space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite-muted/80 block">
                  {s.label}
                </span>
                <p className="font-serif text-lg text-midnight font-normal">
                  {s.value}
                </p>
                <p className="text-[11px] font-sans text-graphite-muted font-light">
                  {s.note}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div className="pt-6 border-t border-silver/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cobalt shrink-0" />
              <p className="text-xs font-sans text-graphite-muted">
                <strong className="text-midnight font-semibold">7-Day Replacement Guarantee:</strong> Instant photo review for any transit damage.
              </p>
            </div>

            <button
              type="button"
              onClick={onAddToCart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight text-porcelain text-xs font-sans font-semibold tracking-wider uppercase hover:bg-midnight-light transition-all shadow-sm whitespace-nowrap"
            >
              <span>Order Frame — {priceDisplay}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
