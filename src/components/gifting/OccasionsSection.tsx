"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionName: string) => void;
}

const occasions = [
  {
    number: "01",
    title: "A Thank-You",
    subtitle: "For mentors, hosts, and quiet guardians",
    spec: "Ivory Foil Card",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5oOARXZr50Q8VrCSx9By8lPHZXRtF0aWzDh1A326jtXxrNwC6tcyoFjXvG4gyR8Vo8LcXDi1nxNZF54_iFEwC75FJSKhUOyZDR2voC2WVzGDSDWTRAqZrGggbp_xHiGqetf2p-q2zWTKT92uNbpvTHPM0bS-PUSxJzn2ksAxA_3miAz7wluj1a88HPdhImgsIKjCl2Xwb9nERwmshE5X2Ytyo9AOtVr2T4P9iB0FSEL5uPFvT0xJs",
  },
  {
    number: "02",
    title: "A Milestone",
    subtitle: "Housewarmings, unions, and arrivals",
    spec: "Gold-Gilt Envelope",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_2L3t-Lydl1UH7o893jb4KI1sEQNqxb9UvexlMPg717Mw15m3l4K3L_m9KZTCn4fl2h_V6VRcxvghvEEXm0xjR36D0PcvMnxU6xrNQBenHl9qeCLp9HMbI-0mCdmZCvv5WpRFl-bGUmvJiBwzm7r8qK-3RxQ2afipKFwPCYiK79U1KBK_UKdQt1R8F92zgXy-MOnbib_U4qZ0eQD3iM649IE4tMObDjmW4hMcxqvQGo0hz78MChEh",
  },
  {
    number: "03",
    title: "Just Because",
    subtitle: "Across miles, oceans, and seasons",
    spec: "Free Printed Memory",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUf7_i1cecb7Jp_t5UqtM3bqWC_IM-GeIaWeea0VQICKVQaLP19Yy8EQGeIgJN6Vqi8sZ8H9uZwYuLVx6yQ1cQvffIBwXz9XpOtBOycC1CcX4EH7LiDDKVJfa8zVLJdSlkGEDPiDoLI3TZsTLzbUuk8YsHXh0nPE9J9_mJATc5CjqAcID4Yfgwq6-jMKkoObXkkd9NkHtk09VkJXqkZ8wZpTVEqsgkHz1hUXsbRyRdcJK7Wjx9Eil_",
  },
];

const ribbons = [
  { name: "Champagne Silk", hex: "#E5D7B7" },
  { name: "Midnight Navy", hex: "#0C1B36" },
  { name: "Pewter Slate", hex: "#8E939C" },
];

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps) {
  const [selectedRibbon, setSelectedRibbon] = useState("Champagne Silk");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="occasions"
      ref={containerRef}
      className="w-full bg-porcelain py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Minimal Section Header */}
        <div className="max-w-xl mb-16">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-cobalt block mb-3">
            Intentional Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal leading-tight">
            An object crafted for quiet milestones.
          </h2>
          <p className="text-sm font-sans text-graphite-muted mt-3 font-light leading-relaxed">
            Three curated sentiment suites. Each unboxed in a sealed rigid keepsake presentation box.
          </p>
        </div>

        {/* 3 Visual Emotion Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {occasions.map((occ) => (
            <div
              key={occ.number}
              onClick={() => onSelectOccasion?.(occ.title)}
              className="group cursor-pointer flex flex-col bg-white rounded-[6px] overflow-hidden border border-silver/40 hover:border-midnight/40 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Image with subtle zoom */}
              <div className="w-full h-72 overflow-hidden bg-porcelain-muted relative">
                <img
                  src={occ.imageUrl}
                  alt={occ.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-midnight opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Minimal Meta */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-graphite-muted mb-1">
                    <span>Occasion {occ.number}</span>
                    <span className="text-midnight font-semibold">₹1,200</span>
                  </div>
                  <h3 className="font-serif text-2xl text-midnight font-normal">
                    {occ.title}
                  </h3>
                  <p className="text-xs font-sans text-graphite-muted mt-1 font-light">
                    {occ.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-silver/30 flex items-center justify-between text-[11px] font-sans text-graphite-muted">
                  <span className="font-medium text-midnight">{occ.spec}</span>
                  <span className="text-cobalt font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Select <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Packaging Palette Bar */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-[6px] bg-white border border-silver/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-graphite-muted block mb-1">
              Unboxing Customization
            </span>
            <p className="font-serif text-lg text-midnight">
              Choose your hand-tied satin ribbon
            </p>
          </div>

          <div className="flex items-center gap-3">
            {ribbons.map((ribbon) => (
              <button
                key={ribbon.name}
                type="button"
                onClick={() => setSelectedRibbon(ribbon.name)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium flex items-center gap-2.5 transition-all duration-300 ${
                  selectedRibbon === ribbon.name
                    ? "bg-midnight text-porcelain shadow-sm scale-105"
                    : "bg-porcelain text-graphite hover:bg-silver/40"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: ribbon.hex }}
                />
                <span>{ribbon.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
