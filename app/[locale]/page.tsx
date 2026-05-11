import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Anchor, Compass, Quote, ArrowRight } from "lucide-react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Testimonials from "@/components/Testimonials";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { WhySectionClient } from "./WhySectionClient";
import { RouteSectionClient } from "./RouteSectionClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return { title: `${t("title")} ${t("titleHighlight")} | Treasure Egypt` };
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background — Royal Cleopatra at Nile sunset */}
      <Image
        src="/royal-cleopatra/royal-10.jpg"
        alt="Royal Cleopatra Dahabiya on the Nile at sunset"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111a60]/70 via-[#1B2785]/50 to-[#111a60]/80" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/40 rounded-full px-4 py-1.5 mb-6">
          <Anchor size={14} className="text-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium">{t("badge")}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {t("title")}{" "}
          <span className="text-[#F5A623] italic">{t("titleHighlight")}</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="bg-[#F5A623] hover:bg-[#e09410] text-white font-semibold px-8 py-3.5 rounded-full transition-all text-base shadow-lg hover:shadow-xl"
          >
            {t("cta_book")}
          </Link>
          <Link
            href={`/${locale}/itinerary`}
            className="flex items-center gap-2 border border-white/40 hover:border-white text-white font-medium px-8 py-3.5 rounded-full transition-all text-base"
          >
            {t("cta_explore")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-white/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
      </div>
    </section>
  );
}



function QuoteSection() {
  const t = useTranslations("quote");
  return (
    <section className="py-20 px-4 bg-[#1B2785]">
      <div className="max-w-3xl mx-auto text-center">
        <Quote size={40} className="text-[#F5A623]/40 mx-auto mb-6" />
        <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed italic mb-6">
          "{t("text")}"
        </blockquote>
        <cite className="text-[#F5A623] font-medium not-italic text-sm tracking-widest uppercase">
          — {t("author")}
        </cite>
      </div>
    </section>
  );
}

const teaserImages = [
  { src: "/royal-cleopatra/royal-1.jpg", label: "Royal Cleopatra" },
  { src: "/princess-cleopatra/princess-5.jpg", label: "Princess Cleopatra" },
  { src: "/queen-cleopatra/queen-1.jpg", label: "Queen Cleopatra" },
];

function GalleryTeaser({ locale }: { locale: string }) {
  const t = useTranslations("gallery_teaser");

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2785] mb-4">{t("title")}</h2>
          <p className="text-gray-500 text-base sm:text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {teaserImages.map((img) => (
            <Link
              key={img.src}
              href={`/${locale}/gallery`}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group block"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2785]/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-semibold text-sm">
                {img.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-2 bg-[#1B2785] hover:bg-[#111a60] text-white font-semibold px-8 py-3.5 rounded-full transition-all"
          >
            {t("cta")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTABand({ locale }: { locale: string }) {
  const t = useTranslations("cta_band");
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#F5A623] to-[#e09410]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{t("title")}</h2>
        <p className="text-white/80 text-base sm:text-lg mb-8">{t("subtitle")}</p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 bg-[#1B2785] hover:bg-[#111a60] text-white font-semibold px-10 py-4 rounded-full transition-all text-lg shadow-xl"
        >
          {t("button")} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

const nileProducts = [
  // Row 1 — Royal Cleopatra Dahabiya
  {
    title: "Royal Cleopatra — On the Nile",
    link: "/en/gallery",
    thumbnail: "/royal-cleopatra/royal-1.jpg",
  },
  {
    title: "Royal Cleopatra — Full Sail",
    link: "/en/gallery",
    thumbnail: "/royal-cleopatra/royal-3.jpg",
  },
  {
    title: "Royal Cleopatra — Dramatic Sky",
    link: "/en/gallery",
    thumbnail: "/royal-cleopatra/royal-5.jpg",
  },
  {
    title: "Royal Cleopatra — Nile Sunset",
    link: "/en/gallery",
    thumbnail: "/royal-cleopatra/royal-10.jpg",
  },
  {
    title: "Princess Cleopatra — On the Nile",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-1.jpg",
  },
  // Row 2 — Princess Cleopatra Dahabiya
  {
    title: "Princess Cleopatra — Full Sail",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-5.jpg",
  },
  {
    title: "Princess Cleopatra — Cabin",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-15.jpg",
  },
  {
    title: "Princess Cleopatra — Nile View Cabin",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-20.jpg",
  },
  {
    title: "Princess Cleopatra — Dining Lounge",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-25.jpg",
  },
  {
    title: "Queen Cleopatra — Golden Hour",
    link: "/en/gallery",
    thumbnail: "/queen-cleopatra/queen-1.jpg",
  },
  // Row 3 — Queen Cleopatra Dahabiya
  {
    title: "Queen Cleopatra — Twin Cabin",
    link: "/en/gallery",
    thumbnail: "/queen-cleopatra/queen-5.jpg",
  },
  {
    title: "Queen Cleopatra — Cabin Interior",
    link: "/en/gallery",
    thumbnail: "/queen-cleopatra/queen-10.jpg",
  },
  {
    title: "Queen Cleopatra — Sun Deck Dining",
    link: "/en/gallery",
    thumbnail: "/queen-cleopatra/queen-15.jpg",
  },
  {
    title: "Princess Cleopatra — Sunset View",
    link: "/en/gallery",
    thumbnail: "/princess-cleopatra/princess-30.jpg",
  },
  {
    title: "Royal Cleopatra — Night Sail",
    link: "/en/gallery",
    thumbnail: "/royal-cleopatra/royal-15.jpg",
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localizedProducts = nileProducts.map((p) => ({
    ...p,
    link: p.link.replace("/en/", `/${locale}/`),
  }));

  return (
    <>
      <HeroSection locale={locale} />
      <HeroParallax products={localizedProducts} />
      <WhySectionClient />
      <RouteSectionClient locale={locale} />
      <QuoteSection />
      <Testimonials />
      <GalleryTeaser locale={locale} />
      <SocialConnect />
    </>
  );
}
