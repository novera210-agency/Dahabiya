"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/itinerary`, label: t("itinerary") },
    { href: `/${locale}/gallery`, label: t("gallery") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <Image
              src="/treasure-logo.png"
              alt="Treasure Egypt Tours & Travel"
              width={200}
              height={62}
              className="h-10 md:h-12 w-auto max-w-[150px] md:max-w-[190px] object-contain"
              priority
              unoptimized={false}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1B2785] hover:text-[#F5A623] transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={otherLocalePath}
              className="text-[#1B2785]/70 hover:text-[#1B2785] text-sm font-medium border border-[#1B2785]/20 rounded-full px-3 py-1 transition-all hover:border-[#1B2785]/50"
            >
              {otherLocale === "ar" ? "عربي" : "English"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="bg-[#F5A623] hover:bg-[#e09410] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-sm"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#1B2785] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1B2785] hover:text-[#F5A623] transition-colors font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <Link
                href={otherLocalePath}
                className="text-[#1B2785]/70 text-sm border border-[#1B2785]/20 rounded-full px-3 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {otherLocale === "ar" ? "عربي" : "English"}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="bg-[#F5A623] hover:bg-[#e09410] text-white text-sm font-semibold px-5 py-2 rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
