import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dahabiya Nile Cruise | Treasure Egypt Tours & Travel",
  description: "Experience the Nile on a traditional Dahabiya sailing cruise between Luxor and Aswan. Boutique luxury, authentic access, and unforgettable memories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
