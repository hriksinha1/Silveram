"use client";

import React, { useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroSectionProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function HeroSection({ product, onAddToCart }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  // GSAP Entrance Animations & Interactive Tilt
  useGSAP(
    () => {
      // 1. Staggered Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          specsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=1.0"
        );

      // 2. Subtle Floating Animation on Image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  // Interactive 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-midnight text-porcelain overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-silver/10"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-cobalt/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-silver/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Minimal Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div ref={badgeRef} className="opacity-0">
              <span className="inline-block text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-silver/80 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                Edition 01 • The Keepsake Frame
              </span>
            </div>

            <h1
              ref={titleRef}
              className="opacity-0 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-porcelain leading-[1.1] font-normal"
            >
              Give a memory<br />
              <span className="italic font-normal text-silver/90">a place to live.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="opacity-0 text-silver/70 text-base sm:text-lg max-w-md font-light leading-relaxed font-sans"
            >
              Architectural photo keepsakes crafted for the people who make life matter. Pure silver clad with nano-ceramic sealing.
            </p>

            {/* Ultra-Minimal Key Specs Row */}
            <div
              ref={specsRef}
              className="opacity-0 flex flex-wrap items-center gap-6 pt-2 text-xs font-sans text-silver/80 tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                <span>999 Fine Silver Clad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                <span>Anti-Tarnish Sealed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                <span>24–48h Dispatch</span>
              </div>
            </div>

            {/* Minimal High-Impact CTAs */}
            <div ref={ctaRef} className="opacity-0 pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onAddToCart}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-widest uppercase hover:bg-silver transition-all duration-300 shadow-lg active:scale-95"
              >
                <span>Make it a Gift — {priceDisplay}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#materiality"
                className="px-6 py-4 text-xs font-sans font-medium tracking-widest uppercase text-silver/80 hover:text-porcelain transition-colors"
              >
                Explore Craft & Specs
              </a>
            </div>
          </div>

          {/* Right: Architectural 3D Frame Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={imageRef}
              className="opacity-0 relative w-full max-w-md will-change-transform"
            >
              <div className="relative overflow-hidden rounded-[8px] bg-midnight-dark border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VseaLqacLCWHqIb2xcXrF6nT0MXMvZcWNjGLVlT8p-vDlTjZ4dNg0NRkekEhH-SC4r2IL_faHE7OLeh5SPZ_A1uejHvfOiYnSqdaMXFs7dUqmNkXvIeB5FAEw6aunPBhn2FdaJ_Qoy0rQcvAWh0pjIQFc6YpfrUR36bvT2woO5_E7Ib8V8Ar83HBlxk_mvpp2MoGu_EXtzqP-FTjL1Nwqli0FDzslxtBLfBrDiBFGh5vz5_hzVyj-fOjY"
                  alt="Silver-coated keepsake frame"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating Minimal Seal */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[6px] bg-midnight/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-porcelain">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-cobalt shrink-0" />
                    <div>
                      <p className="text-xs font-sans font-semibold text-porcelain">
                        Silveram Certified Clad
                      </p>
                      <p className="text-[10px] text-silver/70 font-sans">
                        Nano-ceramic sealed against indoor tarnishing
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-lg font-normal text-silver">
                    {priceDisplay}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
