"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { InscriptionData, CRAFTED_MESSAGES } from "@/components/product/FrameViewer3D";

export interface RibbonOption {
  name: string;
  hex: string;
  meaning: string;
}

export const RIBBON_OPTIONS: RibbonOption[] = [
  { name: "Imperial Navy", hex: "#0C1B36", meaning: "Devotion & Sanctuary" },
  { name: "Kashi Crimson", hex: "#991B1B", meaning: "Auspiciousness & Blessings" },
  { name: "Sacred Saffron", hex: "#D97706", meaning: "Divinity & Warmth" },
  { name: "Temple Pearl", hex: "#F8FAFC", meaning: "Purity & Peace" },
];

export interface UploadedPhoto {
  previewUrl: string;
  fileName: string;
  fileSize?: string;
}

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  activeRibbon: RibbonOption;
  setActiveRibbon: (ribbon: RibbonOption) => void;
  uploadedPhoto: UploadedPhoto | null;
  setUploadedPhoto: (photo: UploadedPhoto | null) => void;
  photoOption: "installed" | "envelope";
  setPhotoOption: (option: "installed" | "envelope") => void;
  inscription: InscriptionData;
  setInscription: (inscription: InscriptionData) => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  addToBag: () => void;
  clearBag: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [activeRibbon, setActiveRibbon] = useState<RibbonOption>(RIBBON_OPTIONS[0]);
  const [uploadedPhoto, setUploadedPhoto] = useState<UploadedPhoto | null>(null);
  const [photoOption, setPhotoOption] = useState<"installed" | "envelope">("installed");

  const [inscription, setInscription] = useState<InscriptionData>({
    recipient: CRAFTED_MESSAGES[0].recipient,
    message: CRAFTED_MESSAGES[0].message,
    date: CRAFTED_MESSAGES[0].date,
    themeTitle: CRAFTED_MESSAGES[0].title,
  });

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToBag = () => {
    setCartCount(1);
    setIsCartOpen(true);
  };

  const clearBag = () => {
    setCartCount(0);
    setUploadedPhoto(null);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cartCount,
        activeRibbon,
        setActiveRibbon,
        uploadedPhoto,
        setUploadedPhoto,
        photoOption,
        setPhotoOption,
        inscription,
        setInscription,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        addToBag,
        clearBag,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
