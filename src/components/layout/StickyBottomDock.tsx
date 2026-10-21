"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";

interface StickyBottomDockProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function StickyBottomDock({ product, onAddToCart }: StickyBottomDockProps) {
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  return (
    <div className="w-full bg-white/95 backdrop-blur-md p-4 sticky bottom-0 z-40 border-t border-silver/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[4px] overflow-hidden bg-porcelain-muted hidden sm:block border border-silver/40">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VseaLqacLCWHqIb2xcXrF6nT0MXMvZcWNjGLVlT8p-vDlTjZ4dNg0NRkekEhH-SC4r2IL_faHE7OLeh5SPZ_A1uejHvfOiYnSqdaMXFs7dUqmNkXvIeB5FAEw6aunPBhn2FdaJ_Qoy0rQcvAWh0pjIQFc6YpfrUR36bvT2woO5_E7Ib8V8Ar83HBlxk_mvpp2MoGu_EXtzqP-FTjL1Nwqli0FDzslxtBLfBrDiBFGh5vz5_hzVyj-fOjY"
              alt="Silveram frame thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-semibold text-midnight block">
              The Keepsake Frame — 999 Fine Silver Clad
            </span>
            <p className="text-[11px] text-graphite-muted">
              Includes custom archival print, rigid unboxing suite & gift card
            </p>
          </div>
        </div>

        {/* Action & Price */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex flex-col text-right">
            <span className="font-serif text-lg font-bold text-midnight leading-none">
              {priceDisplay}
            </span>
            <span className="text-[10px] text-cobalt uppercase font-bold tracking-wider mt-0.5">
              Free Air Delivery
            </span>
          </div>

          <button
            type="button"
            onClick={onAddToCart}
            className="px-6 py-3 rounded-[4px] bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Make it a Gift</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
