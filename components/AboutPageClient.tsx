"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Sun, ChefHat, Users, Leaf, ArrowRight, Anchor } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

/* ─── 1. HERO ─── */
function Hero() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[640px] flex items-end overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/royal-cleopatra/royal-10.jpg"
          alt="Royal Cleopatra Dahabiya at golden hour"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e] via-[#0d1550]/60 to-[#0d1550]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d2e]/60 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-full px-4 py-1.5 mb-6"
        >
          <Anchor size={12} className="text-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium tracking-wide">Est. 19th Century · Nile, Egypt</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-6 max-w-3xl"
        >
          {t("hero_title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/60 text-xl max-w-lg leading-relaxed"
        >
          {t("hero_subtitle")}
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap gap-px mt-12 border border-white/10 rounded-2xl overflow-hidden w-fit"
        >
          {[
            { value: "19th C", label: "Origins" },
            { value: "3",      label: "Vessels" },
            { value: "7",      label: "Days" },
            { value: "420km",  label: "Luxor → Aswan" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm px-6 py-4 text-center min-w-[100px]">
              <div className="text-[#F5A623] text-xl font-bold">{s.value}</div>
              <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <div className="w-px h-10 bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
      </div>
    </section>
  );
}

/* ─── 2. ORIGIN STORY ─── */
function OriginSection() {
  const t = useTranslations("about");

  return (
    <section className="bg-white overflow-hidden">
      {/* Editorial intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          {/* Left: large decade + text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#F5A623]" />
              <span className="text-[#F5A623] text-sm font-medium tracking-widest uppercase">The Story</span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="text-[120px] md:text-[160px] font-bold text-[#1B2785]/5 leading-none select-none -mt-4 -mb-8"
            >
              1800s
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-[#1B2785] leading-tight mb-8">
              {t("what_title")}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-5">
              {t("what_p1")}
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              {t("what_p2")}
            </motion.p>
          </motion.div>

          {/* Right: stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Shadow card behind */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#F5A623]/10 border border-[#F5A623]/20" />
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
              <Image
                src="/queen-cleopatra/queen-1.jpg"
                alt="Queen Cleopatra Dahabiya on the Nile"
                fill
                className="object-cover object-center"
                quality={85}
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060d2e]/80 to-transparent px-6 py-6">
                <p className="text-white font-semibold">Queen Cleopatra Dahabiya</p>
                <p className="text-white/50 text-sm">Luxor – Aswan, Egypt</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width image band */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative h-[55vh] min-h-[380px] overflow-hidden"
      >
        <Image
          src="/royal-cleopatra/royal-1.jpg"
          alt="Royal Cleopatra under full sail"
          fill
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d2e]/70 via-transparent to-[#060d2e]/40" />
        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <blockquote className="max-w-xl">
            <p className="text-3xl md:text-4xl font-light text-white italic leading-snug">
              "Sailing is not merely a journey — it is a return to something ancient and true."
            </p>
            <footer className="mt-5 text-[#F5A623] text-sm font-medium tracking-widest uppercase">
              — The Nile, Egypt
            </footer>
          </blockquote>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── 3. FEATURES — Bento image grid ─── */
function FeaturesSection() {
  const t = useTranslations("about");

  const cards = [
    { key: "cabins",  icon: Bed,     image: "/princess-cleopatra/princess-15.jpg" },
    { key: "deck",    icon: Sun,     image: "/queen-cleopatra/queen-15.jpg" },
    { key: "cuisine", icon: ChefHat, image: "/princess-cleopatra/princess-25.jpg" },
    { key: "service", icon: Users,   image: "/royal-cleopatra/royal-1.jpg" },
  ] as const;

  return (
    <section className="py-28 px-6 lg:px-8 bg-[#060d2e] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#F5A623]" />
              <span className="text-[#F5A623] text-sm font-medium tracking-widest uppercase">On Board</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              {t("features_title")}
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs md:text-right leading-relaxed">
            Every detail considered so you can be fully present in the moment.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gridTemplateRows: "repeat(2, 340px)" }}
        >
          {cards.map(({ key, icon: Icon, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{
                gridRow: i === 0 ? "span 2" : undefined,
                gridColumn: i === 3 ? "span 2" : undefined,
              }}
            >
              {/* Photo background */}
              <Image
                src={image}
                alt={t(`features.${key}.title`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                quality={85}
              />

              {/* Always-on gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e]/95 via-[#060d2e]/30 to-transparent" />

              {/* Gold shimmer line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Icon */}
                <div className="mb-5 w-12 h-12 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#F5A623]/20 transition-colors duration-300">
                  <Icon size={20} className="text-[#F5A623]" />
                </div>

                {/* Gold bar */}
                <div className="w-8 h-0.5 bg-[#F5A623] mb-4 transition-all duration-400 group-hover:w-16" />

                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm translate-y-2 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-400">
                  {t(`features.${key}.desc`)}
                </p>
              </div>

              {/* Corner number */}
              <div className="absolute top-6 right-6 text-white/10 text-5xl font-bold leading-none select-none group-hover:text-white/5 transition-colors">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. THREE VESSELS ─── */
const vessels = [
  {
    name: "Royal Cleopatra",
    caption: "Our flagship — the grandest of the three.",
    src: "/royal-cleopatra/royal-3.jpg",
    accent: "#F5A623",
  },
  {
    name: "Princess Cleopatra",
    caption: "Elegant and intimate, perfect for couples.",
    src: "/princess-cleopatra/princess-1.jpg",
    accent: "#1B2785",
  },
  {
    name: "Queen Cleopatra",
    caption: "Refined simplicity for the discerning traveller.",
    src: "/queen-cleopatra/queen-1.jpg",
    accent: "#F5A623",
  },
];

function VesselsSection({ locale }: { locale: string }) {
  return (
    <section className="py-28 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#F5A623]" />
            <span className="text-[#F5A623] text-sm font-medium tracking-widest uppercase">The Fleet</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1B2785] leading-tight max-w-xl">
            Three Vessels, One River
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {vessels.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <Image
                src={v.src}
                alt={v.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                quality={85}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e] via-[#060d2e]/30 to-transparent" />

              {/* Index number */}
              <div className="absolute top-5 right-5 text-white/20 text-5xl font-bold leading-none select-none">
                0{i + 1}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="w-8 h-0.5 mb-4 transition-all duration-300 group-hover:w-14"
                  style={{ background: "#F5A623" }} />
                <h3 className="text-2xl font-bold text-white mb-1">{v.name}</h3>
                <p className="text-white/50 text-sm">{v.caption}</p>

                <Link
                  href={`/${locale}/gallery`}
                  className="inline-flex items-center gap-2 mt-5 text-[#F5A623] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  View Photos <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. ECO / VALUES ─── */
function EcoSection() {
  const t = useTranslations("about");

  return (
    <section className="bg-[#060d2e] py-28 px-6 lg:px-8 overflow-hidden relative">
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,166,35,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#F5A623]" />
            <span className="text-[#F5A623] text-sm font-medium tracking-widest uppercase">Our Philosophy</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
            {t("eco_title")}
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10">
            {t("eco_text")}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "Wind", label: "Primary power" },
              { value: "12",   label: "Max guests" },
              { value: "0",    label: "Mass tourism" },
            ].map((s) => (
              <div key={s.label} className="border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-2xl font-bold text-[#F5A623] mb-1">{s.value}</div>
                <div className="text-white/30 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-[#F5A623]/5 border border-[#F5A623]/10" />
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <Image
              src="/princess-cleopatra/princess-5.jpg"
              alt="Princess Cleopatra sailing under wind"
              fill
              className="object-cover"
              quality={85}
            />
            <div className="absolute inset-0 bg-[#060d2e]/30" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 flex items-center justify-center">
                <Leaf size={16} className="text-[#F5A623]" />
              </div>
              <span className="text-white text-sm font-medium">Sail-powered · Minimal footprint</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 6. FINAL CTA ─── */
function CTASection({ locale }: { locale: string }) {
  const t = useTranslations("about");

  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <Image
        src="/royal-cleopatra/royal-5.jpg"
        alt="Royal Cleopatra at sunset"
        fill
        className="object-cover object-bottom"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d2e]/80 via-[#060d2e]/35 to-[#060d2e]/50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="w-12 h-px bg-[#F5A623] mx-auto mb-8" />
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Your Nile story<br />
          <span className="text-[#F5A623] italic">starts here.</span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
          Limited cabins. Unlimited horizon. Reserve your place on the river.
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

/* ─── PAGE ─── */
export default function AboutPageClient({ locale }: { locale: string }) {
  return (
    <>
      <Hero />
      <OriginSection />
      <FeaturesSection />
      <VesselsSection locale={locale} />
      <EcoSection />
      <CTASection locale={locale} />
    </>
  );
}
