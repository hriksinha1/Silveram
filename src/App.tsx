import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SoundProvider } from "@/context/SoundContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { HomePage } from "@/pages/HomePage";
import { NotFound } from "@/pages/NotFound";

export function App() {
  const isHome = window.location.pathname === "/" || window.location.pathname === "/index.html";

  return (
    <LanguageProvider>
      <SoundProvider>
        <CartProvider>
          {isHome ? (
            <>
              <HomePage />
              <CartDrawer />
              <CheckoutModal />
            </>
          ) : (
            <NotFound />
          )}
        </CartProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}
