"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Check, X, MapPin, ArrowRight } from "lucide-react";

/* ── day images ── */
const dayImages = [
  "/royal-cleopatra/royal-10.jpg",
  "/royal-cleopatra/royal-1.jpg",
  "/queen-cleopatra/queen-5.jpg",
  "/princess-cleopatra/princess-5.jpg",
  "/royal-cleopatra/royal-3.jpg",
  "/queen-cleopatra/queen-1.jpg",
  "/princess-cleopatra/princess-1.jpg",
];

/* ── Dahabiya SVG ── */
function DahabiyaSVG({ active }: { active: boolean }) {
  return (
    <svg
      width="60"
      height="44"
      viewBox="0 0 60 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Wake */}
      <ellipse cx="30" cy="41" rx="20" ry="2.5" fill="#3ca2fa" opacity="0.25" />
      {/* Hull */}
      <path d="M6 26 Q30 34 54 26 L49 33 Q30 41 11 33 Z" fill={active ? "#F5A623" : "#1B2785"} />
      {/* Cabin body */}
      <rect x="14" y="17" width="26" height="11" rx="2.5" fill={active ? "#1B2785" : "#0a0f3d"} />
      {/* Upper deck rail */}
      <rect x="16" y="13" width="22" height="6" rx="1.5" fill={active ? "#1B2785" : "#0d1550"} />
      {/* Mast */}
      <line x1="30" y1="1" x2="30" y2="17" stroke="#e0e0e0" strokeWidth="1.5" strokeLinecap="round" />
      {/* Forward sail */}
      <path d="M30 3 L46 14 L30 17 Z" fill="white" fillOpacity={active ? 0.92 : 0.35} />
      {/* Aft sail */}
      <path d="M30 3 L15 12 L30 17 Z" fill="white" fillOpacity={active ? 0.65 : 0.2} />
      {/* Flag */}
      <polygon points="30,1 37,4.5 30,8" fill="#F5A623" />
      {/* Windows */}
      {[18, 24, 30].map((x) => (
        <rect key={x} x={x} y="19.5" width="4" height="3.5" rx="0.8"
          fill="#F5A623" fillOpacity={active ? 0.7 : 0.25} />
      ))}
    </svg>
  );
}

