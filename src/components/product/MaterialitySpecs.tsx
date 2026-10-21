"use client";

import React, { useRef } from "react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MaterialitySpecsProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

const specs = [
  { label: "Outer Dimensions", value: "18.5 × 23.5 × 2.8 cm", note: "Monolithic tabletop display with built-in easel" },
  { label: "Relief Composition", value: "Sri Lakshmi & Sri Ganesha", note: "Auspicious 'Shubh Labh' arch motif" },
  { label: "Net Heft", value: "380 Grams", note: "Substantial architectural desktop presence" },
  { label: "Optical Casing", value: "Monolithic Clear Acrylic", note: "Ultra-clear 360° light transmission" },
  { label: "Rear Dedication", value: "Machined Brushed Plaque", note: "Personalized engraved message included" },
  { label: "Pricing Integrity", value: "₹1,200.00 All-Inclusive", note: "GST, presentation box, & air delivery included" },
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
      className="w-full bg-porcelain-muted py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-lg">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cobalt block mb-3">
              + SECTION 03 // RADICAL CRAFT HONESTY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal leading-tight">
              Radical transparency in our materials.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-graphite-muted max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            Every specification is verified. Pure 999 fine silver electroformed clad over architectural composite, sealed against tarnishing.
          </p>
        </div>

        {/* 3-Tier Layering System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-[8px] bg-white border border-silver/40 shadow-sm space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">01 / SUBSTRATE CORE</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Architectural Base Alloy</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              High-density structural composite core. Dimensionally stable, resilient, and reassuringly weighted in hand.
            </p>
          </div>

          <div className="p-8 rounded-[8px] bg-white border border-silver/40 shadow-sm space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">02 / SILVER RELIEF</span>
            <h4 className="font-serif text-xl text-midnight font-normal">999 Fine Silver Clad</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              High-purity fine silver electroformed relief capturing the intricate iconography of Lakshmi & Ganesha.
            </p>
          </div>

          <div className="p-8 rounded-[8px] bg-white border border-silver/40 shadow-sm space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">03 / CASING & ARMOR</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Monolithic Clear Casing</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              Baked nano-ceramic anti-tarnish molecular barrier encased within pristine optical-grade display acrylic.
            </p>
          </div>
        </div>

        {/* Minimal Specification Grid */}
        <div className="p-8 sm:p-12 rounded-[8px] bg-white border border-silver/40 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-silver/30">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-midnight">
              Technical Specification Matrix
            </span>
            <span className="font-mono text-xs text-graphite-muted">
              SKU: {product?.sku || "SIL-FRAME-001"} • REVISION 2026.1
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
                <strong className="text-midnight font-semibold">100% Transit Integrity Guarantee:</strong> Replaced immediately without friction if damaged during shipping.
              </p>
            </div>

            <button
              type="button"
              onClick={onAddToCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-midnight text-porcelain text-xs font-sans font-semibold tracking-wider uppercase hover:bg-midnight-light transition-all shadow-sm whitespace-nowrap active:scale-95"
            >
              <span>Order Keepsake Frame — {priceDisplay}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
