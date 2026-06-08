"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import { useParams } from 'next/navigation';

export interface NeighborhoodData {
  name: string;
  state: string;
  slug: string;
  headline: string;
  intro: string;
  about: string;
  industries: string[];
  keywords: string[];
}

const NEIGHBORHOOD_MAP: Record<string, NeighborhoodData> = {
  'downtown': {
    name: 'Downtown Charleston',
    state: 'SC',
    slug: 'downtown',
    headline: 'Web Design & Digital Marketing in Downtown Charleston, SC',
    intro: 'Belk Digital helps Downtown Charleston businesses grow their online presence with high-performance websites, local SEO, and targeted digital marketing that attracts customers on the peninsula and beyond.',
    about: 'Downtown Charleston is the heart of the Lowcountry—packed with restaurants, boutique hotels, law firms, retail shops, and historic attractions. We build digital experiences that match the sophistication of this iconic neighborhood, helping you stand out in one of South Carolina\'s most competitive local markets.',
    industries: ['Restaurants & Fine Dining', 'Boutique Hotels & B&Bs', 'Law Firms & Professional Services', 'Retail & Boutique Shops', 'Art Galleries & Tourism', 'Event Venues & Catering'],
    keywords: ['digital marketing downtown charleston sc', 'web design downtown charleston', 'local seo charleston peninsula', 'website design historic charleston'],
  },
  'mount-pleasant': {
    name: 'Mount Pleasant',
    state: 'SC',
    slug: 'mount-pleasant',
    headline: 'Web Design & Digital Marketing in Mount Pleasant, SC',
    intro: "Belk Digital serves Mount Pleasant businesses with modern web design, local SEO, and digital marketing strategies that help you capture customers in Charleston's fastest-growing suburb.",
    about: "Mount Pleasant is one of the fastest-growing communities in the Southeast, with a booming population, strong retail corridors on Highway 17, and a thriving healthcare and professional services sector. We help Mount Pleasant businesses compete online and win more local customers through targeted SEO and conversion-optimized websites.",
    industries: ['Healthcare & Medical Practices', 'Real Estate & Home Services', 'Restaurants & Food & Beverage', 'Retail & Shopping Centers', 'Financial & Professional Services', 'Fitness & Wellness'],
    keywords: ['digital marketing mount pleasant sc', 'web design mount pleasant south carolina', 'local seo mount pleasant sc', 'website design mount pleasant'],
  },
  'north-charleston': {
    name: 'North Charleston',
    state: 'SC',
    slug: 'north-charleston',
    headline: 'Web Design & Digital Marketing in North Charleston, SC',
    intro: 'Belk Digital helps North Charleston businesses build powerful online presences with custom web design, local SEO, and digital marketing that drives real results in one of South Carolina\'s largest cities.',
    about: "North Charleston is a major commerce and logistics hub—home to Boeing, the former Charleston Naval Complex, the Tanger Outlets, and hundreds of small-to-mid-size businesses. Whether you're in manufacturing, logistics, retail, or services, we help you reach more customers online with websites and SEO built for North Charleston's unique market.",
    industries: ['Manufacturing & Industrial', 'Logistics & Distribution', 'Retail & Commercial', 'Automotive Services', 'Restaurants & Hospitality', 'Healthcare & Urgent Care'],
    keywords: ['digital marketing north charleston sc', 'web design north charleston south carolina', 'local seo north charleston', 'website north charleston sc'],
  },
  'west-ashley': {
    name: 'West Ashley',
    state: 'SC',
    slug: 'west-ashley',
    headline: 'Web Design & Digital Marketing in West Ashley, SC',
    intro: 'Belk Digital helps West Ashley businesses grow online with custom websites, local SEO, and digital marketing strategies tailored to Charleston\'s western suburbs.',
    about: "West Ashley is one of Charleston's largest residential and commercial areas, stretching along Highway 17 south of the Ashley River. With major retail centers, medical offices, restaurants, and service businesses, it's a competitive market. We help West Ashley businesses rank higher in local search and convert more website visitors into customers.",
    industries: ['Healthcare & Medical Offices', 'Home Services & Contractors', 'Restaurants & Cafes', 'Retail & Shopping', 'Real Estate', 'Fitness & Personal Care'],
    keywords: ['digital marketing west ashley sc', 'web design west ashley charleston', 'local seo west ashley', 'website design west ashley sc'],
  },
  'james-island': {
    name: 'James Island',
    state: 'SC',
    slug: 'james-island',
    headline: 'Web Design & Digital Marketing in James Island, SC',
    intro: 'Belk Digital helps James Island businesses stand out online with professionally designed websites, local SEO, and digital marketing that connects you with customers across the Charleston area.',
    about: "James Island is a close-knit community just minutes from downtown Charleston, with a growing mix of local restaurants, small businesses, healthcare providers, and home service companies. We help James Island businesses build credible, high-converting digital presences that compete with larger Charleston brands.",
    industries: ['Restaurants & Local Eateries', 'Home Services & Contractors', 'Healthcare & Wellness', 'Retail & Specialty Shops', 'Personal Care Services', 'Real Estate'],
    keywords: ['digital marketing james island sc', 'web design james island charleston', 'local seo james island sc', 'website design james island'],
  },
  'johns-island': {
    name: "Johns Island",
    state: 'SC',
    slug: 'johns-island',
    headline: "Web Design & Digital Marketing in Johns Island, SC",
    intro: "Belk Digital helps Johns Island businesses grow their digital presence with custom websites, local SEO, and marketing strategies that reflect the character of the Lowcountry's largest island.",
    about: "Johns Island is steeped in Lowcountry history and is experiencing rapid growth as Charleston expands outward. From agri-tourism and farm-to-table restaurants to new residential developments and service businesses, Johns Island's business community is diverse and growing. We help local businesses here build digital foundations that attract customers and tell their unique story.",
    industries: ['Agri-Tourism & Farms', 'Restaurants & Food & Drink', 'Home Services & Builders', 'Wellness & Outdoor Recreation', 'Real Estate & Development', 'Local Retail'],
    keywords: ["digital marketing johns island sc", "web design johns island charleston", "local seo johns island sc", "website design johns island"],
  },
  'daniel-island': {
    name: 'Daniel Island',
    state: 'SC',
    slug: 'daniel-island',
    headline: 'Web Design & Digital Marketing in Daniel Island, SC',
    intro: 'Belk Digital serves Daniel Island businesses and professionals with polished web design, local SEO, and digital marketing that aligns with the premium character of this master-planned community.',
    about: "Daniel Island is one of the most prestigious master-planned communities on the East Coast, combining luxury residential neighborhoods with a growing corporate and retail district. Businesses here need digital presences that match the sophistication of their surroundings. We deliver high-end websites and results-focused SEO for Daniel Island professionals and businesses.",
    industries: ['Professional & Financial Services', 'Healthcare & Concierge Medicine', 'Real Estate & Property Management', 'Corporate Offices & Consulting', 'Restaurants & Fine Dining', 'Fitness & Lifestyle'],
    keywords: ['digital marketing daniel island sc', 'web design daniel island charleston', 'local seo daniel island', 'website design daniel island sc'],
  },
  'summerville': {
    name: 'Summerville',
    state: 'SC',
    slug: 'summerville',
    headline: 'Web Design & Digital Marketing in Summerville, SC',
    intro: 'Belk Digital helps Summerville, SC businesses grow online with custom websites, local SEO, and digital marketing that connects you with the area\'s rapidly expanding population.',
    about: "Summerville is one of the fastest-growing towns in South Carolina, with new residents and businesses arriving every year. Located just 25 miles northwest of Charleston, Summerville's economy spans retail, healthcare, restaurants, home services, and professional services. We help Summerville businesses capture more of this growing market with effective websites and local SEO strategies.",
    industries: ['Home Services & Contractors', 'Healthcare & Medical Practices', 'Restaurants & Food Service', 'Retail & Shopping', 'Real Estate & Mortgage', 'Education & Childcare'],
    keywords: ['digital marketing summerville sc', 'web design summerville south carolina', 'local seo summerville sc', 'website design summerville'],
  },
};

