"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { useParams } from 'next/navigation';

const CHARLESTON_DATA: Record<string, {
  allLocations: string;
  badge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  ctaButton: string;
  commitmentTag: string;
  commitmentTitle1: string;
  commitmentTitle2: string;
  commitmentBody: string;
  stats: Array<{ value: string; label: string }>;
  whyUsTag: string;
  whyUsTitle1: string;
  whyUsTitle2: string;
  reasonPrefix: string;
  whyChoose: Array<{ title: string; description: string }>;
  offerTag: string;
  offerTitle1: string;
  offerTitle2: string;
  services: Array<{ title: string; description: string }>;
  areasTag: string;
  areasTitle1: string;
  areasTitle2: string;
  areasSubtitle: string;
  viewServices: string;
  neighborhoods: Array<{ slug: string; label: string; description: string }>;
  workWithTitle1: string;
  workWithTitle2: string;
  industries: string[];
}> = {
  en: {
    allLocations: 'All Locations',
    badge: 'Charleston, SC',
    heroTitle1: 'Web Design & Digital Marketing Agency in ',
    heroTitle2: 'Charleston, SC',
    heroSubtitle: 'Belk Digital helps Charleston, SC businesses grow online with custom web design, local SEO, and digital marketing strategies built for the Lowcountry market.',
    ctaButton: 'Get a Free Consultation',
    commitmentTag: 'Our Commitment',
    commitmentTitle1: 'Delivering Digital Excellence in ',
    commitmentTitle2: 'Charleston, SC',
    commitmentBody: "Charleston is one of the Southeast's most dynamic markets—hospitality, real estate, healthcare, and technology are all booming. We help local businesses stand out online with high-performance websites and data-driven marketing that connects you with customers across every Charleston neighborhood, from downtown to the outer islands.",
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '10+', label: 'Years Combined Experience' },
    ],
    whyUsTag: 'Why Us',
    whyUsTitle1: 'Why Charleston Businesses Choose ',
    whyUsTitle2: 'Belk Digital',
    reasonPrefix: 'Reason',
    whyChoose: [
      {
        title: 'Deep knowledge of the Charleston market',
        description: 'We understand the Lowcountry business landscape—tourism, hospitality, healthcare, and real estate—and build digital strategies that speak to local buyers.',
      },
      {
        title: 'Local SEO that puts you on the map',
        description: 'From Google Business Profile optimization to location-specific landing pages, we help you capture "near me" searches across every Charleston neighborhood.',
      },
      {
        title: 'Performance-first development',
        description: 'Every site we build is optimized for Core Web Vitals, mobile speed, and accessibility—the foundations Google rewards with higher rankings.',
      },
      {
        title: 'Transparent, long-term partnerships',
        description: 'No lock-in contracts. No disappearing agencies. We build lasting relationships with Charleston business owners who want consistent growth.',
      },
    ],
    offerTag: 'What We Offer',
    offerTitle1: 'Digital Services for ',
    offerTitle2: 'Charleston Businesses',
    services: [
      { title: 'Custom Web Design & UI/UX', description: 'Conversion-focused websites built for the Lowcountry market.' },
      { title: 'Website Redesign & Optimization', description: 'Modernize your existing site for speed, SEO, and leads.' },
      { title: 'Web & SaaS Development', description: 'Scalable web applications for Charleston businesses.' },
      { title: 'Local SEO (Charleston, SC)', description: 'Rank in Google Maps and local search for Charleston-area queries.' },
      { title: 'Digital Marketing & Growth', description: 'PPC, social ads, and content strategies targeting SC customers.' },
      { title: 'Website Maintenance & Support', description: 'Ongoing care so your site stays fast, secure, and up to date.' },
    ],
    areasTag: 'Service Areas',
    areasTitle1: 'Charleston Neighborhoods & ',
    areasTitle2: 'Areas We Serve',
    areasSubtitle: 'From the historic peninsula to the surrounding communities, we help businesses across the entire Charleston metro area compete online.',
    viewServices: 'View services',
    neighborhoods: [
      { slug: 'downtown', label: 'Downtown Charleston', description: 'Historic business district and hospitality hub' },
      { slug: 'mount-pleasant', label: 'Mount Pleasant', description: "Charleston's fastest-growing suburb" },
      { slug: 'north-charleston', label: 'North Charleston', description: 'Commerce, logistics & industrial corridor' },
      { slug: 'west-ashley', label: 'West Ashley', description: 'Retail, healthcare & residential growth area' },
      { slug: 'james-island', label: 'James Island', description: 'Close-knit community & small business hub' },
      { slug: 'johns-island', label: "Johns Island", description: 'Agriculture, agri-tourism & local enterprise' },
      { slug: 'daniel-island', label: 'Daniel Island', description: 'Master-planned corporate & residential district' },
      { slug: 'summerville', label: 'Summerville', description: 'Rapidly expanding suburbs north of Charleston' },
    ],
    workWithTitle1: 'Who We Work With in ',
    workWithTitle2: 'Charleston, SC',
    industries: [
      'Restaurants & Hospitality',
      'Real Estate & Property',
      'Healthcare & Medical Practices',
      'Law Firms & Professional Services',
      'E-commerce & Retail',
      'Tourism & Travel Businesses',
      'Contractors & Home Services',
      'Startups & Tech Companies',
    ],
  },
  es: {
    allLocations: 'Todas las Ubicaciones',
    badge: 'Charleston, SC',
    heroTitle1: 'Agencia de Diseño Web y Marketing Digital en ',
    heroTitle2: 'Charleston, SC',
    heroSubtitle: 'Belk Digital ayuda a las empresas de Charleston, SC a crecer con diseño web a medida, SEO local y estrategias de marketing digital optimizadas para el mercado local.',
    ctaButton: 'Obtener Consulta Gratuita',
    commitmentTag: 'Nuestro Compromiso',
    commitmentTitle1: 'Excelencia Digital en ',
    commitmentTitle2: 'Charleston, SC',
    commitmentBody: 'Charleston es uno de los mercados más dinámicos del sureste. Ayudamos a las empresas locales a destacar con sitios web de alto rendimiento y marketing basado en datos para conectar con clientes en todos los vecindarios de Charleston.',
    stats: [
      { value: '50+', label: 'Proyectos Entregados' },
      { value: '98%', label: 'Satisfacción del Cliente' },
      { value: '10+', label: 'Años de Experiencia Combinada' },
    ],
    whyUsTag: 'Por Qué Elegirnos',
    whyUsTitle1: 'Por Qué las Empresas de Charleston Eligen ',
    whyUsTitle2: 'Belk Digital',
    reasonPrefix: 'Razón',
    whyChoose: [
      {
        title: 'Profundo conocimiento del mercado de Charleston',
        description: 'Comprendemos el entorno empresarial local (turismo, hospitalidad, salud y bienes raíces) y creamos estrategias digitales que conectan con los clientes.',
      },
      {
        title: 'SEO local que te posiciona en el mapa',
        description: 'Desde Google Business Profile hasta páginas de destino locales, te ayudamos a captar búsquedas de proximidad en cada vecindario.',
      },
      {
        title: 'Desarrollo enfocado en rendimiento',
        description: 'Optimizamos cada sitio para Core Web Vitals, velocidad móvil y accesibilidad para maximizar tus clasificaciones en Google.',
      },
      {
        title: 'Colaboraciones transparentes a largo plazo',
        description: 'Sin contratos restrictivos. Construimos relaciones duraderas con dueños de negocios que buscan un crecimiento sólido.',
      },
    ],
    offerTag: 'Lo Que Ofrecemos',
    offerTitle1: 'Servicios Digitales para ',
    offerTitle2: 'Empresas en Charleston',
    services: [
      { title: 'Diseño Web Personalizado & UI/UX', description: 'Sitios web enfocados en conversiones para el mercado de Charleston.' },
      { title: 'Rediseño y Optimización de Sitios Web', description: 'Moderniza tu sitio web para velocidad, SEO y generación de leads.' },
      { title: 'Desarrollo Web & SaaS', description: 'Aplicaciones web escalables para empresas en crecimiento.' },
      { title: 'SEO Local (Charleston, SC)', description: 'Posiciónate en Google Maps y búsquedas locales en toda la región.' },
      { title: 'Marketing Digital & Crecimiento', description: 'Estrategias de PPC, redes sociales y contenido dirigidas a clientes locales.' },
      { title: 'Mantenimiento y Soporte Web', description: 'Cuidado continuo para que tu sitio web sea rápido, seguro y actualizado.' },
    ],
    areasTag: 'Áreas de Servicio',
    areasTitle1: 'Vecindarios de Charleston y ',
    areasTitle2: 'Áreas de Cobertura',
    areasSubtitle: 'Desde la península histórica hasta las comunidades periféricas, impulsamos la presencia digital en todo el área metropolitana de Charleston.',
    viewServices: 'Ver servicios',
    neighborhoods: [
      { slug: 'downtown', label: 'Downtown Charleston', description: 'Distrito comercial histórico y centro gastronómico' },
      { slug: 'mount-pleasant', label: 'Mount Pleasant', description: 'El suburbio de más rápido crecimiento en Charleston' },
      { slug: 'north-charleston', label: 'North Charleston', description: 'Corredor comercial, logístico e industrial' },
      { slug: 'west-ashley', label: 'West Ashley', description: 'Área comercial, médica y residencial en expansión' },
      { slug: 'james-island', label: 'James Island', description: 'Comunidad unida y núcleo de pequeños negocios' },
      { slug: 'johns-island', label: 'Johns Island', description: 'Agricultura, agroturismo y empresa local' },
      { slug: 'daniel-island', label: 'Daniel Island', description: 'Distrito corporativo y residencial planificado' },
      { slug: 'summerville', label: 'Summerville', description: 'Suburbios en rápida expansión al norte de Charleston' },
    ],
    workWithTitle1: 'Con Quién Trabajamos en ',
    workWithTitle2: 'Charleston, SC',
    industries: [
      'Restaurantes y Hospitalidad',
      'Bienes Raíces y Propiedades',
      'Salud y Clínicas Médicas',
      'Bufetes de Abogados y Servicios Profesionales',
      'Comercio Electrónico y Retail',
      'Turismo y Viajes',
      'Contratistas y Servicios para el Hogar',
      'Startups y Empresas Tecnológicas',
    ],
  },
  fr: {
    allLocations: 'Toutes les Localisations',
    badge: 'Charleston, SC',
    heroTitle1: 'Agence de Design Web & Marketing Digital à ',
    heroTitle2: 'Charleston, SC',
    heroSubtitle: 'Belk Digital aide les entreprises de Charleston, SC à se développer en ligne avec des sites web sur mesure, du SEO local et du marketing ciblé.',
    ctaButton: 'Obtenir une Consultation Gratuite',
    commitmentTag: 'Notre Engagement',
    commitmentTitle1: 'Excellence Numérique à ',
    commitmentTitle2: 'Charleston, SC',
    commitmentBody: "Charleston est un marché dynamique. Nous aidons les entreprises locales à briller grâce à des sites web performants et un marketing axé sur les données pour capter des clients dans chaque quartier de la métropole.",
    stats: [
      { value: '50+', label: 'Projets Livrés' },
      { value: '98%', label: 'Satisfaction Client' },
      { value: '10+', label: "Années d'Expérience Cumulée" },
    ],
    whyUsTag: 'Pourquoi Nous',
    whyUsTitle1: 'Pourquoi les Entreprises de Charleston Choisissent ',
    whyUsTitle2: 'Belk Digital',
    reasonPrefix: 'Raison',
    whyChoose: [
      {
        title: 'Connaissance approfondie du marché de Charleston',
        description: 'Nous comprenons le tissu économique local (tourisme, hôtellerie, santé, immobilier) et concevons des stratégies qui résonnent auprès des clients.',
      },
      {
        title: 'SEO local qui vous place en tête',
        description: 'Optimisation de fiche Google et pages locales pour capter les recherches de proximité dans chaque secteur de la ville.',
      },
      {
        title: 'Développement axé sur la performance',
        description: 'Chaque site est optimisé pour les Core Web Vitals, la vitesse mobile et l\'accessibilité, récompensés par Google.',
      },
      {
        title: 'Partenariats transparents et pérennes',
        description: 'Pas de contrat contraignant. Nous bâtissons des relations durables avec des dirigeants axés sur la croissance.',
      },
    ],
    offerTag: 'Nos Prestations',
    offerTitle1: 'Services Numériques pour les ',
    offerTitle2: 'Entreprises de Charleston',
    services: [
      { title: 'Design Web Sur Mesure & UI/UX', description: 'Sites web optimisés pour la conversion et adaptés au marché de Charleston.' },
      { title: 'Refonte & Optimisation de Sites', description: 'Modernisez votre site pour la vitesse, le SEO et la génération de leads.' },
      { title: 'Développement Web & SaaS', description: 'Applications web évolutives pour les entreprises en croissance.' },
      { title: 'SEO Local (Charleston, SC)', description: 'Positionnez-vous sur Google Maps et dans les recherches locales.' },
      { title: 'Marketing Digital & Croissance', description: 'Campagnes publicitaires, réseaux sociaux et contenu ciblant la Caroline du Sud.' },
      { title: 'Maintenance & Support Web', description: 'Accompagnement continu pour un site sécurisé, rapide et à jour.' },
    ],
    areasTag: 'Secteurs Desservis',
    areasTitle1: 'Quartiers de Charleston & ',
    areasTitle2: 'Zones d\'Intervention',
    areasSubtitle: 'De la péninsule historique aux localités environnantes, nous accompagnons les entreprises de toute l\'agglomération.',
    viewServices: 'Voir les services',
    neighborhoods: [
      { slug: 'downtown', label: 'Downtown Charleston', description: 'Quartier historique d\'affaires et pôle de restauration' },
      { slug: 'mount-pleasant', label: 'Mount Pleasant', description: 'La banlieue la plus dynamique de Charleston' },
      { slug: 'north-charleston', label: 'North Charleston', description: 'Centre d\'affaires, logistique et industriel' },
      { slug: 'west-ashley', label: 'West Ashley', description: 'Zone commerciale, médicale et résidentielle' },
      { slug: 'james-island', label: 'James Island', description: 'Communauté soudée et pôle d\'artisans et commerces' },
      { slug: 'johns-island', label: 'Johns Island', description: 'Agriculture, agrotourisme et entreprises locales' },
      { slug: 'daniel-island', label: 'Daniel Island', description: 'District résidentiel et d\'affaires haut de gamme' },
      { slug: 'summerville', label: 'Summerville', description: 'Banlieues en forte expansion au nord de Charleston' },
    ],
    workWithTitle1: 'Avec Qui Nous Travaillons à ',
    workWithTitle2: 'Charleston, SC',
    industries: [
      'Restaurants & Hôtellerie',
      'Immobilier & Gestion de Biens',
      'Santé & Cabinets Médicaux',
      'Avocats & Cabinets de Conseil',
      'E-commerce & Commerce de Détail',
      'Tourisme & Agences de Voyage',
      'Artisans & Services à Domicile',
      'Startups & Entreprises Technologiques',
    ],
  },
  de: {
    allLocations: 'Alle Standorte',
    badge: 'Charleston, SC',
    heroTitle1: 'Agentur für Webdesign & Digitales Marketing in ',
    heroTitle2: 'Charleston, SC',
    heroSubtitle: 'Belk Digital unterstützt Unternehmen in Charleston, SC mit maßgeschneidertem Webdesign, lokalem SEO und digitalen Marketingstrategien.',
    ctaButton: 'Kostenlose Beratung anfordern',
    commitmentTag: 'Unser Engagement',
    commitmentTitle1: 'Digitale Exzellenz in ',
    commitmentTitle2: 'Charleston, SC',
    commitmentBody: 'Charleston ist ein dynamischer Wachstumsmarkt. Wir helfen lokalen Unternehmen, mit schnellen Websites und datenbasiertem Marketing in allen Stadtteilen von Charleston Kunden zu gewinnen.',
    stats: [
      { value: '50+', label: 'Realisierte Projekte' },
      { value: '98%', label: 'Kundenzufriedenheit' },
      { value: '10+', label: 'Jahre Gesamterfahrung' },
    ],
    whyUsTag: 'Warum Wir',
    whyUsTitle1: 'Warum Unternehmen in Charleston ',
    whyUsTitle2: 'Belk Digital wählen',
    reasonPrefix: 'Grund',
    whyChoose: [
      {
        title: 'Tiefes Verständnis des lokalen Marktes',
        description: 'Wir kennen die Branchenlandschaft in Charleston (Tourismus, Gastgewerbe, Gesundheit, Immobilien) und schaffen wirksame Strategien.',
      },
      {
        title: 'Lokales SEO für Spitzenplatzierungen',
        description: 'Google Business Profile-Optimierung und lokale Landingpages für beste Auffindbarkeit bei regionalen Suchen.',
      },
      {
        title: 'Performance-orientierte Entwicklung',
        description: 'Jede Website ist optimiert für Core Web Vitals, mobile Ladezeiten und Barrierefreiheit für Top-Google-Rankings.',
      },
      {
        title: 'Transparente, partnerschaftliche Zusammenarbeit',
        description: 'Keine Knebelverträge. Wir bauen langfristige Beziehungen zu zukunftsorientierten Unternehmern auf.',
      },
    ],
    offerTag: 'Unser Angebot',
    offerTitle1: 'Digitale Dienstleistungen für ',
    offerTitle2: 'Unternehmen in Charleston',
    services: [
      { title: 'Individuelles Webdesign & UI/UX', description: 'Konversionsstarke Websites für den regionalen Markt.' },
      { title: 'Website-Relaunch & Optimierung', description: 'Modernisieren Sie Ihre Website für Ladezeiten, SEO und Neukunden.' },
      { title: 'Web- & SaaS-Entwicklung', description: 'Skalierbare Webanwendungen für wachsende Betriebe.' },
      { title: 'Lokales SEO (Charleston, SC)', description: 'Top-Rankings in Google Maps und lokalen Suchanfragen.' },
      { title: 'Digitales Marketing & Wachstum', description: 'PPC, Social Media und Content-Strategien für Zielgruppen in SC.' },
      { title: 'Website-Wartung & Support', description: 'Zuverlässige Betreuung, damit Ihre Website sicher und aktuell bleibt.' },
    ],
    areasTag: 'Einzugsgebiete',
    areasTitle1: 'Stadtteile von Charleston & ',
    areasTitle2: 'Bediente Regionen',
    areasSubtitle: 'Vom historischen Zentrum bis zu den umliegenden Inseln unterstützen wir Unternehmen im gesamten Großraum Charleston.',
    viewServices: 'Dienste anzeigen',
    neighborhoods: [
      { slug: 'downtown', label: 'Downtown Charleston', description: 'Historisches Geschäftszentrum und Gastronomieviertel' },
      { slug: 'mount-pleasant', label: 'Mount Pleasant', description: 'Charlestons am schnellsten wachsender Vorort' },
      { slug: 'north-charleston', label: 'North Charleston', description: 'Handels-, Logistik- und Industriezentrum' },
      { slug: 'west-ashley', label: 'West Ashley', description: 'Einzelhandels-, Medizin- und Wohnquartier' },
      { slug: 'james-island', label: 'James Island', description: 'Enge Gemeinschaft und Kleinunternehmerzentrum' },
      { slug: 'johns-island', label: 'Johns Island', description: 'Landwirtschaft, Agrotourismus und lokale Betriebe' },
      { slug: 'daniel-island', label: 'Daniel Island', description: 'Geplantes Geschäfts- und Wohnviertel' },
      { slug: 'summerville', label: 'Summerville', description: 'Schnell expandierende Region nördlich von Charleston' },
    ],
    workWithTitle1: 'Mit wem wir zusammenarbeiten in ',
    workWithTitle2: 'Charleston, SC',
    industries: [
      'Gastronomie & Hotellerie',
      'Immobilien & Property Management',
      'Gesundheitswesen & Arztpraxen',
      'Kanzleien & Beratung',
      'E-Commerce & Einzelhandel',
      'Tourismus & Reiseunternehmen',
      'Handwerk & Dienstleistungen',
      'Startups & Technologieunternehmen',
    ],
  },
};

