'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Anchor, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// 2 full sine-wave cycles — ship animateMotion follows this exact path
const WAVE =
  'M 0 40 C 40 18, 110 18, 150 40 C 190 62, 260 62, 300 40 C 340 18, 410 18, 450 40 C 490 62, 560 62, 600 40';

// Shadow wave — y shifted +5 for depth illusion
const WAVE_SHADOW =
  'M 0 45 C 40 23, 110 23, 150 45 C 190 67, 260 67, 300 45 C 340 23, 410 23, 450 45 C 490 67, 560 67, 600 45';

export function RouteSectionClient({ locale }: { locale: string }) {
  const t = useTranslations('route');
  const landmarks = ['karnak', 'valley', 'edfu', 'komOmbo', 'villages'] as const;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(2rem)',
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#FDFAF5]">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14" style={fadeIn(0)}>
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#1B2785]/40" />
            <span className="text-[#1B2785]/50 text-[10px] font-bold tracking-[0.38em] uppercase">
              The Route
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#1B2785]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B2785] mb-4">{t('title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* ── Route card ── */}
        <div
          className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
          style={{
            ...fadeIn(150),
            boxShadow:
              '0 4px 48px rgba(27,39,133,0.07), 0 1px 6px rgba(27,39,133,0.04)',
          }}
        >
          {/* ─ Wave + cities ─ */}
          <div className="px-8 md:px-12 pt-10 pb-6">
            <div className="flex items-center gap-4 md:gap-6">

              {/* Luxor */}
              <div className="flex-shrink-0 text-center" style={{ minWidth: 72 }}>
                <div className="relative w-16 h-16 mx-auto mb-2.5">
                  <span className="absolute inset-0 rounded-full bg-[#1B2785]/10 animate-ping"
                    style={{ animationDuration: '2.8s' }} />
                  <div className="relative w-full h-full rounded-full bg-[#1B2785] flex items-center justify-center shadow-lg shadow-[#1B2785]/20">
                    <Anchor size={20} className="text-[#F5A623]" />
                  </div>
                </div>
                <p className="font-bold text-[#1B2785] text-base leading-tight">{t('luxor')}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Departure</p>
              </div>

              {/* ─── Animated wave ─── */}
              <div className="flex-1 relative" style={{ minWidth: 0, height: 100 }}>
                <svg
                  viewBox="0 0 600 80"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                  style={{ overflow: 'visible' }}
                  aria-hidden="true"
                >
                  <defs>
                    {/* Wave gradient: navy → sky → gold */}
                    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#1B2785" />
                      <stop offset="55%"  stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#F5A623" />
                    </linearGradient>

                    {/* Water body gradient */}
                    <linearGradient id="waterFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1B2785" stopOpacity="0.04" />
                    </linearGradient>

                    {/* Ship glow */}
                    <filter id="shipGlow" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
                      <feFlood floodColor="#F5A623" floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Wave line glow */}
                    <filter id="waveGlow">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ── Water body fill ── */}
                  <path d={`${WAVE} L 600 80 L 0 80 Z`} fill="url(#waterFill)" />

                  {/* ── Shadow wave (depth) ── */}
                  <path
                    d={WAVE_SHADOW}
                    fill="none"
                    stroke="#1B2785"
                    strokeWidth="1"
                    strokeOpacity="0.1"
                  />

                  {/* ── Main wave (ship follows this) ── */}
                  <path
                    id="routeWavePath"
                    d={WAVE}
                    fill="none"
                    stroke="url(#waveGrad)"
                    strokeWidth="2.8"
                    filter="url(#waveGlow)"
                  />

                  {/* ── Flowing dash overlay (water movement) ── */}
                  <path
                    d={WAVE}
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                    strokeDasharray="10 8"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-18"
                      dur="1.4s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* ── Slower secondary flowing layer ── */}
                  <path
                    d={WAVE}
                    fill="none"
                    stroke="#1B2785"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    strokeDasharray="4 16"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-20"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* ── Sparkle at wave zero-crossings ── */}
                  {[150, 300, 450].map((cx, i) => (
                    <circle key={cx} cx={cx} cy={40} r={2.5} fill="#F5A623" opacity={0.5}>
                      <animate
                        attributeName="opacity"
                        values="0.15;0.7;0.15"
                        dur={`${2 + i * 0.5}s`}
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1.5;3.5;1.5"
                        dur={`${2 + i * 0.5}s`}
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}

                  {/* ── Dahabiya ship ── */}
                  <g filter="url(#shipGlow)">
                    <animateMotion
                      dur="9s"
                      repeatCount="indefinite"
                      rotate="auto"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href="#routeWavePath" />
                    </animateMotion>

                    {/* Ship group — origin at waterline center */}
                    <g>
                      {/* Hull */}
                      <path
                        d="M -11 0 Q 0 6.5 11 0 L 8 9.5 Q 0 11.5 -8 9.5 Z"
                        fill="#1B2785"
                      />
                      {/* Mast */}
                      <line
                        x1="0" y1="-24" x2="0" y2="0"
                        stroke="#1B2785" strokeWidth="2" strokeLinecap="round"
                      />
                      {/* Lateen spar (yard) */}
                      <line
                        x1="0" y1="-24" x2="13" y2="0"
                        stroke="#0A0F3D" strokeWidth="1.3" strokeLinecap="round"
                      />
                      {/* Main lateen sail */}
                      <path d="M 0 -24 L 13 0 L 0 0 Z" fill="#F5A623" opacity="0.95" />
                      {/* Fore stay-sail */}
                      <path d="M 0 -15 L -8 0 L 0 0 Z" fill="#F5A623" opacity="0.65" />
                      {/* Flag */}
                      <path d="M 0 -24 L 5 -20 L 0 -16 Z" fill="#e09410" />
                      {/* Wake (tiny dots behind hull) */}
                      <circle cx="-13" cy="6" r="1.2" fill="#60A5FA" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="-17" cy="7" r="0.8" fill="#60A5FA" opacity="0.3">
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Aswan */}
              <div className="flex-shrink-0 text-center" style={{ minWidth: 72 }}>
                <div className="relative w-16 h-16 mx-auto mb-2.5">
                  <span className="absolute inset-0 rounded-full bg-[#F5A623]/25 animate-ping"
                    style={{ animationDuration: '2.8s', animationDelay: '0.9s' }} />
                  <div className="relative w-full h-full rounded-full bg-[#F5A623] flex items-center justify-center shadow-lg shadow-[#F5A623]/30">
                    <Compass size={20} className="text-white" />
                  </div>
                </div>
                <p className="font-bold text-[#1B2785] text-base leading-tight">{t('aswan')}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Arrival</p>
              </div>
            </div>
          </div>

          {/* ─ Landmarks ─ */}
          <div className="border-t border-gray-50 px-8 md:px-12 py-5 bg-[#FDFAF5]/70">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
              {landmarks.map((key, i) => (
                <div
                  key={key}
                  className="group flex items-center gap-2 bg-white border border-[#1B2785]/[0.07] rounded-xl px-3 py-2.5 hover:border-[#1B2785]/20 hover:bg-[#1B2785]/[0.03] transition-all cursor-default"
                >
                  <span className="text-[10px] font-bold text-[#F5A623] flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-[#1B2785] font-medium leading-tight">
                    {t(`landmarks.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-8" style={fadeIn(300)}>
          <Link
            href={`/${locale}/itinerary`}
            className="inline-flex items-center gap-2 text-[#1B2785] font-semibold hover:text-[#F5A623] transition-colors duration-200"
          >
            {t('view_itinerary')} <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
