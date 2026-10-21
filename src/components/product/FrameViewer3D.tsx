"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Rotate3d, 
  Compass, 
  Check, 
  Feather, 
  ShieldCheck, 
  Eye
} from "lucide-react";
import { gsap } from "gsap";

export interface InscriptionData {
  recipient: string;
  message: string;
  date: string;
  themeTitle: string;
}

export const CRAFTED_MESSAGES = [
  {
    id: "blessing",
    category: "Sanctuary & Griha Pravesh",
    recipient: "Aarav & Meera",
    title: "Threshold of Light",
    message:
      "May Lakshmi's grace dwell within every wall of your sacred sanctuary, and Ganesha clear every obstacle before your threshold. Built upon love, preserved for generations.",
    date: "Diwali 2026",
  },
  {
    id: "parents",
    category: "Gratitude & Elders",
    recipient: "Pujya Ma & Papa",
    title: "The Silent Pillars",
    message:
      "To the two souls whose silent sacrifices built every dream we now stand upon. Blessed by your tireless hands and quiet grace. Forever held in our deepest reverence.",
    date: "October 2026",
  },
  {
    id: "union",
    category: "Sacred Union & Love",
    recipient: "Dev & Ananya",
    title: "Two Souls, One Flame",
    message:
      "Two distinct journeys intertwined under one sacred flame. Bound in enduring devotion, illuminated by timeless grace, and protected by divine blessings.",
    date: "Auspicious Wedding 2026",
  },
  {
    id: "milestone",
    category: "Mentorship & Mastery",
    recipient: "Dr. K. S. Sharma",
    title: "Quiet Mastery",
    message:
      "Honouring your steadfast guidance, profound wisdom, and the generous spirit that illuminates every path you touch. With our utmost respect and admiration.",
    date: "Autumn 2026",
  },
];

interface FrameViewer3DProps {
  onInscriptionChange?: (inscription: InscriptionData) => void;
  className?: string;
}

const GALLERY_IMAGES = [
  { src: "/products/frame-01.webp", label: "Devotional Sanctuary (Front)" },
  { src: "/products/frame-02.webp", label: "Beveled Perspective (45°)" },
  { src: "/products/frame-03.webp", label: "Devotional Idols & Velvet" },
  { src: "/products/frame-04.webp", label: "Lakshmi-Ganesh Macro Relief" },
  { src: "/products/frame-05.webp", label: "Pure Silver Clad Detailing" },
];

