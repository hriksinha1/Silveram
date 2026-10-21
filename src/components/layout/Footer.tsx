import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-porcelain-muted text-graphite pt-16 pb-12 border-t border-silver/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-serif text-2xl font-bold tracking-widest text-midnight block uppercase">
              SILVERAM
            </span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-graphite-muted">
              Object & Memory
            </p>
            <p className="text-xs text-graphite-muted max-w-sm leading-relaxed">
              Crafting silver-coated emotional keepsakes for modern Indian homes and milestone moments.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-cobalt" />
              <span className="text-xs text-graphite-muted font-medium">
                Handcrafted with precision • Verified Material Integrity
              </span>
            </div>
          </div>

          {/* Col 2: Product & Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-midnight">
              Product & Care
            </h4>
            <ul className="space-y-2 text-xs text-graphite-muted">
              <li>
                <a href="#hero" className="hover:text-midnight transition-colors">
                  The Photo Frame (₹1,200)
                </a>
              </li>
              <li>
                <a href="#materiality" className="hover:text-midnight transition-colors">
                  Silver Care Guide
                </a>
              </li>
              <li>
                <a href="#materiality" className="hover:text-midnight transition-colors">
                  Base Material Transparency
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-midnight transition-colors">
                  Bespoke Gift Packaging
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-midnight">
              Client Services
            </h4>
            <ul className="space-y-2 text-xs text-graphite-muted">
              <li>
                <a href="#corporate" className="hover:text-midnight transition-colors">
                  Corporate & Bespoke Gifting
                </a>
              </li>
              <li>
                <Link href="/track" className="hover:text-midnight transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <a href="#transit" className="hover:text-midnight transition-colors">
                  Shipping & Returns Policy
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-midnight transition-colors text-cobalt font-medium"
                >
                  WhatsApp Concierge (+91)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Purity Statement */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-midnight">
              Purity & Quality Statement
            </h4>
            <div className="p-4 rounded-[4px] bg-white border border-silver/50 space-y-2 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cobalt" />
                <span className="text-xs font-semibold text-midnight">
                  Micron-Grade Fine Silver
                </span>
              </div>
              <p className="text-[11px] text-graphite-muted leading-relaxed">
                Rigorous electroplate over solid architectural alloy, sealed with invisible anti-tarnish protective lacquer for everyday preservation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-silver/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-graphite-muted">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <p>© 2026 Silveram Keepsakes. Made with intention in India.</p>
            <span className="hidden md:inline text-silver/60">•</span>
            <span className="text-[11px] font-semibold text-midnight uppercase tracking-wider">
              Standard Delivery Pan-India
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[4px] text-midnight text-[11px] font-mono border border-silver/40 shadow-sm">
              <span>UPI</span>
              <span className="text-silver">|</span>
              <span>RuPay</span>
              <span className="text-silver">|</span>
              <span>Cards</span>
              <span className="text-silver">|</span>
              <span>NetBanking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
