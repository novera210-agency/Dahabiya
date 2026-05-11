'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Anchor, Wind, Users, Compass } from 'lucide-react';

const cardData = [
  { key: 'tranquility', icon: Wind, num: '01' },
  { key: 'luxury', icon: Anchor, num: '02' },
  { key: 'authentic', icon: Compass, num: '03' },
  { key: 'slowtravel', icon: Users, num: '04' },
] as const;

export function WhySectionClient() {
  const t = useTranslations('why');
  const sectionRef = useRef<HTMLElement>(null);
  const [headerIn, setHeaderIn] = useState(false);
  const [cardsIn, setCardsIn] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setHeaderIn(true); setCardsIn(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderIn(true);
          setTimeout(() => setCardsIn(true), 280);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #070C2E 0%, #1B2785 45%, #0D1550 100%)',
      }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(245,166,35,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(245,166,35,0.12) 0%, transparent 70%)' }}
      />

      {/* Hairline gold borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div
          className="text-center mb-20"
          style={{
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? 'translateY(0)' : 'translateY(2.5rem)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-7">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#F5A623]" />
            <span className="text-[#F5A623] text-[10px] font-bold tracking-[0.4em] uppercase">
              {t('badge')}
            </span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#F5A623]" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            {t('title')}
          </h2>

          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map(({ key, icon: Icon, num }, i) => (
            <div
              key={key}
              style={{
                opacity: cardsIn ? 1 : 0,
                transform: cardsIn ? 'translateY(0)' : 'translateY(3.5rem)',
                transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110}ms`,
              }}
            >
              <div className="group relative h-full p-8 rounded-2xl border border-white/[0.08] hover:border-[#F5A623]/40 overflow-hidden cursor-default bg-white/[0.035] hover:bg-white/[0.07] transition-colors duration-300">

                {/* Ghost number */}
                <span
                  className="absolute -top-2 -right-1 font-black select-none leading-none pointer-events-none group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    fontSize: '6.5rem',
                    color: 'rgba(245,166,35,0.055)',
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>

                {/* Animated bottom gold accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#F5A623] to-[#e09410] transition-all duration-500 ease-out" />

                {/* Left glow on hover */}
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#F5A623]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-7 bg-[#F5A623]/10 group-hover:bg-[#F5A623]/20 transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-[#F5A623] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-white text-lg mb-3 leading-snug">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {t(`cards.${key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom decorative rule ── */}
        <div
          className="flex items-center gap-4 mt-20 justify-center"
          style={{
            opacity: cardsIn ? 1 : 0,
            transition: `opacity 0.8s ease ${cardData.length * 110 + 200}ms`,
          }}
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#F5A623]/30" />
          <Anchor size={14} className="text-[#F5A623]/50" />
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#F5A623]/30" />
        </div>
      </div>
    </section>
  );
}
