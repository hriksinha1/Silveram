"use client";

import React, { useState } from "react";
import { ArrowRight, PenTool, Image as ImageIcon } from "lucide-react";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionName: string) => void;
}

const occasions = [
  {
    number: "01",
    title: "A Thank-You",
    description:
      "For mentors, generous wedding hosts, pediatricians, teachers, or parents who quietly held space for you during challenging seasons.",
    spec: "Includes Ivory Foil Note Card",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5oOARXZr50Q8VrCSx9By8lPHZXRtF0aWzDh1A326jtXxrNwC6tcyoFjXvG4gyR8Vo8LcXDi1nxNZF54_iFEwC75FJSKhUOyZDR2voC2WVzGDSDWTRAqZrGggbp_xHiGqetf2p-q2zWTKT92uNbpvTHPM0bS-PUSxJzn2ksAxA_3miAz7wluj1a88HPdhImgsIKjCl2Xwb9nERwmshE5X2Ytyo9AOtVr2T4P9iB0FSEL5uPFvT0xJs",
  },
  {
    number: "02",
    title: "A Milestone",
    description:
      "Housewarmings, union anniversaries, first child arrivals, or career pivots. An enduring silver keepsake that never wilts or expires.",
    spec: "Includes Gold-Gilt Envelope",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_2L3t-Lydl1UH7o893jb4KI1sEQNqxb9UvexlMPg717Mw15m3l4K3L_m9KZTCn4fl2h_V6VRcxvghvEEXm0xjR36D0PcvMnxU6xrNQBenHl9qeCLp9HMbI-0mCdmZCvv5WpRFl-bGUmvJiBwzm7r8qK-3RxQ2afipKFwPCYiK79U1KBK_UKdQt1R8F92zgXy-MOnbib_U4qZ0eQD3iM649IE4tMObDjmW4hMcxqvQGo0hz78MChEh",
  },
  {
    number: "03",
    title: "Just Because",
    description:
      "Cross-city relationships, siblings living oceans apart, or a spontaneous midweek reminder to someone you dearly miss.",
    spec: "Free Custom Printed Memory",
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

  return (
    <section id="occasions" className="w-full bg-porcelain-muted py-20 px-6 lg:px-12 border-b border-silver/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cobalt block mb-2">
              Intentional Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
              An object crafted for quiet milestones.
            </h2>
          </div>
          <p className="text-sm text-graphite-muted max-w-md mt-4 md:mt-0 leading-relaxed">
            A single refined design, thoughtfully configured with three dedicated sentiment packages. Each comes in an unboxing-ready rigid gift suite.
          </p>
        </div>

        {/* 3 Emotional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {occasions.map((occ) => (
            <div
              key={occ.number}
              className="group flex flex-col p-6 rounded-[4px] bg-white border border-silver/50 hover:border-silver transition-all shadow-sm"
            >
              <div className="w-full h-56 rounded-[4px] overflow-hidden mb-6 bg-porcelain-muted">
                <img
                  src={occ.imageUrl}
                  alt={occ.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-cobalt">
                  Occasion {occ.number}
                </span>
                <span className="text-xs font-semibold text-midnight">
                  Complete Suite • ₹1,200
                </span>
              </div>

              <h3 className="font-serif text-xl text-midnight mb-2 font-normal">
                {occ.title}
              </h3>
              <p className="text-xs text-graphite-muted mb-6 leading-relaxed">
                {occ.description}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-silver/30">
                <span className="text-[11px] text-graphite-muted font-medium">
                  {occ.spec}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectOccasion?.(occ.title)}
                  className="p-2 rounded-full bg-porcelain-muted group-hover:bg-midnight group-hover:text-white transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Packaging & Ribbon Customizer */}
        <div className="w-full rounded-[4px] bg-white border border-silver/50 p-6 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cobalt block">
                Unboxing Preview
              </span>
              <h4 className="font-serif text-2xl text-midnight font-normal">
                Every piece arrives dressed to be opened.
              </h4>
              <p className="text-xs text-graphite-muted leading-relaxed">
                Unlike generic frames wrapped in bubble plastic, Silveram arrives sealed inside a bespoke rigid drawer-box with matching satin ribbon and an envelope for your handwritten words.
              </p>

              {/* Ribbon Picker */}
              <div className="pt-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-graphite block mb-2">
                  Select Ribbon Palette:
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {ribbons.map((ribbon) => (
                    <button
                      key={ribbon.name}
                      type="button"
                      onClick={() => setSelectedRibbon(ribbon.name)}
                      className={`px-3 py-1.5 rounded-[4px] text-xs font-medium flex items-center gap-2 border transition-all ${
                        selectedRibbon === ribbon.name
                          ? "bg-midnight text-white border-midnight shadow-sm"
                          : "bg-porcelain text-graphite border-silver/60 hover:border-silver"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: ribbon.hex }}
                      />
                      <span>{ribbon.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Customizer Feature Cards */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-6 rounded-[4px] bg-porcelain-muted border border-silver/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cobalt mb-3">
                    <PenTool className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Complimentary Calligraphy Note
                    </span>
                  </div>
                  <p className="text-xs text-midnight italic leading-relaxed mb-4">
                    "For the home you made together, and every dinner where laughter ran past midnight. With love always."
                  </p>
                </div>
                <span className="text-[10px] text-graphite-muted uppercase tracking-wider font-semibold">
                  300 GSM Heavy Archival Cotton Card
                </span>
              </div>

              <div className="flex-1 p-6 rounded-[4px] bg-porcelain-muted border border-silver/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cobalt mb-3">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Print Pre-Installation
                    </span>
                  </div>
                  <p className="text-xs text-graphite-muted leading-relaxed mb-4">
                    Upload your photo during checkout. We inspect, color-balance, print on fine art satin paper, and seat it safely inside the frame before sending.
                  </p>
                </div>
                <span className="text-[10px] text-graphite-muted uppercase tracking-wider font-semibold">
                  Included Free of Cost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
