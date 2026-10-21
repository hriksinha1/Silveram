import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-porcelain py-20 px-6 sm:px-10 border-t border-silver/40 text-graphite">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="space-y-2">
          <span className="font-serif text-2xl tracking-[0.2em] font-normal text-midnight uppercase block">
            SILVERAM
          </span>
          <p className="text-xs font-sans text-graphite-muted max-w-sm font-light">
            Architectural silver keepsakes and quiet heirlooms. Made with intention in India.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-xs font-sans tracking-widest uppercase font-medium text-graphite-muted">
          <a href="#hero" className="hover:text-midnight transition-colors">
            The Frame
          </a>
          <a href="#materiality" className="hover:text-midnight transition-colors">
            Materials
          </a>
          <a href="#transit" className="hover:text-midnight transition-colors">
            Shipping
          </a>
          <a href="#corporate" className="hover:text-midnight transition-colors">
            Corporate
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt hover:text-midnight transition-colors"
          >
            WhatsApp Desk
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-silver/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-graphite-muted/80">
        <p>© 2026 Silveram Keepsakes. All rights reserved.</p>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>UPI</span>
          <span>•</span>
          <span>Cards</span>
          <span>•</span>
          <span>NetBanking</span>
          <span>•</span>
          <span>RuPay</span>
        </div>
      </div>
    </footer>
  );
}