export const CharlestonSC = () => {
  const { lang } = useParams();
  const locale = Array.isArray(lang) ? lang[0] : lang ?? 'en';
  const currentLang = CHARLESTON_DATA[locale] ? locale : 'en';
  const data = CHARLESTON_DATA[currentLang];

  return (
    <>
      {/* Hero */}
      <section className="relative w-full flex flex-col justify-end overflow-hidden min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/about-bg.webp"
            alt="Digital Marketing Agency Charleston SC"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(59,130,246,0.12),transparent)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-24 pt-44 flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link
              href={`/${locale}/locations`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase hover:bg-white/[0.12] hover:text-white/80 transition-all"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              {data.allLocations}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">{data.badge}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-sans font-[600] tracking-tight leading-[1.08] text-white text-center w-full max-w-5xl"
          >
            {data.heroTitle1}
            <span className="font-serif italic font-normal">{data.heroTitle2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/55 text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto"
          >
            {data.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all"
            >
              {data.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* About / Commitment */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              borderRadius: '50px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 70%, #000000 100%)',
            }}
          />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="relative z-10 py-16">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-[45%] lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-xs text-white/40 uppercase tracking-[0.3em] font-medium">{data.commitmentTag}</span>
                </div>
                <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] font-sans font-[600] tracking-tight leading-[1.1] text-white">
                  {data.commitmentTitle1}
                  <span className="font-serif italic font-normal">{data.commitmentTitle2}</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-[55%] flex flex-col gap-8 pt-2"
              >
                <div className="w-16 h-[2px] bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full" />
                <p className="text-white/55 text-lg md:text-xl leading-relaxed font-sans">
                  {data.commitmentBody}
                </p>
                <div className="flex gap-10 pt-4">
                  {data.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-2xl md:text-3xl font-sans font-[700] text-white tracking-tight">{stat.value}</span>
                      <span className="text-[11px] text-white/35 uppercase tracking-widest font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-sans font-medium tracking-widest uppercase">
                {data.whyUsTag}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] font-sans font-[600] tracking-tight leading-[1.1] text-white max-w-3xl"
            >
              {data.whyUsTitle1}
              <span className="font-serif italic font-normal">{data.whyUsTitle2}</span>
            </motion.h2>
          </div>

          <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto relative">
              {data.whyChoose.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-16 last:mb-0 group"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 inline-block" />
                    {data.reasonPrefix} {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="relative bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 group-hover:border-white/15 group-hover:bg-white/[0.04]">
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 10% 50%, rgba(99,68,245,0.08), transparent 70%)' }}
                    />
                    <span className="absolute bottom-4 right-6 text-[6rem] font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 select-none pointer-events-none leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400/50 to-purple-500/50 group-hover:w-20 transition-all duration-500 mb-6 rounded-full" />
                    <h3 className="text-xl md:text-2xl font-sans font-[600] text-white tracking-tight mb-3 relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-white/45 text-base leading-relaxed font-sans group-hover:text-white/65 transition-colors duration-500 relative z-10 max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              borderRadius: '50px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 70%, #000000 100%)',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="relative z-10 py-16">
            <div className="flex flex-col items-center text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-sans font-medium tracking-widest uppercase">
                  {data.offerTag}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] font-sans font-[600] tracking-tight leading-[1.1] text-white mb-4 max-w-3xl"
              >
                {data.offerTitle1}
                <span className="font-serif italic font-normal">{data.offerTitle2}</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.services.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative group bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.06), transparent 60%)' }}
                  />
                  <span className="absolute top-6 right-8 text-[3.5rem] font-black text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500 select-none pointer-events-none leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-blue-400/60 mb-5 relative z-10" />
                  <h3 className="text-lg font-sans font-[600] text-white tracking-tight mb-2 relative z-10">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-sans group-hover:text-white/60 transition-colors duration-500 relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/[0.04] blur-[140px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-sans font-medium tracking-widest uppercase">
                {data.areasTag}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] font-sans font-[600] tracking-tight leading-[1.1] text-white max-w-3xl"
            >
              {data.areasTitle1}
              <span className="font-serif italic font-normal">{data.areasTitle2}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="text-white/45 text-base md:text-lg mt-6 max-w-xl"
            >
              {data.areasSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.neighborhoods.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link
                  href={`/${locale}/locations/charleston-sc/${area.slug}`}
                  className="group flex flex-col gap-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400/70 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm tracking-tight group-hover:text-white transition-colors">
                      {area.label}
                    </span>
                  </div>
                  <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/55 transition-colors">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-1 text-blue-400/60 text-xs font-medium mt-auto pt-2 group-hover:text-blue-400 transition-colors">
                    {data.viewServices}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2rem] sm:text-[2.6rem] font-sans font-[600] tracking-tight leading-[1.1] text-white max-w-2xl"
            >
              {data.workWithTitle1}
              <span className="font-serif italic font-normal">{data.workWithTitle2}</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                <span className="text-white/55 text-sm font-sans leading-snug">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};
