"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <div className="w-full bg-porcelain/85 backdrop-blur-md border-b border-silver/30 transition-all">
      <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl tracking-[0.25em] text-midnight font-normal uppercase transition-opacity group-hover:opacity-75">
            SILVERAM
          </span>
          <span className="text-[9px] tracking-[0.3em] text-graphite-muted uppercase -mt-0.5 font-sans font-medium">
            Object & Memory
          </span>
        </Link>

        {/* Minimal Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-widest uppercase font-sans text-graphite/80 font-medium">
          <a
            href="#hero"
            className="hover:text-midnight transition-colors duration-200"
          >
            The Frame
          </a>
          <a
            href="#occasions"
            className="hover:text-midnight transition-colors duration-200"
          >
            Gift Ritual
          </a>
          <a
            href="#unboxing"
            className="hover:text-midnight transition-colors duration-200"
          >
            Unboxing
          </a>
          <a
            href="#materiality"
            className="hover:text-midnight transition-colors duration-200"
          >
            Craft
          </a>
          <a
            href="#corporate"
            className="hover:text-midnight transition-colors duration-200"
          >
            Corporate
          </a>
        </nav>

        {/* Action Item: Real Slide-Over Cart Trigger */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-midnight text-porcelain text-[11px] font-sans font-medium tracking-widest uppercase hover:bg-midnight-light transition-all shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-silver" />
            <span>Bag ({cartCount})</span>
            {cartCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            className="md:hidden p-2 text-midnight"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-porcelain/95 backdrop-blur-xl border-b border-silver/40 px-8 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-xs tracking-widest uppercase font-medium text-graphite">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              The Keepsake Frame
            </a>
            <a
              href="#occasions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Gift Ritual
            </a>
            <a
              href="#unboxing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Unboxing Suite
            </a>
            <a
              href="#materiality"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Craft & Materials
            </a>
            <a
              href="#transit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Transit
            </a>
            <a
              href="#corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Corporate Gifting
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
