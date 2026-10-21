"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is this solid sterling silver or silver-coated?",
    answer:
      "We are strictly transparent: this is not solid sterling silver throughout, which would weigh over a kilogram and cost upwards of ₹25,000. Instead, Silveram uses an architectural heavy composite core electro-deposited with pure 999 Fine Silver and sealed with a nano-ceramic protective barrier. This gives you genuine silver luminosity, authentic luxury heft, and lifelong anti-tarnish durability at an honest ₹1,200 price point.",
  },
  {
    question: "Can I include a printed photograph inside the frame before it ships?",
    answer:
      "Yes, at absolutely no additional cost. During checkout, you can upload any high-resolution image from your phone or laptop. Our team inspects the framing ratio, prints it on archival 260 GSM satin paper, and fits it securely behind the optical glass. When your recipient unboxes the rigid gift package, their memory is already waiting for them.",
  },
  {
    question: "What happens if the optical glass or frame arrives damaged in transit?",
    answer:
      "We package each frame inside custom die-cut high-density foam within a rigid keepsake box, making transit damage exceedingly rare. However, if any glass fracture or structural defect occurs, simply send a photo to our WhatsApp concierge within 7 days. We dispatch an instant expedited replacement unit free of charge, with zero return hassle required.",
  },
  {
    question: "How do I clean and maintain the silver luster over the years?",
    answer:
      "Because of our nano-ceramic anti-tarnish sealing, you never need abrasive silver polish pastes or chemical dips. Simply dust the frame with the microfiber cloth included in the bottom compartment of your keepsake box. Avoid harsh chemical sprays or direct abrasive cleaners.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-porcelain py-20 px-6 lg:px-12 text-graphite border-b border-silver/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-cobalt block mb-2">
            Clarity & Confidence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-graphite-muted mt-2">
            Clear answers about materials, photo printing, and our guarantee.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="p-6 rounded-[4px] bg-white border border-silver/50 transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="text-sm sm:text-base font-semibold text-midnight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cobalt shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-graphite-muted leading-relaxed pt-2 border-t border-silver/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
