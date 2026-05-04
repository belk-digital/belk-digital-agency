"use client";
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, MapPin, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
  const { language, t } = useLanguage();
  const footerData = t.footer;

  const quickLinks = [
    { href: `/${language}`, label: 'Home' },
    { href: `/${language}/about`, label: 'About' },
    { href: `/${language}/work`, label: 'Our Work' },
    { href: `/${language}/faq`, label: 'FAQ' },
    { href: `/${language}/contact`, label: 'Contact' },
  ];

  const services = [
    { href: `/${language}/services/custom-web-design`, label: 'Custom Web Design & UI/UX' },
    { href: `/${language}/services/website-redesign`, label: 'Website Redesign & Optimization' },
    { href: `/${language}/services/branding`, label: 'Branding & Digital Identity' },
    { href: `/${language}/services/web-development`, label: 'Web & SaaS Development' },
    { href: `/${language}/services/seo-optimization`, label: 'Search Engine Optimization (SEO)' },
  ];

  const locations = [
    { city: 'Dubai', href: `/${language}/locations/dubai` },
    { city: 'Riyadh', href: `/${language}/locations/riyadh` },
    { city: 'New York', href: `/${language}/locations/new-york` },
    { city: 'London', href: `/${language}/locations/london` },
    { city: 'Sydney', href: `/${language}/locations/sydney` },
  ];

  return (
    <footer className="bg-black relative h-fit rounded-[40px] overflow-hidden m-4 md:m-8 border border-white/[0.05]">
      <div className="max-w-7xl mx-auto p-10 md:p-14 z-40 relative pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">

          {/* Brand section */}
          <div className="flex flex-col space-y-6 pointer-events-auto">
            <Link href={`/${language}`} className="flex items-center space-x-3 group">
              <img src="/logo.png" alt={footerData.branding} className="h-12 w-auto transition-transform group-hover:scale-110" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {footerData.description}
            </p>
            {/* Email */}
            <a
              href={`mailto:${footerData.contactItems.email}`}
              className="flex items-center gap-2.5 text-white/40 hover:text-[#3ca2fa] transition-colors text-sm"
            >
              <Mail size={16} className="text-[#3ca2fa] shrink-0" />
              {footerData.contactItems.email}
            </a>
          </div>

          {/* Quick Links */}
          <div className="pointer-events-auto">
            <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-8 opacity-80">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-[#3ca2fa] transition-colors text-[0.95rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="pointer-events-auto">
            <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-8 opacity-80">
              Services
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-white/40 hover:text-[#3ca2fa] transition-colors text-[0.95rem]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="pointer-events-auto">
            <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-8 opacity-80">
              Locations
            </h4>
            <ul className="space-y-4">
              {locations.map((loc) => (
                <li key={loc.city}>
                  <Link
                    href={loc.href}
                    className="flex items-center gap-2 text-white/40 hover:text-[#3ca2fa] transition-colors text-[0.95rem]"
                  >
                    <MapPin size={13} className="shrink-0 opacity-60" />
                    {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[22rem] md:h-[30rem] -mt-40 md:-mt-52 -mb-8 md:-mb-12 overflow-hidden pointer-events-auto">
        <TextHoverEffect text="BELK DIGITAL" className="z-10" />
      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto px-10 md:px-14 pb-8 md:pb-12 z-40 relative pointer-events-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-white/30 border-t border-white/[0.05] pt-8 mt-4">
          <p className="font-medium uppercase tracking-widest text-[10px] text-center md:text-left">
            {footerData.copyright}
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest">
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:text-[#3ca2fa] transition-colors"><Linkedin size={15} /></a>
              <a href="#" className="hover:text-[#3ca2fa] transition-colors"><Twitter size={15} /></a>
              <a href="#" className="hover:text-[#3ca2fa] transition-colors"><Instagram size={15} /></a>
              <a href="#" className="hover:text-[#3ca2fa] transition-colors"><Facebook size={15} /></a>
            </div>
          </div>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
