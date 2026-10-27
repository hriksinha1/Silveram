
import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "en" | "hi";

export interface InscriptionPreset {
  id: string;
  category: string;
  recipient: string;
  title: string;
  message: string;
  date: string;
}

export const PRESETS_EN: InscriptionPreset[] = [
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

export const PRESETS_HI: InscriptionPreset[] = [
  {
    id: "blessing",
    category: "गृह प्रवेश एवं पावन स्थान",
    recipient: "आरव एवं मीरा",
    title: "प्रकाश और गृह प्रवेश",
    message:
      "मां लक्ष्मी की कृपा आपके इस पावन गृह के प्रत्येक कोने में बसे, और भगवान गणेश हर मार्ग को सुगम बनाएं। प्रेम से निर्मित, पीढ़ियों के लिए संरक्षित।",
    date: "दीपावली 2026",
  },
  {
    id: "parents",
    category: "आदरणीय माता-पिता",
    recipient: "पूज्य माँ एवं पिताजी",
    title: "मौन आधारस्तंभ",
    message:
      "उन दो पवित्र आत्माओं के चरणों में, जिनके निःस्वार्थ त्याग पर हमारे सारे सपने साकार हुए। आपके अथक हाथों का आशीष सदैव हमारे साथ रहे।",
    date: "अक्टूबर 2026",
  },
  {
    id: "union",
    category: "पवित्र परिणय सूत्र",
    recipient: "देव एवं अनन्या",
    title: "दो आत्माएं, एक पावन ज्योति",
    message:
      "एक पवित्र अग्नि के साक्षी दो जीवन। अटूट स्नेह, चिरस्थाई आशीर्वाद और ईश्वर की असीम अनुकंपा आप दोनों पर सदैव बनी रहे।",
    date: "शुभ विवाह 2026",
  },
  {
    id: "milestone",
    category: "कृतज्ञता एवं गुरु वंदना",
    recipient: "डॉ. के. एस. शर्मा",
    title: "अनमोल मार्गदर्शन",
    message:
      "आपके निष्ठावान मार्गदर्शन, गहन ज्ञान और उदार भाव के प्रति हमारी हार्दिक कृतज्ञता। आपके प्रति सदैव असीम सम्मान।",
    date: "शरद ऋतु 2026",
  },
];

export const TRANSLATIONS = {
  en: {
    // Header & Announcement
    announcement: "Pan-India Express Air Courier • Hand-Finished Keepsake Box Included",
    tagline: "Object & Memory",
    navFrame: "The Frame",
    navLetter: "The Letter",
    navRitual: "Gift Ritual",
    navUnboxing: "Unboxing",
    navMoments: "Sanctuaries",
    navCraft: "Craft",
    navCorporate: "Corporate",
    bag: "Bag",
    soundOn: "Sound On",
    soundMuted: "Sound Muted",

    // Hero Section
    collectionBadge: "+ ATELIER RELEASE // 2026 DEVOTIONAL ARCHIVE",
    heroTitle: "Turn the frame.\nReveal the blessing.",
    heroHindiSubtitle: "सैक्रेड कीपसेक फ्रेम • श्री लक्ष्मी-गणेश संस्करण",
    heroDesc:
      "Architectural devotional keepsake in pure 999 fine silver clad relief with personalized reverse plaque engraving. Give sacred memories a permanent physical sanctuary.",
    turnFrameFront: "↺ View Sacred Front",
    turnFrameBack: "↻ Turn Frame • View Inscribed Back",
    blueprintOn: "Architectural Blueprint",
    blueprintOff: "Physical View",
    addToBagBtn: "Add to Bag",
    inscribePlaqueBtn: "Personalize Plaque",
    guaranteeText: "Hallmarked 999 Fine Silver Clad • Lifetime Anti-Tarnish Matrix • 100% Pan-India Transit Insured",
    
    // Inscription Studio
    inscriptionStudioTitle: "Back Plaque Inscription",
    inscriptionStudioDesc: "Craft a message that outlives seasons. Laser-engraved directly into the solid silver-finished backing plaque.",
    presetHeading: "Select an Auspicious Inscription Theme:",
    customHeading: "Or Compose Custom Inscription:",
    recipientLabel: "Recipient Name(s)",
    messageLabel: "Blessing / Dedication Message",
    dateLabel: "Auspicious Date / Milestone",

    // Unboxing
    unboxingBadge: "+ SECTION 03 // THE CEREMONIAL UNBOXING",
    unboxingTitle: "Every gift should feel like a ceremony.",
    unboxingDesc:
      "Unboxing is half the memory. Every Silveram keepsake arrives in our sealed rigid presentation box, tied with your choice of ceremonial silk ribbon and accompanied by our serialized Certificate of Authenticity.",
    ribbonSelectTitle: "SELECT CEREMONIAL SILK RIBBON:",
    coaTitle: "CERTIFICATE OF AUTHENTICITY",
    coaBody: "Serialized & sealed inside every Silveram presentation box.",

    // Real Moments
    momentsBadge: "+ REAL PLACEMENTS // ARCHIVAL HOMES",
    momentsTitle: "Sanctuaries in Real Indian Homes",
    momentsDesc:
      "From warm marble mandir altars to sunlit executive desks and auspicious housewarming ledges, see where Silveram preserves everyday devotion and blessings.",

    // Materiality
    craftBadge: "+ SECTION 05 // HONEST CRAFT & MATERIALITY",
    craftTitle: "Pure 999 Silver Cladding • Museum Optical Acrylic",
    craftDesc:
      "We believe true luxury is built on transparency. Here is exactly how your keepsake is engineered to resist tarnishing and endure generations.",

    // Footer
    footerTagline: "Architectural silver keepsakes and quiet heirlooms. Made with intention in India.",
    footerAllRights: "© 2026 Silveram Keepsakes. All rights reserved.",
    footerAudioToggle: "Haptic Audio:",
  },
  hi: {
    // Header & Announcement
    announcement: "अखिल भारतीय एक्सप्रेस एयर कूरियर • हस्तनिर्मित कीपसेक बॉक्स सम्मिलित",
    tagline: "स्मृति और आशीर्वाद",
    navFrame: "पवित्र फ्रेम",
    navLetter: "पावन ख़त",
    navRitual: "उपहार परंपरा",
    navUnboxing: "अनबॉक्सिंग",
    navMoments: "शुभ स्थान",
    navCraft: "शिल्प कला",
    navCorporate: "कॉर्पोरेट",
    bag: "थैली",
    soundOn: "ध्वनि चालू",
    soundMuted: "ध्वनि म्यूट",

    // Hero Section
    collectionBadge: "+ शिल्प संकलन // 2026 पवित्र संस्करण",
    heroTitle: "फ्रेम घुमाएँ।\nआशीर्वाद प्रकट करें।",
    heroHindiSubtitle: "सैक्रेड कीपसेक फ्रेम • श्री लक्ष्मी-गणेश संस्करण",
    heroDesc:
      "999 फाइन सिल्वर-क्लैड श्री लक्ष्मी और गणेश जी का नक्काशीदार पवित्र फ्रेम, पीछे व्यक्तिगत संदेश पट्टिका के साथ। अपनों की स्मृतियों और आशीर्वाद को दें एक अमर स्थान।",
    turnFrameFront: "↺ पवित्र मुख्य भाग देखें",
    turnFrameBack: "↻ फ्रेम घुमाएँ • उत्कीर्ण पट्टिका देखें",
    blueprintOn: "वास्तुकला ब्लूप्रिंट",
    blueprintOff: "भौतिक स्वरूप",
    addToBagBtn: "उपहार बॉक्स में जोड़ें",
    inscribePlaqueBtn: "पट्टिका उत्कीर्ण करें",
    guaranteeText: "प्रमाणित 999 शुद्ध सिल्वर क्लैडिंग • आजीवन एंटी-टार्निश सुरक्षा • 100% बीमित कूरियर डिलीवरी",

    // Inscription Studio
    inscriptionStudioTitle: "स्मृति पट्टिका उत्कीर्णन",
    inscriptionStudioDesc: "एक ऐसा संदेश लिखें जो पीढ़ियों तक जीवित रहे। सिल्वर फिनिश पट्टिका पर लेज़र द्वारा स्थायी रूप से उकेरा गया।",
    presetHeading: "शुभ समर्पण विषय चुनें:",
    customHeading: "अथवा अपना व्यक्तिगत संदेश लिखें:",
    recipientLabel: "आदरणीय नाम / प्राप्तकर्ता",
    messageLabel: "आशीर्वाद अथवा मंगलकामना संदेश",
    dateLabel: "शुभ तिथि / पावन अवसर",

    // Unboxing
    unboxingBadge: "+ अनुभाग 03 // पावन अनबॉक्सिंग अनुष्ठान",
    unboxingTitle: "प्रत्येक उपहार एक पावन अनुष्ठान जैसा होना चाहिए।",
    unboxingDesc:
      "उपहार खोलना ही आधी स्मृति है। प्रत्येक सिल्वरम कीपसेक 1200 GSM रिगिड बॉक्स में, रेशमी रिबन और क्रमांकित प्रमाण-पत्र के साथ सुरक्षित पहुँचता है।",
    ribbonSelectTitle: "शुभ रेशमी रिबन चुनें:",
    coaTitle: "शुद्धता एवं प्रामाणिकता प्रमाण-पत्र",
    coaBody: "प्रत्येक सिल्वरम बॉक्स में क्रमांकित एवं मुहरबंद संलग्न।",

    // Real Moments
    momentsBadge: "+ वास्तविक गृह // पावन संकलन",
    momentsTitle: "भारतीय गृहों में सुशोभित पवित्र स्थान",
    momentsDesc:
      "दीपावली के जगमगाते पूजा मंदिर से लेकर शांत अध्ययन कक्ष और नए गृह प्रवेश तक—देखें कैसे सिल्वरम परिवारों के आशीर्वाद को संजोता है।",

    // Materiality
    craftBadge: "+ अनुभाग 05 // विशुद्ध शिल्प एवं पारदर्शिता",
    craftTitle: "999 शुद्ध सिल्वर क्लैडिंग • ऑप्टिकल-ग्रेड एक्रेलिक",
    craftDesc:
      "हमारा विश्वास है कि सच्चा विलास पूर्ण पारदर्शिता में है। जानें कैसे आपका कीपसेक बिना काले पड़े पीढ़ियों तक चमकता रहता है।",

    // Footer
    footerTagline: "वास्तुशिल्प चांदी के कीपसेक और अनमोल स्मृतियां। भारत में श्रद्धा और निष्ठा से निर्मित।",
    footerAllRights: "© 2026 सिल्वरम कीपसेक। सर्वाधिकार सुरक्षित।",
    footerAudioToggle: "ध्वनि अनुभव:",
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: (typeof TRANSLATIONS)["en"];
  presets: InscriptionPreset[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "silveram_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "hi") {
        setLocaleState(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, loc);
    } catch {
      // Ignore
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "hi" : "en");
  };

  const currentLocale = mounted ? locale : "en";
  const t = TRANSLATIONS[currentLocale];
  const presets = currentLocale === "hi" ? PRESETS_HI : PRESETS_EN;

  return (
    <LanguageContext.Provider
      value={{
        locale: currentLocale,
        setLocale,
        toggleLocale,
        t,
        presets,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