const SERVICES = [
  'Custom Web Design & UI/UX',
  'Website Redesign & Optimization',
  'Web & SaaS Development',
  'Local SEO (Charleston, SC)',
  'Digital Marketing & Growth',
  'Website Maintenance & Support',
];

export const CharlestonNeighborhood = () => {
  const { lang, neighborhood } = useParams();
  const locale = Array.isArray(lang) ? lang[0] : lang ?? 'en';
  const slug = Array.isArray(neighborhood) ? neighborhood[0] : neighborhood ?? '';

  const data = NEIGHBORHOOD_MAP[slug];

  if (!data) return null;

  return (
    <>
      {/* Hero */}
      <section className="relative w-full flex flex-col justify-end overflow-hidden min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/about-bg.webp"
            alt={data.headline}
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
            className="flex items-center gap-3 flex-wrap justify-center"
          >
            <Link
              href={`/${locale}/locations/charleston-sc`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase hover:bg-white/[0.12] hover:text-white/80 transition-all"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Charleston, SC
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                {data.name}, {data.state}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.8rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-sans font-[600] tracking-tight leading-[1.08] text-white text-center w-full max-w-5xl"
          >
            {(() => {
              const words = data.headline.split(' ');
              const italic = words.slice(-3).join(' ');
              const rest = words.slice(0, -3).join(' ');
              return (
                <>
                  {rest}{' '}
                  <span className="font-serif italic font-normal">{italic}</span>
                </>
              );
            })()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/55 text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto"
          >
            {data.intro}
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
              Get a Free Consultation
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

      {/* About this area */}
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
                  <span className="text-xs text-white/40 uppercase tracking-[0.3em] font-medium">Local Expertise</span>
                </div>
                <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] font-sans font-[600] tracking-tight leading-[1.1] text-white">
                  Serving{' '}
                  <span className="font-serif italic font-normal">{data.name}</span>
                  {' '}Businesses
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
                <p className="text-white/55 text-lg md:text-xl leading-relaxed font-sans">{data.about}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-sans font-medium tracking-widest uppercase">
                What We Offer
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] font-sans font-[600] tracking-tight leading-[1.1] text-white max-w-3xl"
            >
              Digital Services in{' '}
              <span className="font-serif italic font-normal">{data.name}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/12 hover:bg-white/[0.04] transition-all duration-400"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm font-sans leading-snug group-hover:text-white/85 transition-colors">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2rem] sm:text-[2.6rem] font-sans font-[600] tracking-tight leading-[1.1] text-white max-w-2xl"
            >
              Industries We Serve in{' '}
              <span className="font-serif italic font-normal">{data.name}</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                <span className="text-white/55 text-sm font-sans">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Charleston hub */}
      <section className="py-16 bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.06] pt-16">
          <div>
            <p className="text-white/35 text-sm mb-1">Part of our Charleston, SC coverage</p>
            <p className="text-white/60 text-base font-sans">
              We serve all of Charleston metro — not just {data.name}.
            </p>
          </div>
          <Link
            href={`/${locale}/locations/charleston-sc`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm font-medium hover:bg-white/[0.10] hover:text-white transition-all"
          >
            View All Charleston Areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
};
