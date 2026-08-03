"use client";
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
  const { language, t } = useLanguage();
  const footerData = t?.footer || {};

  const quickLinks = [
    { href: `/${language}`, label: t?.nav?.home || (language === 'es' ? 'Inicio' : language === 'fr' ? 'Accueil' : language === 'de' ? 'Startseite' : 'Home') },
    { href: `/${language}/about`, label: t?.nav?.about || (language === 'es' ? 'Nosotros' : language === 'fr' ? 'À propos' : language === 'de' ? 'Über uns' : 'About') },
    { href: `/${language}/work`, label: t?.nav?.work || (language === 'es' ? 'Proyectos' : language === 'fr' ? 'Réalisations' : language === 'de' ? 'Projekte' : 'Our Work') },
    { href: `/${language}/proposals`, label: language === 'es' ? 'Propuestas' : language === 'fr' ? 'Propositions' : language === 'de' ? 'Angebote' : 'Proposals' },
    { href: `/${language}/faq`, label: t?.nav?.faq || 'FAQ' },
    { href: `/${language}/contact`, label: t?.nav?.contact || (language === 'es' ? 'Contacto' : language === 'fr' ? 'Contact' : language === 'de' ? 'Kontakt' : 'Contact') },
  ];

  const services = [
    {
      href: `/${language}/services/custom-web-design`,
      label: language === 'es' ? 'Diseño Web Personalizado & UI/UX' :
             language === 'fr' ? 'Design Web Sur Mesure & UI/UX' :
             language === 'de' ? 'Individuelles Webdesign & UI/UX' :
             'Custom Web Design & UI/UX'
    },
    {
      href: `/${language}/services/website-redesign`,
      label: language === 'es' ? 'Rediseño y Optimización de Sitios' :
             language === 'fr' ? 'Refonte & Optimisation Web' :
             language === 'de' ? 'Website-Relaunch & Optimierung' :
             'Website Redesign & Optimization'
    },
    {
      href: `/${language}/services/branding`,
      label: language === 'es' ? 'Branding e Identidad Digital' :
             language === 'fr' ? 'Image de Marque & Identité Numérique' :
             language === 'de' ? 'Branding & Digitale Identität' :
             'Branding & Digital Identity'
    },
    {
      href: `/${language}/services/web-development`,
      label: language === 'es' ? 'Desarrollo Web & SaaS' :
             language === 'fr' ? 'Développement Web & SaaS' :
             language === 'de' ? 'Web- & SaaS-Entwicklung' :
             'Web & SaaS Development'
    },
    {
      href: `/${language}/services/seo-optimization`,
      label: language === 'es' ? 'Optimización SEO' :
             language === 'fr' ? 'Optimisation SEO' :
             language === 'de' ? 'Suchmaschinenoptimierung (SEO)' :
             'Search Engine Optimization (SEO)'
    },
  ];

  const quickLinksHeading = language === 'es' ? 'Enlaces Rápidos' :
                           language === 'fr' ? 'Liens Rapides' :
                           language === 'de' ? 'Schnellzugriff' :
                           'Quick Links';

  const servicesHeading = t?.nav?.services || (language === 'es' ? 'Servicios' : language === 'fr' ? 'Services' : language === 'de' ? 'Leistungen' : 'Services');

  return (
    <footer className="bg-black relative h-fit rounded-[40px] overflow-hidden m-4 md:m-8 border border-white/[0.05]">
      <div className="max-w-7xl mx-auto p-10 md:p-14 z-40 relative pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">

          {/* Brand section */}
          <div className="flex flex-col space-y-6 pointer-events-auto">
            <Link href={`/${language}`} className="flex items-center space-x-3 group">
              <img src="/logo.png" alt={footerData.branding || "Belk Digital"} className="h-12 w-auto transition-transform group-hover:scale-110" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {footerData.description}
            </p>
            {/* Email */}
            {footerData?.contactItems?.email && (
              <a
                href={`mailto:${footerData.contactItems.email}`}
                className="flex items-center gap-2.5 text-white/40 hover:text-[#3ca2fa] transition-colors text-sm"
              >
                <Mail size={16} className="text-[#3ca2fa] shrink-0" />
                {footerData.contactItems.email}
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div className="pointer-events-auto">
            <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-8 opacity-80">
              {quickLinksHeading}
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
              {servicesHeading}
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
              <a href="https://www.linkedin.com/company/belk-digital/" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ca2fa] transition-colors"><Linkedin size={15} /></a>
              <a href="https://x.com/belkdigital?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ca2fa] transition-colors"><Twitter size={15} /></a>
              <a href="https://www.instagram.com/belkdigital_official?igsh=MTFyZ2NkZ3Z5NmZuYQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ca2fa] transition-colors"><Instagram size={15} /></a>
            </div>
          </div>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
