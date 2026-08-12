"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const projects = t.homeProjects?.items || [];

  const sectionRef = useRef<HTMLElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const triggerEl = sectionRef.current;
      const uiEl = uiRef.current;
      if (!triggerEl || !uiEl || projects.length === 0) return;

      // Pin the UI Overlay (01/04, center project title, view all work button) while the section scrolls
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom",
        pin: uiEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      cardsRef.current.forEach((item, index) => {
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,

          onUpdate(self) {
            const progress = self.progress;

            let rotationX = 0;
            let z = 0;
            let yPercent = 0;
            let saturate = 1;
            let brightness = 1;

            if (progress < 0.22) {
              const p = (0.22 - progress) / 0.22;
              const ease = (1 - Math.cos(p * Math.PI)) / 2;
              rotationX = ease * 55;
              z = ease * -450;
              yPercent = ease * -15;
              saturate = 1 - ease * 0.35;
              brightness = 1 - ease * 0.35;
            } else if (progress > 0.78) {
              const p = (progress - 0.78) / 0.22;
              const ease = (1 - Math.cos(p * Math.PI)) / 2;
              rotationX = -ease * 55;
              z = ease * -450;
              yPercent = ease * -15;
              saturate = 1 - ease * 0.35;
              brightness = 1 - ease * 0.35;
            }

            gsap.set(item, {
              rotationX,
              z,
              yPercent,
              filter: `saturate(${saturate}) brightness(${brightness})`,
            });

            if (progress > 0.30 && progress < 0.70) {
              if (activeIndexRef.current !== index) {
                activeIndexRef.current = index;
                setActiveIndex(index);
              }
            }
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [projects?.length, language] }
  );

  if (!projects || projects.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative bg-bg text-white">
      {/* Pinned UI Overlay Layer (GSAP ScrollTrigger pin) */}
      <div
        ref={uiRef}
        className="absolute top-0 left-0 h-screen w-full pointer-events-none z-30 flex flex-col justify-between p-6 md:p-12 lg:p-16"
      >
        {/* Top Heading */}
        <div className="w-full text-center mt-2 md:mt-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white/90 drop-shadow-sm select-none">
            {t.homeProjects.titlePart1} {t.homeProjects.titlePart2}
          </h2>
        </div>

        {/* Left Sticky Counter */}
        <div className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-30 font-mono text-sm md:text-base lg:text-lg tracking-[0.2em] text-white/90 select-none pointer-events-auto">
          <span className="font-semibold text-white">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/40">/</span>
          <span className="text-white/60">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Sticky Center Project Title (Changes on Card Change) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center select-none w-full max-w-[75vw] px-4 pointer-events-none">
          <div
            key={activeIndex}
            className="transition-all duration-500 ease-out"
          >
            <h3 className="text-xl md:text-3xl lg:text-4xl font-sans font-medium tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {projects[activeIndex]?.title}
            </h3>
            {projects[activeIndex]?.tags && (
              <div className="flex items-center justify-center gap-2 mt-2 opacity-90">
                <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase font-mono text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {projects[activeIndex]?.tags.slice(0, 3).join(" • ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky CTA Button */}
        <div className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <Link
            href={`/${language}/work`}
            className="group inline-flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-xs md:text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-md shadow-lg"
          >
            <span>{t.homeProjects.explore || "view all work"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* 3D Rotating Gallery Cards (Variant 3) */}
      <div className="gallery relative w-full flex flex-col items-center pt-[22vh] pb-[20vh] z-10 px-6 md:px-24 lg:px-32">
        {projects.map((project: any, index: number) => (
          <div
            key={index}
            className="gallery__item-wrap w-full max-w-[760px] mx-auto [perspective:1100px] mb-[18vh]"
          >
            <div
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="gallery__item relative w-full aspect-[3/2] rounded-2xl md:rounded-3xl border border-white/10 bg-[#0e0e0e] shadow-2xl cursor-pointer group [will-change:transform,filter]"
            >
              {/* overflow-hidden is on this inner wrapper, not the rotated element, to avoid flattening the 3D context */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
                <Link
                  href={`/${language}/work`}
                  className="relative block w-full h-full"
                >
                  {/* Background Project Image */}
                  <div className="absolute inset-0 bg-[#0a0a0a]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 60vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Subtle dark tint so the white sticky title stands out clearly */}
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />

                  {/* Subtle Hover Ring */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/25 rounded-2xl md:rounded-3xl transition-colors duration-500 pointer-events-none" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
