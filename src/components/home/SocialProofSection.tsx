"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const brands = [
  { name: 'Longevia Research', logo: '/images/projects/longevia-logo-v9.png', url: 'https://longeviaresearch.com/' },
  { name: 'Velvet Girl Entertainment', logo: '/images/projects/velvet-girl-logo-v7.png', url: 'https://velvetgirlentertainment.com/' },
  { name: 'Sparta Labs', logo: '/images/projects/sparta-labs-logo.png', url: 'https://www.spartalabs.shop' },
  { name: 'Body By Brad', logo: '/images/projects/bodybybrad-logo.png', url: 'https://bodybybradfitness.com/' },
  { name: '99Purity Peptides', logo: '/images/projects/99puritypeptides-logo.png', url: 'https://99puritypeptides.com/' },
  { name: '99Purity Wholesale', logo: '/images/projects/99puritywholesale-logo-v4.png', url: 'https://99puritywholesale.com/' },
  { name: 'Belk Body Lab', logo: '/images/projects/belk-body-lab-logo.png', url: 'https://belkbodylab.com/' },
  { name: 'Helix Bio', logo: '/images/projects/helix-bio-logo-v1.png', url: 'https://helixbiochem.com/' },
];

export function SocialProofSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const fadeLoop = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration > 0) {
        if (currentTime < 0.5) {
          video.style.opacity = (currentTime / 0.5).toString();
        } else if (duration - currentTime < 0.5) {
          video.style.opacity = ((duration - currentTime) / 0.5).toString();
        } else {
          video.style.opacity = "1";
        }
      }

      animationFrameId = requestAnimationFrame(fadeLoop);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => { });
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', () => {
      animationFrameId = requestAnimationFrame(fadeLoop);
    });

    // Start playing
    video.play().catch(() => { });

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ opacity: 0 }}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-transparent to-[#000] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-24 px-4 gap-20">
        <div className="h-40 w-full" /> {/* Spacer div for video visibility */}

        {/* Logo Marquee */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="text-foreground/50 text-sm whitespace-nowrap shrink-0 text-center md:text-left font-sans">
            Relied on by brands <br className="hidden md:block" /> across the globe
          </div>

          <div className="relative flex overflow-hidden flex-1 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex shrink-0 animate-marquee gap-16 min-w-[200%] sm:min-w-full">
              {/* Duplicated for seamless scrolling */}
              {[...brands, ...brands, ...brands, ...brands].map((brand: any, i: number) => (
                <Link
                  key={i}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200"
                >
                  <div className="relative w-32 h-10 md:w-36 md:h-12">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 128px, 144px"
                      className="object-contain filter brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
