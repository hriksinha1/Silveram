"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";

export function PincodeTransitEstimator() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    days?: string;
    message?: string;
  } | null>(null);

  const handleCheck = () => {
    const pin = pincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      let city = "your address";
      let days = "2–3 business days";

      if (pin.startsWith("11")) {
        city = "Delhi NCR";
        days = "Next day air (within 24–36 hrs)";
      } else if (pin.startsWith("40")) {
        city = "Mumbai";
        days = "Same day / 24 hrs";
      } else if (pin.startsWith("56")) {
        city = "Bengaluru";
        days = "2 business days";
      } else if (pin.startsWith("50")) {
        city = "Hyderabad";
        days = "2 business days";
      } else if (pin.startsWith("60")) {
        city = "Chennai";
        days = "2–3 business days";
      }

      setResult({
        valid: true,
        city,
        days,
        message: `Available for Express Delivery to ${pin} (${city}). Order today before 4 PM for prompt dispatch.`,
      });
    } else {
      setResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code.",
      });
    }
  };

  return (
    <section id="transit" className="w-full bg-porcelain-muted py-20 px-6 lg:px-12 border-b border-silver/40">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 lg:p-12 rounded-[4px] bg-white border border-silver/50 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-cobalt/10 flex items-center justify-center text-cobalt mb-4">
            <Truck className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-cobalt mb-2">
            Transit Speed
          </span>
          <h3 className="font-serif text-3xl text-midnight font-normal mb-2">
            When will your gift reach their doorstep?
          </h3>
          <p className="text-xs text-graphite-muted max-w-lg mb-8 leading-relaxed">
            Enter any 6-digit Indian delivery pincode to check air transit velocity. All packages ship air-priority via BlueDart and Delhivery Express.
          </p>

          {/* Form */}
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="e.g. 110001, 560001, 400050"
              className="flex-1 px-4 py-3 rounded-[4px] bg-porcelain text-midnight placeholder:text-graphite-muted/60 text-sm font-mono outline-none border border-silver/60 focus:border-cobalt transition-all"
            />
            <button
              type="button"
              onClick={handleCheck}
              className="px-6 py-3 rounded-[4px] bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm"
            >
              Check Transit
            </button>
          </div>

          {/* Result Box */}
          {result && (
            <div
              className={`w-full max-w-md p-4 rounded-[4px] text-left transition-all border ${
                result.valid
                  ? "bg-porcelain-muted border-cobalt/30"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {result.valid ? (
                <div>
                  <div className="flex items-center gap-2 text-cobalt font-semibold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Estimated: {result.days}</span>
                  </div>
                  <p className="text-xs text-graphite-muted leading-relaxed">
                    {result.message}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{result.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Tiered Speed Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-8">
            <div className="p-3.5 rounded-[4px] bg-porcelain border border-silver/40 text-center">
              <span className="text-[10px] text-graphite-muted uppercase font-bold block mb-0.5">
                Delhi NCR & Mumbai
              </span>
              <span className="text-xs font-semibold text-midnight">
                48 Hours Air Delivery
              </span>
            </div>
            <div className="p-3.5 rounded-[4px] bg-porcelain border border-silver/40 text-center">
              <span className="text-[10px] text-graphite-muted uppercase font-bold block mb-0.5">
                Bengaluru, Hyd, Pune
              </span>
              <span className="text-xs font-semibold text-midnight">
                2–3 Business Days
              </span>
            </div>
            <div className="p-3.5 rounded-[4px] bg-porcelain border border-silver/40 text-center">
              <span className="text-[10px] text-graphite-muted uppercase font-bold block mb-0.5">
                Rest of India & J&K
              </span>
              <span className="text-xs font-semibold text-midnight">
                3–5 Business Days
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
