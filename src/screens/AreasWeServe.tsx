"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { US_STATES } from '@/lib/states';
import { STATE_IMAGES } from '@/lib/state-images';
import { CTASection } from '@/components/home/CTASection';
import { cn } from '@/lib/utils';

export function AreasWeServe() {
  const { language, t } = useLanguage();
  const [openStateSlug, setOpenStateSlug] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const states = Object.entries(US_STATES).map(([slug, name]) => ({
    slug,
    name,
    image: STATE_IMAGES[slug] || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
  }));

  const services = t.services?.items || [];

  const toggleDropdown = (slug: string) => {
    setOpenStateSlug((prev) => (prev === slug ? null : slug));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openStateSlug) {
        const ref = dropdownRefs.current[openStateSlug];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenStateSlug(null);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openStateSlug]);

  const handleKeyDown = (e: React.KeyboardEvent, slug: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(slug);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenStateSlug(null);
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* ── Hero Section ── */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/about-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(59,130,246,0.12),transparent)] z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-sans font-medium tracking-widest uppercase">
                {t.areasWeServePage?.badge || 'National Coverage'}
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-[600] tracking-tight leading-[1.1] mb-8 text-white">
              {t.areasWeServePage?.title || 'Areas We Serve'}{' '}
              <span className="font-serif italic font-normal text-white/90">
                {t.areasWeServePage?.titleItalic || 'Across the United States'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-sans">
              {t.areasWeServePage?.subtitle || 'Belk Digital provides premium digital services for businesses across all 50 U.S. states. Explore your state to discover the services available for your region.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── State Directory Section ── */}
      <section className="py-24 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {states.map((state, index) => {
            const isOpen = openStateSlug === state.slug;
            return (
              <motion.div
                key={state.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
                ref={(el) => {
                  dropdownRefs.current[state.slug] = el;
                }}
                className="relative flex flex-col group bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] rounded-3xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-visible"
              >
                {/* State Image container */}
                <div className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden bg-neutral-950">
                  <Image
                    src={state.image}
                    alt={state.name}
                    fill
                    sizes="(max-w-768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* State Name & Trigger */}
                <div className="p-3 md:p-5 flex flex-col gap-3">
                  <h3 className="text-base md:text-lg font-sans font-[600] text-white tracking-tight">
                    {state.name}
                  </h3>

                  <button
                    onClick={() => toggleDropdown(state.slug)}
                    onKeyDown={(e) => handleKeyDown(e, state.slug)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className="flex items-center justify-between w-full px-3 py-2 text-[10px] md:text-xs font-sans font-medium text-white/70 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] rounded-xl transition-all duration-200"
                  >
                    <span>{t.areasWeServePage?.dropdownButton || 'Our Services'}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      data-lenis-prevent="true"
                      data-lenis-prevent-touch="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      className="absolute left-0 right-0 top-full mt-2 z-50 p-2 bg-neutral-950/95 border border-white/[0.08] rounded-2xl shadow-2xl backdrop-blur-md max-h-[280px] overflow-y-auto overscroll-contain touch-pan-y"
                    >
                      <ul className="flex flex-col gap-1" role="menu">
                        {services.map((service: any) => (
                          <li key={service.slug} role="none">
                            <Link
                              href={`/${language}/services/${service.slug}/${state.slug}`}
                              className="block w-full px-3 py-2 text-xs font-sans text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg text-left transition-colors"
                              role="menuitem"
                              title={`${service.title} Services in ${state.name}`}
                            >
                              {service.title} in {state.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={t.areasWeServePage?.ctaTitle || 'Ready to transform your brand nationwide?'}
        subtitle={t.areasWeServePage?.ctaSubtitle || "Let's build a bespoke digital solution, high-performance website, or SEO campaign tailored to your local market."}
      />
    </div>
  );
}
