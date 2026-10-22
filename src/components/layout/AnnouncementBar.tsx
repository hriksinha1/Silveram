"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-midnight-dark text-silver/90 py-2 px-4 text-center overflow-x-auto whitespace-nowrap border-b border-white/5">
      <p className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase">
        {t.announcement}
      </p>
    </div>
  );
}
