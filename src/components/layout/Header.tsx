"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, MapPin, User, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount?: number;
  cartTotalRupees?: string;
  onPincodeClick?: () => void;
}

export function Header({
  cartCount = 0,
  cartTotalRupees = "0.00",
  onPincodeClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-porcelain/90 backdrop-blur-xl border-b border-silver/40">
      <div className="h-20 w-full px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl tracking-widest text-midnight font-bold group-hover:text-cobalt transition-colors uppercase">
              SILVERAM
            </span>
            <span className="text-[10px] tracking-widest text-graphite-muted uppercase -mt-1 font-semibold">
              Object & Memory
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8 text-[13px] font-medium text-graphite">
          <a
            href="#hero"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            The Keepsake Frame
          </a>
          <a
            href="#occasions"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            Gifting & Occasions
          </a>
          <a
            href="#materiality"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            Materiality & Care
          </a>
          <a
            href="#transit"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            Transit & Delivery
          </a>
          <a
            href="#corporate"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            Corporate Gifting
          </a>
          <a
            href="#faq"
            className="text-graphite-muted hover:text-midnight transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onPincodeClick}
            type="button"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-porcelain-muted hover:bg-silver/40 text-graphite text-xs font-medium transition-colors border border-silver/40"
          >
            <MapPin className="w-3.5 h-3.5 text-cobalt" />
            <span>Check Pincode</span>
          </button>

          <button
            aria-label="Search"
            type="button"
            className="p-2 text-graphite-muted hover:text-midnight transition-colors flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            aria-label="Wishlist"
            type="button"
            className="p-2 text-graphite-muted hover:text-midnight transition-colors flex items-center justify-center relative"
          >
            <Heart className="w-4 h-4" />
            <span className="text-[10px] font-semibold absolute top-1 right-1 text-graphite-muted">
              0
            </span>
          </button>

          {/* Cart Trigger */}
          <Link
            href="#cart"
            className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-[4px] bg-silver/40 hover:bg-silver/70 text-midnight text-xs font-semibold transition-all border border-silver/50"
          >
            <ShoppingBag className="w-4 h-4 text-midnight" />
            <span>Cart (₹{cartTotalRupees}) / {cartCount}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="xl:hidden p-2 text-midnight"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-porcelain border-b border-silver px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-sm font-medium text-graphite">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              The Keepsake Frame
            </a>
            <a
              href="#occasions"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              Gifting & Occasions
            </a>
            <a
              href="#materiality"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              Materiality & Care
            </a>
            <a
              href="#transit"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              Transit & Delivery
            </a>
            <a
              href="#corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              Corporate Gifting
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-midnight"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
