"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const socialIcons = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Treasure.egypt.tours.and.travel?rdid=T86QyQFQcz139zrK&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FPcFv66BS%2F",
    hoverBg: "#1877f2",
    hoverShadow: "rgba(24,119,242,0.55)",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-8 sm:w-8 text-white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/treasureegypttour?igsh=NHptNzdoYzA2bDU5",
    hoverBg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    hoverShadow: "rgba(214,36,159,0.55)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 sm:h-8 sm:w-8 text-white">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/201002588564",
    hoverBg: "#25D366",
    hoverShadow: "rgba(37,211,102,0.55)",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-8 sm:w-8 text-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    key: "tripadvisor",
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/UserReviewEdit-g23527705-d26680761-Treasure_Egypt_Tours_Travel-Al_Haram_Giza_Governorate.html",
    hoverBg: "#34E0A1",
    hoverShadow: "rgba(52,224,161,0.55)",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-8 sm:w-8 text-white">
        <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 00-.08 8.537 6 6 0 008.52-.05l1.61 1.734 1.61-1.734a6.003 6.003 0 008.437.075l.081.075 1.963-2.135h-4.35C17.348 5.08 14.678 4.295 12.006 4.295zm0 1.87c1.35 0 2.67.267 3.9.734-1.243.462-2.568.734-3.9.734s-2.656-.272-3.9-.734c1.23-.467 2.552-.734 3.9-.734zM6.007 9.87a4.125 4.125 0 110 8.25 4.125 4.125 0 010-8.25zm12 0a4.125 4.125 0 110 8.25 4.125 4.125 0 010-8.25zm-12 1.876a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm12 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      </svg>
    ),
  },
];

export function SocialConnect() {
  const t = useTranslations("cta_band");
  const locale = useLocale();

  return (
    <section className="relative bg-[#07091f] py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(245,166,35,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/25 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium tracking-wide">{t("badge")}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {t("title")}{" "}
          <span className="text-[#F5A623] italic">{t("title_suffix")}</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          {t("subtitle")}
        </p>

        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09410] text-white font-semibold px-9 py-4 rounded-full transition-all text-base shadow-lg hover:shadow-[#F5A623]/30 hover:shadow-xl mb-16"
        >
          {t("button")} <ArrowRight size={18} />
        </Link>

        {/* Glowing social card */}
        <div
          className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-10 transition-all duration-500 hover:scale-[1.02]"
          style={{
            boxShadow:
              "0 0 50px rgba(245,166,35,0.18), 0 0 100px rgba(245,166,35,0.08)",
          }}
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">
            {t("connect_label")}
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-12">
            {socialIcons.map(({ key, label, href, hoverBg, hoverShadow, svg }) => (
              <SocialIconBtn
                key={key}
                label={label}
                href={href}
                hoverBg={hoverBg}
                hoverShadow={hoverShadow}
              >
                {svg}
              </SocialIconBtn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIconBtn({
  label,
  href,
  hoverBg,
  hoverShadow,
  children,
}: {
  label: string;
  href: string;
  hoverBg: string;
  hoverShadow: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="social-icon-btn flex flex-col items-center gap-3 no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="icon-circle flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/10"
        style={{
          background: hovered ? hoverBg : "rgba(255,255,255,0.05)",
          boxShadow: hovered
            ? `0 0 24px ${hoverShadow}, 0 8px 32px rgba(0,0,0,0.4)`
            : "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {children}
      </div>
      <span className="icon-label text-white text-sm font-medium">{label}</span>
    </a>
  );
}
