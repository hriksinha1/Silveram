"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";

interface StickyBottomDockProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function StickyBottomDock({ product, onAddToCart }: StickyBottomDockProps) {
  const [visible, setVisible] = useState(false);
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past the hero (e.g. 400px)
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="p-3 pl-4 rounded-full bg-midnight/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 text-porcelain">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/20">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VseaLqacLCWHqIb2xcXrF6nT0MXMvZcWNjGLVlT8p-vDlTjZ4dNg0NRkekEhH-SC4r2IL_faHE7OLeh5SPZ_A1uejHvfOiYnSqdaMXFs7dUqmNkXvIeB5FAEw6aunPBhn2FdaJ_Qoy0rQcvAWh0pjIQFc6YpfrUR36bvT2woO5_E7Ib8V8Ar83HBlxk_mvpp2MoGu_EXtzqP-FTjL1Nwqli0FDzslxtBLfBrDiBFGh5vz5_hzVyj-fOjY"
              alt="Frame thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-serif font-normal text-porcelain block">
              The Keepsake Frame
            </span>
            <span className="text-[10px] font-sans text-silver/70">
              {priceDisplay} • Free Air Delivery
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          className="px-5 py-2.5 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-wider uppercase hover:bg-silver transition-all flex items-center gap-2 shrink-0 shadow-sm"
        >
          <span>Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
