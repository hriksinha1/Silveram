import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Silveram — India-First Gifting & Keepsakes",
  description: "Thoughtful keepsakes for the people who make life matter. Give a memory a place to live.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Silveram — India-First Gifting & Keepsakes",
    description: "Thoughtful keepsakes for the people who make life matter. Give a memory a place to live.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-porcelain text-graphite antialiased flex flex-col selection:bg-silver selection:text-midnight">
        {children}
      </body>
    </html>
  );
}