/* ── HERO ── */
function PageHero() {
  const t = useTranslations("itinerary");
  const routeStops = t.raw("route_stops") as string[];

  return (
    <section className="relative min-h-[80vh] flex items-end pb-24 overflow-hidden">
      <Image
        src="/princess-cleopatra/princess-5.jpg"
        alt="Sailing the Nile"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e] via-[#060d2e]/55 to-[#1B2785]/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-full px-4 py-1.5 mb-6"
        >
          <MapPin size={12} className="text-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium tracking-wide">{t("route_label")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold text-white leading-[0.9] mb-5 max-w-2xl"
        >
          {t("hero_title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/50 text-xl max-w-md mb-10"
        >
          {t("hero_subtitle")}
        </motion.p>

        {/* Route breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center gap-2"
        >
          {routeStops.map((stop, i) => (
            <div key={stop} className="flex items-center gap-2">
              <span className={`text-sm font-medium ${i === 0 || i === routeStops.length - 1 ? "text-[#F5A623]" : "text-white/50"}`}>
                {stop}
              </span>
              {i < routeStops.length - 1 && (
                <span className="text-[#F5A623]/30 text-xs">›</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── TIMELINE ── */
function Timeline() {
  const t = useTranslations("itinerary");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 16 });

  /* Boat aligns with the 7 dots: first dot ≈ 9%, last ≈ 91% of line */
  const boatTop = useTransform(smooth, [0, 1], ["7%", "93%"]);

  /* Gold fill expands downward */
  const lineScaleY = useTransform(smooth, [0, 1], [0, 1]);

  /* Day 1 is active from the start; each subsequent day activates per 1/7 scroll */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveDay(Math.min(6, Math.floor(v * 7)));
  });

  const days = ["1", "2", "3", "4", "5", "6", "7"] as const;

  return (
    <section ref={sectionRef} className="relative bg-[#060d2e] overflow-hidden">
      {/* Nile wave texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q30 10 60 30 Q90 50 120 30' stroke='%234fa3ff' strokeWidth='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 60px",
        }}
      />

      {/* ── The Nile river line ── */}
      {/* Mobile: left edge. Desktop: center. */}
      <div className="absolute left-8 top-0 bottom-0 md:left-1/2 md:-translate-x-px z-20 pointer-events-none">
        {/* Faint base line */}
        <div className="absolute inset-0 w-px bg-white/10" />

        {/* Gold progress fill */}
        <motion.div
          className="absolute top-0 left-0 w-px origin-top"
          style={{
            scaleY: lineScaleY,
            background: "linear-gradient(to bottom, #1B2785 0%, #F5A623 50%, #1B2785 100%)",
          }}
        />

        {/* ── Boat ── */}
        <motion.div
          className="absolute left-0"
          style={{ top: boatTop, x: "-50%", y: "-50%" }}
        >
          {/* Boat glow */}
          <div className="absolute inset-0 blur-2xl bg-[#F5A623]/20 scale-[3] rounded-full" />
          <DahabiyaSVG active={true} />
        </motion.div>
      </div>

      {/* ── Day stops ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {days.map((day, i) => {
          const isLeft = i % 2 === 0;
          const isActive = i <= activeDay;
          const isCurrent = i === Math.min(6, activeDay);

          return (
            <div
              key={day}
              className={`relative flex items-center min-h-[300px] md:min-h-[340px] ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* ── Card ── */}
              <div className={`flex-1 ps-20 md:ps-0 ${isLeft ? "md:pr-24" : "md:pl-24"}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-3xl overflow-hidden border transition-all duration-700 ${
                    isActive
                      ? "border-[#F5A623]/30 shadow-[0_0_50px_rgba(245,166,35,0.1)]"
                      : "border-white/6"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dayImages[i]}
                      alt={t(`days.${day}.title`)}
                      fill
                      className={`object-cover transition-all duration-700 ${isActive ? "scale-100" : "scale-105 saturate-0 opacity-50"}`}
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c2a]/95 to-transparent" />

                    {/* Day pill */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[#F5A623] text-white"
                          : "bg-white/8 text-white/30"
                      }`}>
                        Day {day}
                      </span>
                    </div>

                    {/* Location pin for active */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 flex items-center justify-center"
                      >
                        <MapPin size={13} className="text-[#F5A623]" />
                      </motion.div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="bg-[#0c1240]/90 backdrop-blur-sm p-6">
                    <h3 className={`font-bold text-xl mb-2.5 transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/30"
                    }`}>
                      {t(`days.${day}.title`)}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-white/50" : "text-white/20"
                    }`}>
                      {t(`days.${day}.desc`)}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ── Stop dot on the line ── */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
                {/* Ping ring on current */}
                {isCurrent && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#F5A623]"
                  />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    backgroundColor: isActive ? "#F5A623" : "#1B2785",
                    boxShadow: isActive
                      ? "0 0 0 3px #060d2e, 0 0 20px rgba(245,166,35,0.6)"
                      : "0 0 0 3px #060d2e",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-5 h-5 rounded-full"
                />
              </div>

              {/* Empty half desktop */}
              <div className="hidden md:block flex-1" />
            </div>
          );
        })}
      </div>

      {/* Luxor / Aswan labels */}
      <div className="absolute left-8 md:left-1/2 md:-translate-x-[calc(50%+20px)] top-4 z-30">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623]/60">Luxor</span>
      </div>
      <div className="absolute left-8 md:left-1/2 md:-translate-x-[calc(50%+22px)] bottom-4 z-30">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623]/60">Aswan</span>
      </div>
    </section>
  );
}

/* ── INCLUDED / EXCLUDED ── */
function IncludedSection() {
  const t = useTranslations("itinerary");
  const included = t.raw("included") as string[];
  const excluded = t.raw("excluded") as string[];

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#060d2e] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium tracking-widest uppercase">What's Covered</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.03] p-8"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                <Check size={18} className="text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-lg">{t("included_title")}</h3>
            </div>
            <ul className="space-y-4">
              {included.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-emerald-400" />
                  </div>
                  <span className="text-white/60 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Excluded */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/6 bg-white/[0.02] p-8"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-2xl bg-red-500/12 flex items-center justify-center">
                <X size={18} className="text-red-400" />
              </div>
              <h3 className="font-bold text-white text-lg">{t("excluded_title")}</h3>
            </div>
            <ul className="space-y-4">
              {excluded.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/12 flex items-center justify-center shrink-0">
                    <X size={11} className="text-red-400" />
                  </div>
                  <span className="text-white/40 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function BookCTA({ locale }: { locale: string }) {
  const t = useTranslations("itinerary");
  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <Image
        src="/royal-cleopatra/royal-10.jpg"
        alt="Nile at golden hour"
        fill
        className="object-cover object-center"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e]/85 via-[#060d2e]/50 to-[#060d2e]/30" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="w-12 h-px bg-[#F5A623] mx-auto mb-8" />
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
          Ready to <span className="text-[#F5A623] italic">sail?</span>
        </h2>
        <p className="text-white/45 text-lg mb-10">
          Limited cabins available. Secure your place on the Nile.
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-3 bg-[#F5A623] hover:bg-[#e09410] text-white font-semibold px-10 py-4 rounded-full transition-all text-base shadow-xl hover:shadow-[#F5A623]/30 group"
        >
          {t("book_cta")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ── PAGE ── */
export default function ItineraryPageClient({ locale }: { locale: string }) {
  return (
    <>
      <PageHero />
      <Timeline />
      <IncludedSection />
      <BookCTA locale={locale} />
    </>
  );
}
