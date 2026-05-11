"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  const quickLinks = [
    { href: `/${locale}`, label: nav("home") },
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/itinerary`, label: nav("itinerary") },
    { href: `/${locale}/gallery`, label: nav("gallery") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} className="text-[#F5A623] shrink-0" />,
      text: "info@treasureegypttours.com",
      href: "mailto:info@treasureegypttours.com",
    },
    {
      icon: <Phone size={16} className="text-[#F5A623] shrink-0" />,
      text: "+20 100 258 8564 · +20 100 153 8358",
      href: "tel:+201002588564",
    },
    {
      icon: <MapPin size={16} className="text-[#F5A623] shrink-0" />,
      text: "Luxor – Aswan, Egypt",
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0a0f3d] text-gray-300">
      <FooterBackgroundGradient />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">

          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/treasure-logo.png"
                alt="Treasure Egypt Tours & Travel"
                width={200}
                height={62}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-1.5 text-[#F5A623] text-sm font-medium">
              <MapPin size={14} />
              <span>Luxor – Aswan, Egypt</span>
            </div>
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-500 hover:text-[#F5A623] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">
              {t("links_title")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#F5A623] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">
              {t("contact_title")}
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-[#F5A623] transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500 text-center md:text-start">
          <span>
            © {new Date().getFullYear()} Treasure Egypt Tours & Travel. {t("rights")}
          </span>
          <span className="text-[#F5A623]/50 tracking-wide uppercase text-[10px] hidden sm:block">
            Luxor · Esna · Edfu · Kom Ombo · Aswan
          </span>
        </div>
      </div>

      {/* Giant text hover effect */}
      <div className="hidden lg:flex h-64 -mb-8 relative z-10 opacity-80">
        <TextHoverEffect text="DAHABIYA" />
      </div>
    </footer>
  );
}
