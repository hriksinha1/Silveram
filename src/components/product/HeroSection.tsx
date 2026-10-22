"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Compass, CheckCircle } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { gsap } from "gsap";
import { FrameViewer3D, InscriptionData, CRAFTED_MESSAGES } from "./FrameViewer3D";

import { useCart } from "@/context/CartContext";

interface HeroSectionProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function HeroSection({ product, onAddToCart }: HeroSectionProps) {
  const { addToBag } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [currentInscription, setCurrentInscription] = useState<InscriptionData>({
    recipient: CRAFTED_MESSAGES[0].recipient,
    message: CRAFTED_MESSAGES[0].message,
    date: CRAFTED_MESSAGES[0].date,
    themeTitle: CRAFTED_MESSAGES[0].title,
  });

  const [addedToast, setAddedToast] = useState(false);

  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  // GSAP Entrance Animations (Safe fromTo with fallback visibility)
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = [
      badgeRef.current,
      titleRef.current,
      subtitleRef.current,
      specsRef.current,
      ctaRef.current,
    ].filter(Boolean);

    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
    );
  }, []);

  const handleOrderClick = () => {
    addToBag();
    onAddToCart?.();
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-midnight text-porcelain overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-silver/15"
    >
      {/* ======================================================== */}
      {/* GEOMETRICAL ARCHITECTURAL DRAFTING GRID BACKDROP         */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-cobalt/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] rounded-full bg-silver/10 blur-[110px] pointer-events-none" />

      {/* Geometrical Architectural Corner Markers */}
      <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto px-10 mb-8 text-[9px] font-mono tracking-widest text-silver/60 uppercase select-none border-b border-white/5 pb-3">
        <span className="flex items-center gap-1.5">
          <span className="text-silver">+</span> 28°36'50" N • 77°12'32" E [NEW DELHI WORKSHOP]
        </span>
        <span className="flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-silver/60" /> SACRED GOLDEN RATIO Φ = 1.618
        </span>
        <span className="flex items-center gap-1.5">
          <span>DIM: 185 × 235 × 28 mm</span> <span className="text-silver">+</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ======================================================== */}
          {/* LEFT: Restrained Minimal Editorial Narrative            */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col space-y-6 pt-2">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-silver/90 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-ping" />
                Edition 01 • The Sacred Keepsake Frame
              </span>
            </div>

            <h1
              ref={titleRef}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-porcelain leading-[1.08] font-normal"
            >
              Turn the frame.<br />
              <span className="italic font-normal text-silver/90">Reveal the blessing.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-silver/80 text-base sm:text-lg max-w-md font-light leading-relaxed font-sans"
            >
              An architectural devotional sanctuary featuring embossed pure silver relief of Sri Lakshmi & Sri Ganesha. 
              Turned on its reverse to reveal your deeply crafted, engraved brass-silver keepsake dedication.
            </p>

            {/* Geometrical Architectural Dimension Matrix */}
            <div
              ref={specsRef}
              className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans text-silver/80"
            >
              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-silver/60 block mb-1">
                  01 // ALLOY CLAD
                </span>
                <span className="font-medium text-porcelain block">999 Fine Silver Clad</span>
                <span className="text-[10px] text-silver/60">Laser electroformed relief</span>
              </div>

              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-silver/60 block mb-1">
                  02 // CASING
                </span>
                <span className="font-medium text-porcelain block">Monolithic Acrylic</span>
                <span className="text-[10px] text-silver/60">Built-in angled easel stand</span>
              </div>

              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-silver/60 block mb-1">
                  03 // PROTECTION
                </span>
                <span className="font-medium text-porcelain block">Nano-Ceramic Sealed</span>
                <span className="text-[10px] text-silver/60">Permanent anti-tarnish barrier</span>
              </div>

              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-silver/60 block mb-1">
                  04 // DEDICATION
                </span>
                <span className="font-medium text-porcelain block">Bespoke Inscription</span>
                <span className="text-[10px] text-silver/60">Free engraved rear plaque</span>
              </div>
            </div>

            {/* Minimal High-Impact CTAs */}
            <div ref={ctaRef} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleOrderClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-widest uppercase hover:bg-silver transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
              >
                <span>Order with Inscription — {priceDisplay}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#materiality"
                className="px-5 py-4 text-center text-xs font-sans font-medium tracking-widest uppercase text-silver/80 hover:text-porcelain transition-colors"
              >
                Explore Specifications
              </a>
            </div>

            {/* Added to Bag Toast feedback */}
            {addedToast && (
              <div className="p-3.5 rounded-[8px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-sans flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Keepsake frame with <strong>"{currentInscription.themeTitle}"</strong> inscription added to your bag!
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-400/80">
                  Ready
                </span>
              </div>
            )}

            {/* Honest Trust Guarantee */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-3 text-xs font-sans text-silver/70">
              <ShieldCheck className="w-4 h-4 text-cobalt shrink-0" />
              <span>
                Standard gift packaging included • 24–48h Dispatch across all Indian pincodes
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Interactive 3D Frame Turn & Bespoke Inscription   */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <FrameViewer3D onInscriptionChange={setCurrentInscription} />
          </div>
        </div>
      </div>
    </section>
  );
}
