"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import GalleryGrid from "@/components/GalleryGrid";
import { Camera } from "lucide-react";

function PageHero() {
  const t = useTranslations("gallery");

  return (
    <section className="relative pt-32 pb-28 px-4 bg-[#0d1550] overflow-hidden">
      {/* Animated wave pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q30 0 60 30 Q90 60 120 30' stroke='%23F5A623' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,166,35,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-full px-4 py-1.5 mb-6"
        >
          <Camera size={13} className="text-[#F5A623]" />
          <span className="text-[#F5A623] text-sm font-medium tracking-wide">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-tight"
        >
          {t("hero_title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-xl"
        >
          {t("hero_subtitle")}
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default function GalleryPageClient() {
  return (
    <>
      <PageHero />
      <GalleryGrid />
    </>
  );
}
