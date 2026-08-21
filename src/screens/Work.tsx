"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { Award, Users, Globe, BarChart3, Shield, CheckCircle2, ArrowRight, ChevronRight, Projector as Project, Star, Zap, Monitor, Smartphone, Layout } from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import Image from 'next/image';
import Link from 'next/link';
import MuxPlayer from '@mux/mux-player-react';
import { Counter } from '@/components/ui/counter';

interface CaseStudy {
    subtitle: string;
    title: string;
    videoId?: string;
    image?: string;
    client: string;
    date: string;
    categories: string;
    services: string;
    about: string;
    url?: string;
}

const Work = () => {
    const { language, t, isRTL } = useLanguage();

    const stats = [
        { value: '50+', label: t.hero.stats.projects, icon: Award },
        { value: '300+', label: t.hero.stats.clients, icon: Users },
        { value: '45+', label: t.hero.stats.countries, icon: Globe },
        { value: '98%', label: t.trust.items[1].label, icon: BarChart3 },
    ];

    const caseStudyImages = [
        '/images/projects/project1.webp',
        '/images/projects/project2.webp',
    ];

    const featuredCaseStudies: CaseStudy[] = [
        {
            subtitle: "99Purity Peptides",
            title: "Elevating Research with High-Purity Synthetic Peptides",
            videoId: "02UDvvGgCcwGd01iOE3C4ElNe77bwyNWvkwOc8W3FEvoU",
            client: "99Purity Peptides",
            date: "2023",
            categories: "UI/UX & Photography",
            services: "E-commerce Platform Design",
            about: "99 Purity Peptides operates as a research-focused peptide company that USA laboratories and independent research professionals rely on when sourcing synthetic research peptides. As a trusted peptide supplier and established peptide supplier, USA buyers choose for consistency. We specialise exclusively in laboratory-grade peptides designated for controlled research environments.\n\nOur organisation supports analytical and laboratory research by providing high-purity synthetic research peptides with structured documentation, research classification clarity, and compliance-aligned sourcing practices. Every material offered through our platform is intended strictly for research use only and supplied with defined quality verification standards."
        },

        {
            subtitle: "Belk Body Lab",
            title: "Elite Body Transformations Engineered for Performance",
            videoId: "mk3JhR01n2Eci2RmbfpySn4b1C3JImg7029Y2U01rEMV4s",
            client: "Coach Kyle Belk",
            date: "2024",
            categories: "Health, Fitness & Coaching",
            services: "Fat Loss & Hypertrophy Protocols",
            about: "Belk Body Lab, led by certified personal trainer Kyle Belk, offers elite transformation coaching engineered for performance. With over 7 years of coaching experience and 500+ clients transformed, the focus is on building custom protocols rooted in unique metabolism, schedules, and goals.\n\nThe approach completely rejects cookie-cutter plans. Instead, it provides expert-led, highly customized coaching for both beginners and elite performers, ensuring sustainable fat loss and muscle hypertrophy. With a 98% success rate, Belk Body Lab is trusted by top performers across the US."
        },
        {
            subtitle: "Helix Bio",
            title: "Setting the Gold Standard in Research Peptide Synthesis & E-Commerce",
            videoId: "T00C2xtcVjNBZC8fOs7X01qj3VPUKH349S003yyMURtRFM",
            client: "Helix Bio",
            date: "2024",
            categories: "UI/UX, E-Commerce & Web Development",
            services: "Custom E-Commerce Platform & Catalog",
            about: "Helix Bio operates as a premier USA-based biotechnology and research compound provider dedicated to supplying laboratories and independent research professionals with high-purity synthetic research peptides. Built with high-performance Next.js architecture, the platform features verified HPLC/MS testing documentation, complete COA certification tracking, and an interactive peptide dosage calculator.\n\nOur team engineered a custom e-commerce architecture tailored for high-volume research compound catalogs, optimizing speed, mobile responsiveness, and seamless user experience to establish Helix Bio as a trusted industry leader."
        },
        {
            subtitle: "Velvet Girl Entertainment",
            title: "Premium Event Booking & Entertainment Platform",
            videoId: "kWoQZ5xuj007gQpL7mTnZ01fg1xq20000M5foz6VhHdjax00",
            client: "Velvet Girl Entertainment",
            date: "2024",
            categories: "UI/UX, Booking Platform & Web Development",
            services: "Custom Booking System & Platform Design",
            about: "Velvet Girl Entertainment is a premier nationwide event booking platform specializing in verified entertainment services for private celebrations, VIP gatherings, and corporate events. Built with high-performance modern web architecture, the platform features location-based performer cataloging, online package selection, dynamic scheduling, and encrypted booking requests.\n\nOur team developed an intuitive, mobile-optimized digital experience tailored to streamline booking inquiries, enhance client trust through verified roster management, and deliver robust search functionality across major metropolitan markets."
        },
        {
            subtitle: "99 Purity Wholesale",
            title: "B2B Wholesale Research Peptides & Bulk Supply Platform",
            videoId: "bznbYfOZVLopLBJVQnIBYVnNyNqLhGqe01lWUAFLd00og",
            client: "99 Purity Wholesale",
            date: "2024",
            categories: "UI/UX, B2B E-Commerce & Web Development",
            services: "Wholesale Platform Design & Bulk Supply System",
            about: "99 Purity Wholesale operates as a specialized B2B distributor providing compounding pharmacies, wellness clinics, and licensed research institutions across the United States with high-purity research compounds.\n\nBelk Digital engineered a robust, high-performance B2B e-commerce infrastructure tailored for high-volume research compound catalogs. Built on a scalable Next.js framework, the platform features batch-level Certificate of Analysis (COA) verification tracking, multi-currency localization, an institutional peptide reconstitution calculator, and automated tier-based bulk pricing workflows.\n\nOur team structured an intuitive, mobile-optimized digital experience designed to streamline procurement, automate institutional quote requests, and ensure seamless navigation for verified B2B buyers."
        }
    ];

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[80vh] flex flex-col justify-end">
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

                <div className="container-wide relative z-20">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-sans font-medium tracking-widest uppercase">
                                {t.work.badge}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-sans font-[600] tracking-tight leading-[1.1] mb-12 text-white"
                        >
                            {t.work.title}{' '}
                            <span className="font-serif italic font-normal text-white/90">
                                {t.work.titleHighlight}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-sans mb-16"
                        >
                            {t.work.subtitle}
                        </motion.p>

                        {/* Glassy Stats row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="bg-white/[0.03] backdrop-blur-md rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-all group"
                                >
                                    <stat.icon className="w-10 h-10 text-white/40 mb-6 mx-auto group-hover:scale-110 group-hover:text-white transition-all" />
                                    <div className="text-4xl md:text-5xl font-sans font-bold mb-2 tracking-tight text-white">
                                        <Counter value={stat.value} />
                                    </div>
                                    <div className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Case Studies */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={cn("text-center max-w-3xl mx-auto mb-24", isRTL && "text-right")}
                    >
                        <span className="text-xs font-bold tracking-[0.5em] uppercase text-white/40 mb-6 block">
                            {t.work.caseStudies?.showcaseBadge || 'Showcase'}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-sans font-[600] text-white">
                            {t.work.caseStudies?.title || 'Featured Projects'}
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3 mt-12">
                            {(t.work.caseStudies?.filters || []).map((filter: string, index: number) => (
                                <span key={index} className="px-6 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all cursor-default">
                                    {filter}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Redesigned Single Case Study Layout */}
                    <div className="flex flex-col gap-32 max-w-7xl mx-auto">
                        {(t.work.caseStudies?.items || featuredCaseStudies).map((caseStudy: CaseStudy, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col"
                            >
                                <div className="mb-8">
                                    {caseStudy.url ? (
                                        <Link href={caseStudy.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 group">
                                            <p className="text-white/80 font-medium font-sans mb-4 group-hover:text-white transition-colors underline decoration-white/20 underline-offset-4 group-hover:decoration-white/100">{caseStudy.subtitle}</p>
                                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors mb-4" />
                                        </Link>
                                    ) : (
                                        <p className="text-white/80 font-medium font-sans mb-4">{caseStudy.subtitle}</p>
                                    )}
                                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-sans font-[600] text-white max-w-4xl tracking-tight leading-[1.1]">
                                        {caseStudy.title}
                                    </h3>
                                </div>

                                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[24px] md:rounded-[40px] overflow-hidden mb-12 bg-white/5 border border-white/10">
                                    {caseStudy.videoId ? (
                                        <MuxPlayer
                                            playbackId={caseStudy.videoId}
                                            poster={`https://image.mux.com/${caseStudy.videoId}/thumbnail.webp?time=0`}
                                            muted={true}
                                            autoPlay={false}
                                            streamType="on-demand"
                                            className="w-full h-full object-cover"
                                            style={{ height: '100%', maxWidth: '100%' }}
                                        />
                                    ) : caseStudy.image ? (
                                        <Image
                                            src={caseStudy.image}
                                            alt={caseStudy.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-12">
                                    <div>
                                        <h4 className="text-white font-[600] font-sans mb-2 text-lg">{t.work.caseStudies?.labels?.client || 'Client Name'}</h4>
                                        <p className="text-white/60 font-sans">{caseStudy.client}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-[600] font-sans mb-2 text-lg">{t.work.caseStudies?.labels?.date || 'Date'}</h4>
                                        <p className="text-white/60 font-sans">{caseStudy.date}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-[600] font-sans mb-2 text-lg">{t.work.caseStudies?.labels?.categories || 'Categories'}</h4>
                                        <p className="text-white/60 font-sans">{caseStudy.categories}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-[600] font-sans mb-2 text-lg">{t.work.caseStudies?.labels?.services || 'Services'}</h4>
                                        <p className="text-white/60 font-sans">{caseStudy.services}</p>
                                    </div>
                                </div>

                                <div className="max-w-4xl">
                                    <h4 className="text-2xl font-[600] text-white font-sans mb-6">{t.work.caseStudies?.labels?.about || 'About'}</h4>
                                    <div className="space-y-6">
                                        {caseStudy.about.split('\n\n').map((paragraph: string, pIndex: number) => (
                                            <p key={pIndex} className="text-white/70 text-lg leading-relaxed font-sans">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title={t.work.cta?.title || "Ready to Build Results Like These for Your Business?"}
                subtitle={t.work.cta?.subtitle || "Let’s discuss how we can deliver measurable growth for your digital initiatives."}
            />
        </div>
    );
};

export default Work;