export function FrameViewer3D({ onInscriptionChange, className = "" }: FrameViewer3DProps) {
  const tiltContainerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // States
  const [isFlipped, setIsFlipped] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState("blessing");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const [recipient, setRecipient] = useState("Aarav & Meera");
  const [message, setMessage] = useState(CRAFTED_MESSAGES[0].message);
  const [date, setDate] = useState("Diwali 2026");

  // Keep parent notified of inscription changes
  useEffect(() => {
    onInscriptionChange?.({
      recipient,
      message,
      date,
      themeTitle: isCustomMode ? "Custom Inscription" : (CRAFTED_MESSAGES.find(m => m.id === selectedThemeId)?.title || "Crafted Dedication")
    });
  }, [recipient, message, date, selectedThemeId, isCustomMode, onInscriptionChange]);

  // Flip Action with Shimmer Sweep Feedback
  const flipTo = (toBack: boolean) => {
    setIsFlipped(toBack);

    // If flipping to back, trigger metallic light shimmer across the plaque
    if (toBack && shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { x: "-100%", opacity: 0 },
        { x: "200%", opacity: 0.7, duration: 1.1, delay: 0.35, ease: "power2.out" }
      );
    }
  };

  const toggleFlip = () => flipTo(!isFlipped);

  // Handle Preset Message Selection
  const handleSelectPreset = (preset: typeof CRAFTED_MESSAGES[0]) => {
    setSelectedThemeId(preset.id);
    setIsCustomMode(false);
    setRecipient(preset.recipient);
    setMessage(preset.message);
    setDate(preset.date);

    // If frame is front-facing, turn it to reveal the newly chosen plaque
    if (!isFlipped) {
      flipTo(true);
    } else if (shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { x: "-100%", opacity: 0 },
        { x: "200%", opacity: 0.7, duration: 0.9, ease: "power2.out" }
      );
    }
  };

  // Subtle Mouse 3D Tilt on Outer Container (Leaves Flip Card Clean)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltContainerRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    tiltContainerRef.current.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (!tiltContainerRef.current) return;
    tiltContainerRef.current.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Top Floating Geometric Control Bar */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between text-xs font-sans px-2">
        {/* 3D Flip Toggle Pill */}
        <button
          type="button"
          onClick={toggleFlip}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-porcelain transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <Rotate3d className="w-4 h-4 text-silver transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-medium tracking-wider uppercase text-[11px]">
            {isFlipped ? "↺ View Sacred Front" : "↻ Turn Frame • View Inscribed Back"}
          </span>
        </button>

        {/* Geometric Blueprint Mode Toggle */}
        <button
          type="button"
          onClick={() => setBlueprintMode(!blueprintMode)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-sans font-medium tracking-wider uppercase transition-all border cursor-pointer ${
            blueprintMode
              ? "bg-cobalt text-porcelain border-cobalt shadow-md scale-105"
              : "bg-white/5 hover:bg-white/15 text-silver/80 border-white/10"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{blueprintMode ? "Blueprint: Active" : "Blueprint Mode"}</span>
        </button>
      </div>

      {/* Outer Tilt Container */}
      <div
        ref={tiltContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-lg transition-transform duration-300 ease-out"
        style={{ perspective: "1500px", WebkitPerspective: "1500px" }}
      >
        {/* Inner 3D Flipping Card */}
        <div
          className="relative w-full h-[480px] sm:h-[540px] rounded-[12px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ======================================================== */}
          {/* FRONT FACE: Authentic Sacred Lakshmi-Ganesh Keepsake      */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full rounded-[12px] overflow-hidden bg-midnight-dark border border-white/15"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Authentic Product Image */}
            <img
              src={GALLERY_IMAGES[activeImageIndex].src}
              alt={GALLERY_IMAGES[activeImageIndex].label}
              className="w-full h-full object-cover object-center transition-all duration-700"
            />

            {/* Subtle Acrylic Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-midnight/80 via-transparent to-white/10 pointer-events-none" />

            {/* Architectural Bevel Highlight */}
            <div className="absolute inset-0 rounded-[12px] border border-white/20 pointer-events-none shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)]" />

            {/* Blueprint Overlay (Technical & Sacred Golden Ratio Geometry) */}
            {blueprintMode && (
              <div className="absolute inset-0 z-20 pointer-events-none p-5 flex flex-col justify-between font-mono text-[10px] text-cyan-300 bg-midnight/60 backdrop-blur-[2px]">
                {/* Top Dimension line */}
                <div className="flex items-center justify-between border-b border-dashed border-cyan-400/70 pb-1">
                  <span>|← 185 mm Width →|</span>
                  <span className="tracking-widest font-bold">GOLDEN RATIO Φ = 1.618</span>
                  <span>+ [0,0]</span>
                </div>

                {/* Center Focal Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-44 h-44 border border-cyan-400/50 rounded-full flex items-center justify-center animate-sacred-glow">
                    <div className="w-full h-[1px] bg-cyan-400/60" />
                    <div className="h-full w-[1px] bg-cyan-400/60 absolute" />
                    <span className="absolute top-2 text-[9px] bg-midnight/90 px-1 text-cyan-200">
                      SACRED FOCAL POINT
                    </span>
                  </div>
                </div>

                {/* Left/Right Dimension Markers */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] text-cyan-300">
                  |← 235 mm Height →|
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[9px] text-cyan-300">
                  |← 28 mm Depth →|
                </div>

                {/* Bottom Specifications Callout */}
                <div className="flex items-center justify-between border-t border-dashed border-cyan-400/70 pt-1 text-[9px]">
                  <span>LAT 28.6139° N / LONG 77.2090° E</span>
                  <span className="text-right">999 ELECTROFORM CLAD • 0.025mm DEPTH</span>
                </div>
              </div>
            )}

            {/* Front Floating Pill */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-[8px] bg-midnight/90 backdrop-blur-md border border-white/10 text-porcelain z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-xs font-serif font-normal text-porcelain">
                    Shubh Labh • Sri Lakshmi & Sri Ganesha
                  </p>
                  <p className="text-[10px] text-silver/70 font-sans">
                    999 Pure Silver Clad in Acrylic Casing
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleFlip}
                className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-sans font-medium uppercase tracking-wider text-silver flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Turn Plaque</span>
                <span className="text-xs">↻</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BACK FACE: Architectural Inscribed Plaque & Sacred Note  */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full rounded-[12px] overflow-hidden bg-[#0a0e17] border border-white/15 p-6 sm:p-8 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.85)",
            }}
          >
            {/* Background Texture: Brushed Architectural Obsidian */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 0.75px, transparent 0.75px), radial-gradient(#ffffff 0.75px, #0a0e17 0.75px)",
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 15px 15px",
              }}
            />

            {/* 4 Precision Corner Fasteners */}
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400/50 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-[1px] bg-neutral-900 rotate-45" />
            </div>
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400/50 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-[1px] bg-neutral-900 -rotate-45" />
            </div>
            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400/50 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-[1px] bg-neutral-900 -rotate-45" />
            </div>
            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400/50 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-[1px] bg-neutral-900 rotate-45" />
            </div>

            {/* Top Atelier Hallmarking Crest */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm border border-silver/40 flex items-center justify-center rotate-45">
                  <span className="text-[8px] font-serif text-silver -rotate-45">S</span>
                </div>
                <div>
                  <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-silver uppercase">
                    SILVERAM ATELIER
                  </p>
                  <p className="text-[8px] text-silver/60 font-sans tracking-widest uppercase">
                    New Delhi Workshop • Edition 01
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleFlip}
                className="text-[10px] font-sans text-silver/80 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>↺ View Front</span>
              </button>
            </div>

            {/* Centerpiece: The Machined Brushed Silver Keepsake Plaque */}
            <div
              className="relative z-10 my-auto p-6 sm:p-7 rounded-[8px] overflow-hidden shadow-[inset_0_1px_3px_rgba(255,255,255,0.9),0_12px_30px_rgba(0,0,0,0.6)] border border-slate-300"
              style={{
                background:
                  "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 70%, #f1f5f9 100%)",
              }}
            >
              {/* Shimmer Light Sweep Effect on Inscription Change */}
              <div
                ref={shimmerRef}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 pointer-events-none opacity-0"
              />

              {/* Plaque Inner Frame Border */}
              <div className="border border-slate-400/40 p-4 sm:p-5 rounded-[4px] relative">
                {/* Delicate Corner Accents */}
                <div className="absolute top-1 left-1 text-[8px] text-slate-400 font-mono">┌</div>
                <div className="absolute top-1 right-1 text-[8px] text-slate-400 font-mono">┐</div>
                <div className="absolute bottom-1 left-1 text-[8px] text-slate-400 font-mono">└</div>
                <div className="absolute bottom-1 right-1 text-[8px] text-slate-400 font-mono">┘</div>

                {/* Plaque Header */}
                <div className="text-center mb-3">
                  <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-slate-500 uppercase block">
                    Bespoke Inscription
                  </span>
                  <div className="w-8 h-[1px] bg-slate-400/60 mx-auto mt-1" />
                </div>

                {/* Recipient Dedication */}
                <h4
                  className="font-serif text-lg sm:text-xl text-slate-900 text-center font-normal tracking-wide mb-2.5"
                  style={{
                    textShadow: "0 1px 0 rgba(255,255,255,0.8)",
                  }}
                >
                  {recipient || "To One Deeply Cherished"}
                </h4>

                {/* The Deeply Crafted Message */}
                <p
                  className="font-serif italic text-xs sm:text-[13px] text-slate-700 text-center leading-relaxed max-w-sm mx-auto"
                  style={{
                    textShadow: "0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  "{message}"
                </p>

                {/* Inscription Date & Hallmark */}
                <div className="mt-4 pt-2.5 border-t border-slate-300/80 flex items-center justify-between text-[8px] font-sans tracking-widest uppercase text-slate-500">
                  <span>{date || "Diwali 2026"}</span>
                  <span className="font-mono text-[7px] bg-slate-200/80 px-1.5 py-0.5 rounded border border-slate-300">
                    SLV-INS-999
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Hallmarks */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-silver/60 uppercase">
              <span>Pure Silver Clad • ISO Sealed</span>
              <span className="text-emerald-400 flex items-center gap-1 font-sans">
                <Check className="w-3 h-3" /> Inscription Included Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Front Image Angle Switcher */}
      {!isFlipped && (
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-12 h-12 rounded-[6px] overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer ${
                activeImageIndex === idx
                  ? "border-porcelain scale-105 shadow-md ring-1 ring-porcelain"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
            </button>
          ))}
          <span className="text-[10px] font-sans text-silver/60 uppercase tracking-widest pl-2">
            Angle {activeImageIndex + 1}/5
          </span>
        </div>
      )}

      {/* ======================================================== */}
      {/* THE EMOTIONAL INSCRIPTION STUDIO                         */}
      {/* ======================================================== */}
      <div className="w-full max-w-xl mt-8 p-6 sm:p-7 rounded-[12px] bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-silver" />
            <h3 className="font-serif text-lg text-porcelain font-normal">
              The Memory Inscription Studio
            </h3>
          </div>
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-silver/80 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            Crafted Behind The Frame
          </span>
        </div>

        <p className="text-xs font-sans text-silver/70 mb-5 leading-relaxed font-light">
          Every Silveram frame is finished on the reverse with an architectural brushed silver plaque. 
          Choose a crafted verse of blessings or compose your own personal words.
        </p>

        {/* Emotion Preset Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          {CRAFTED_MESSAGES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-[8px] text-left transition-all duration-300 border cursor-pointer ${
                !isCustomMode && selectedThemeId === preset.id
                  ? "bg-porcelain text-midnight border-porcelain shadow-md scale-[1.02]"
                  : "bg-white/5 text-silver hover:bg-white/10 border-white/10"
              }`}
            >
              <span className="text-[9px] font-sans uppercase tracking-widest font-bold block opacity-75 truncate">
                {preset.category}
              </span>
              <span className="text-xs font-serif font-normal block mt-0.5 truncate">
                {preset.title}
              </span>
            </button>
          ))}
        </div>

        {/* Custom Input Toggle */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(true);
                if (!isFlipped) flipTo(true);
              }}
              className={`text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCustomMode ? "text-porcelain underline" : "text-silver/70 hover:text-porcelain"
              }`}
            >
              <span>✍️ Compose Custom Words</span>
            </button>

            {isCustomMode && (
              <span className="text-[10px] font-mono text-silver/60">
                {message.length}/140 chars
              </span>
            )}
          </div>

          {/* Custom Editable Fields */}
          {isCustomMode && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-silver/70 block mb-1">
                    Recipient / Inscribed For
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. For Aarav & Diya"
                    maxLength={32}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-white/10 border border-white/20 text-porcelain text-xs font-sans focus:outline-none focus:border-silver placeholder:text-silver/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-silver/70 block mb-1">
                    Auspicious Date / Milestone
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Diwali 2026"
                    maxLength={28}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-white/10 border border-white/20 text-porcelain text-xs font-sans focus:outline-none focus:border-silver placeholder:text-silver/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-silver/70 block mb-1">
                  Heartfelt Blessing or Dedication (Max 140 Chars)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={140}
                  rows={3}
                  placeholder="Type your heartfelt blessing here..."
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-white/10 border border-white/20 text-porcelain text-xs font-serif italic focus:outline-none focus:border-silver placeholder:text-silver/40 resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Action to View on Plaque */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-sans text-silver/60">
              {isFlipped ? "✦ Live preview visible on plaque above" : "✦ Turn frame to preview on plaque"}
            </span>

            <button
              type="button"
              onClick={toggleFlip}
              className="text-xs font-sans font-semibold tracking-wider uppercase text-porcelain hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isFlipped ? "View Front Side" : "Turn to Plaque"}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
