"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Boat = "all" | "royal" | "princess" | "queen";

const royalImages = Array.from({ length: 46 }, (_, i) => ({
  src: `/royal-cleopatra/royal-${i + 1}.jpg`,
  alt: `Royal Cleopatra Dahabiya — photo ${i + 1}`,
  boat: "royal" as const,
}));

const princessImages = Array.from({ length: 35 }, (_, i) => ({
  src: `/princess-cleopatra/princess-${i + 1}.jpg`,
  alt: `Princess Cleopatra Dahabiya — photo ${i + 1}`,
  boat: "princess" as const,
}));

const queenImages = Array.from({ length: 19 }, (_, i) => ({
  src: `/queen-cleopatra/queen-${i + 1}.jpg`,
  alt: `Queen Cleopatra Dahabiya — photo ${i + 1}`,
  boat: "queen" as const,
}));

const allImages = [...royalImages, ...princessImages, ...queenImages];

const tabs: { key: Boat; label: string; count: number }[] = [
  { key: "all",      label: "All Boats",         count: allImages.length },
  { key: "royal",    label: "Royal Cleopatra",    count: royalImages.length },
  { key: "princess", label: "Princess Cleopatra", count: princessImages.length },
  { key: "queen",    label: "Queen Cleopatra",    count: queenImages.length },
];

/* vary aspect ratio so the masonry grid feels alive */
const aspectRatios = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[16/9]"];
function getAspect(i: number) {
  return aspectRatios[i % aspectRatios.length];
}

const boatLabels: Record<string, string> = {
  royal: "Royal Cleopatra Dahabiya",
  princess: "Princess Cleopatra Dahabiya",
  queen: "Queen Cleopatra Dahabiya",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState<Boat>("royal");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTab === "all"      ? allImages
    : activeTab === "royal"  ? royalImages
    : activeTab === "princess" ? princessImages
    : queenImages;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      else if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <section className="py-16 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ── Tab bar ── */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 border"
              style={{
                background:   activeTab === tab.key ? "#1B2785" : "white",
                color:        activeTab === tab.key ? "white"   : "#1B2785",
                borderColor:  activeTab === tab.key ? "#1B2785" : "rgba(27,39,133,0.18)",
              }}
            >
              {activeTab === tab.key && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-full bg-[#1B2785]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span
                className="relative z-10 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: activeTab === tab.key ? "rgba(255,255,255,0.2)" : "rgba(27,39,133,0.08)",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Boat heading ── */}
        <AnimatePresence mode="wait">
          {activeTab !== "all" && (
            <motion.div
              key={activeTab + "-heading"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-[#1B2785]">{boatLabels[activeTab]}</h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-16 h-0.5 bg-[#F5A623] mx-auto mt-3 origin-left"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Masonry grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                variants={itemVariants}
                className="break-inside-avoid"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${getAspect(i)}`}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading={i < 12 ? "eager" : "lazy"}
                    quality={80}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1550]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn size={14} className="text-white" />
                      </div>
                    </div>
                    <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full self-start">
                      {img.alt.split("—")[0].trim()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full z-10">
              {lightboxIndex + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[85vh] mx-16 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={800}
                className="object-contain w-full max-h-[85vh]"
                quality={90}
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                <p className="text-white text-sm font-medium">
                  {filtered[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
