"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight, Check, X, Minus, Zap, Shield, Users,
  BarChart3, Brain, Target, CheckCircle2, FlaskConical,
  Stethoscope, Layers, Globe
} from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { cn } from '@/lib/utils';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const OFFERING_TABS = ['RUO Peptide Website', 'Telehealth Platform', 'Combined Package'];

const RUO_FEATURES = [
  { icon: <Zap className="w-5 h-5 text-blue-400" />, title: 'Custom Next.js Build', desc: 'Hand-coded on an enterprise architecture — zero templates, lightning-fast rendering, fully mobile-responsive, and structured for long-term maintainability.' },
  { icon: <Target className="w-5 h-5 text-blue-400" />, title: 'Premium UI / UX', desc: 'A luxury, research-focused interface with a high-conversion layout and a customer journey optimized from first click to checkout.' },
  { icon: <Layers className="w-5 h-5 text-blue-400" />, title: 'Complete eCommerce', desc: 'Product management, secure checkout, user accounts, full order management, and a polished customer dashboard.' },
  { icon: <Brain className="w-5 h-5 text-blue-400" />, title: 'Included Assets', desc: 'All product images, lifestyle photography, icons, graphics, banners, and brand visuals are produced and delivered within the project.' },
];

const RUO_CHECKLIST = [
  'Affiliate Program', 'Affiliate Dashboard', 'Custom Coupon System',
  'Verified Discount Code Verification', 'Loyalty-Ready Architecture', 'Referral Tracking',
  'Product Comparison', 'Wishlist', 'Product Filters',
  'Related Products', 'Frequently Bought Together', 'Advanced Search',
  'Peptide Calculator', 'Dosage Calculator', 'Reconstitution Calculator',
  'Multi-Language Support', 'Admin Dashboard', 'Analytics Integration',
  'Email Automation Ready', 'Review System', 'Customer Accounts',
  'Integrated Blog', 'FAQ System', 'SEO-Ready Architecture',
  'AI-Ready Architecture', 'Future Scalability',
];

const RUO_SEO_TAGS = [
  'Basic SEO', 'Basic GEO', 'Basic AEO', 'GA4 Setup',
  'Search Console', 'Indexing', 'Schema Markup',
  'Performance Optimization', 'Technical SEO Foundation',
];

const COA_TIERS = [
  { range: '11 – 25 Products', price: '$175', unit: 'USD / Product' },
  { range: '26 – 50 Products', price: '$150', unit: 'USD / Product' },
  { range: '50+ Products', price: '$125', unit: 'USD / Product', best: true },
];

const GOOGLE_ADS_CHECKLIST = [
  'Campaign Setup & Structure', 'Keyword Research', 'Audience Targeting',
  'Landing Page Optimization', 'Performance Tracking', 'Conversion Optimization',
  'Budget Management', 'Continuous Improvements', 'Monthly Reporting', 'Compliance-Aware Optimization',
];

const TELEHEALTH_FEATURES = [
  { icon: <Stethoscope className="w-5 h-5 text-blue-400" />, title: 'Patient-First Experience', desc: 'An intuitive, responsive interface designed around the patient journey, with secure authentication throughout.' },
  { icon: <BarChart3 className="w-5 h-5 text-blue-400" />, title: 'Doctor & Admin Dashboards', desc: 'Dedicated dashboards for clinicians and administrators with appointment and order management built in.' },
  { icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />, title: 'Appointment & Prescription Flow', desc: 'Structured appointment workflows with prescription-workflow support and CRM-ready architecture.' },
  { icon: <Globe className="w-5 h-5 text-blue-400" />, title: 'API Integration Layer', desc: 'Built to connect with third-party services, with performance optimization and analytics setup included.' },
];

const TELEHEALTH_TAGS = [
  'SEO-Ready', 'GEO-Ready', 'AEO-Ready', 'Scalable Infrastructure', 'Analytics Setup', 'Performance Optimized',
];

const COMPLIANCE_CHECKLIST = [
  'HIPAA-Aware Implementation Support', 'Compliance-Friendly Architecture',
  'Documentation Structure', 'Operational Workflows', 'Privacy-First Design',
  'Consent Workflows', 'Legal Page Integration', 'Patient Journey Optimization', 'Administrative Features',
];

const COMBINED_FEATURES = [
  { icon: <FlaskConical className="w-5 h-5 text-blue-400" />, title: 'RUO Peptide Storefront', desc: 'The complete custom Next.js retail build — commerce, calculators, affiliate system, SEO foundation, and included brand assets.' },
  { icon: <Stethoscope className="w-5 h-5 text-blue-400" />, title: 'Telehealth Platform', desc: 'Patient, doctor, and admin dashboards with appointment and prescription workflows on scalable infrastructure.' },
  { icon: <Shield className="w-5 h-5 text-blue-400" />, title: 'USA Peptide Supply', desc: 'We supply your peptides directly — 503A & 503B verified, USA-manufactured — so sourcing and storefront are one story.' },
  { icon: <Users className="w-5 h-5 text-blue-400" />, title: 'One Unified Team', desc: 'Shared strategy, creative, support, and advertising across both platforms — with add-ons scoped to your goals.' },
];

const COMBINED_TAGS = [
  'RUO Retail Website', 'Telehealth Platform', 'Compliance Script', 'COA Program',
  'Peptide Supply (503A/503B)', 'Managed Support', 'Advertising & Creative', 'SEO · GEO · AEO', 'Lead Generation',
];

type CellValue = boolean | string;

interface ComparisonRow {
  feature: string;
  ruo: CellValue;
  telehealth: CellValue;
  combined: CellValue;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Custom Next.js Build', ruo: true, telehealth: true, combined: true },
  { feature: 'eCommerce Storefront', ruo: true, telehealth: false, combined: true },
  { feature: 'Peptide Calculators & Affiliate System', ruo: true, telehealth: false, combined: true },
  { feature: 'USA Peptide Supply (503A / 503B)', ruo: true, telehealth: false, combined: true },
  { feature: 'COA Program (tiered)', ruo: 'Add-on', telehealth: false, combined: true },
  { feature: 'Patient / Doctor / Admin Dashboards', ruo: false, telehealth: true, combined: true },
  { feature: 'Appointment & Prescription Workflows', ruo: false, telehealth: true, combined: true },
  { feature: 'Compliance Script (4–6 wks)', ruo: false, telehealth: 'Add-on', combined: true },
  { feature: 'Managed Customer Support', ruo: false, telehealth: 'Custom', combined: 'Custom' },
  { feature: 'Advertising & Creative Dept.', ruo: 'Google Ads', telehealth: 'Custom', combined: 'Custom' },
  { feature: 'SEO · GEO · AEO Foundation', ruo: true, telehealth: true, combined: true },
  { feature: 'Included Brand Assets', ruo: true, telehealth: true, combined: true },
  { feature: 'Single Unified Team', ruo: false, telehealth: false, combined: true },
  { feature: 'Package Pricing', ruo: false, telehealth: false, combined: 'Preferential' },
];

const AI_LEAD_FEATURES = [
  { icon: <Target className="w-5 h-5 text-blue-400" />, title: 'High-Intent Acquisition', desc: 'Custom-built systems that surface high-intent leads through multi-channel outreach.' },
  { icon: <Brain className="w-5 h-5 text-blue-400" />, title: 'AI-Powered Qualification', desc: 'Automated scoring and nurturing that keeps your pipeline warm and prioritized.' },
  { icon: <Layers className="w-5 h-5 text-blue-400" />, title: 'CRM & Funnel Integration', desc: 'Landing page funnels and email automation wired directly into your CRM.' },
  { icon: <BarChart3 className="w-5 h-5 text-blue-400" />, title: 'Analytics & Optimization', desc: 'Continuous measurement and iteration to improve pipeline quality over time.' },
];

const RETAINER_TIERS = [
  {
    tier: 'Tier 03',
    name: 'SEO Essentials',
    price: '$750',
    period: '/ mo',
    desc: 'Foundational search coverage for brands establishing momentum.',
    featured: false,
    features: [
      { text: 'SEO · GEO · AEO', on: true },
      { text: 'Technical SEO', on: true },
      { text: 'Keyword Research', on: true },
      { text: 'Content Recommendations', on: true },
      { text: '2 Blogs / Month', on: true },
      { text: 'Schema Markup', on: true },
      { text: 'Monthly Reporting', on: true },
      { text: 'Google Search Console', on: true },
      { text: 'GA4 Monitoring', on: true },
      { text: 'Website Maintenance', on: false },
      { text: 'Development Support', on: false },
    ],
  },
  {
    tier: 'Tier 02',
    name: 'Business Growth',
    price: '$1,000',
    period: '/ mo',
    desc: 'Everything a growing business needs to accelerate across search.',
    featured: false,
    features: [
      { text: 'Advanced SEO · GEO · AEO', on: true },
      { text: 'AI Search Optimization', on: true },
      { text: '4–5 Blogs / Month', on: true },
      { text: 'Keyword Research', on: true },
      { text: 'Content Optimization', on: true },
      { text: 'Internal Linking', on: true },
      { text: 'Schema Markup', on: true },
      { text: 'Performance Optimization', on: true },
      { text: 'Maintenance Included', on: true },
      { text: 'Development Support Included', on: true },
      { text: 'Monthly Reports + Strategy Call', on: true },
      { text: 'Priority Ticket Support', on: true },
    ],
  },
  {
    tier: 'Tier 01',
    name: 'Enterprise Growth',
    price: '$1,500',
    period: '/ mo',
    desc: 'Our premium, everything-included program for market leaders.',
    featured: true,
    features: [
      { text: 'Technical + Enterprise SEO', on: true },
      { text: 'GEO · AEO · Entity Optimization', on: true },
      { text: 'Google AI Overviews Optimization', on: true },
      { text: 'ChatGPT · Claude · Gemini · Perplexity', on: true },
      { text: 'Content Strategy · 8–10 Blogs', on: true },
      { text: 'Internal Linking · Schema', on: true },
      { text: 'Core Web Vitals · Monitoring', on: true },
      { text: 'Competitor Analysis', on: true },
      { text: 'Monthly Reporting + Strategy Meetings', on: true },
      { text: 'Priority Support', on: true },
      { text: 'Unlimited Maintenance', on: true },
      { text: 'Unlimited Dev Support*', on: true },
    ],
  },
];

interface RetainerCompRow {
  feature: string;
  ess: CellValue;
  biz: CellValue;
  ent: CellValue;
}

const RETAINER_COMP: RetainerCompRow[] = [
  { feature: 'SEO · GEO · AEO', ess: true, biz: true, ent: true },
  { feature: 'Technical SEO', ess: true, biz: true, ent: true },
  { feature: 'Enterprise SEO', ess: false, biz: false, ent: true },
  { feature: 'AI Search Optimization', ess: false, biz: true, ent: true },
  { feature: 'Google AI Overviews', ess: false, biz: true, ent: true },
  { feature: 'ChatGPT / Claude / Gemini / Perplexity', ess: false, biz: 'Partial', ent: '✓ Full' },
  { feature: 'Entity Optimization', ess: false, biz: false, ent: true },
  { feature: 'Blogs per Month', ess: '2', biz: '4–5', ent: '8–10' },
  { feature: 'Keyword Research', ess: true, biz: true, ent: true },
  { feature: 'Internal Linking & Schema', ess: 'Schema', biz: true, ent: true },
  { feature: 'Core Web Vitals', ess: false, biz: false, ent: true },
  { feature: 'Competitor Analysis', ess: false, biz: false, ent: true },
  { feature: 'Website Maintenance', ess: false, biz: true, ent: 'Unlimited' },
  { feature: 'Development Support', ess: '$40/hr', biz: true, ent: 'Unlimited*' },
  { feature: 'Strategy Meetings', ess: false, biz: 'Call', ent: true },
  { feature: 'Support Level', ess: 'Standard', biz: 'Priority Ticket', ent: 'Priority' },
  { feature: 'Monthly Reporting', ess: true, biz: true, ent: true },
];

const WHY_ITEMS = [
  { n: '01', title: 'Custom Development', desc: 'Every line written for your business — never a template, never a compromise.' },
  { n: '02', title: 'Performance First', desc: 'Speed is a feature. We build for instant loads and flawless Core Web Vitals.' },
  { n: '03', title: 'AI-Ready Websites', desc: 'Architected to be found and cited across the AI answer engines, not just Google.' },
  { n: '04', title: 'SEO · GEO · AEO Experts', desc: 'Specialists across traditional, generative, and answer-engine optimization.' },
  { n: '05', title: 'Scalable Architecture', desc: 'Systems that grow with your catalog, traffic, and roadmap without a rebuild.' },
  { n: '06', title: 'Dedicated Team', desc: 'A committed team that knows your business — not a rotating ticket queue.' },
  { n: '07', title: 'Long-Term Partnership', desc: 'We invest in outcomes over time, not one-off deliverables.' },
  { n: '08', title: 'Transparent Communication', desc: 'Clear reporting and honest counsel at every stage of the engagement.' },
  { n: '09', title: 'Future-Proof Technology', desc: 'Premium design on a modern stack, ready for whatever comes next.' },
];

const PROCESS_STEPS = [
  { title: 'Discovery & Planning', desc: 'We map your goals, market, catalog, and constraints into a clear project blueprint.' },
  { title: 'UI / UX Strategy', desc: 'We design the interface and customer journey around conversion and credibility.' },
  { title: 'Development', desc: 'Custom engineering on a modern, scalable Next.js foundation.' },
  { title: 'Content Integration', desc: 'Products, copy, assets, and media brought together into a cohesive experience.' },
  { title: 'SEO Foundation', desc: 'Technical SEO, schema, GEO, and AEO wired in from day one.' },
  { title: 'Testing', desc: 'Rigorous QA across devices, flows, and performance benchmarks.' },
  { title: 'Launch', desc: 'A controlled, confident release with monitoring in place.' },
  { title: 'Ongoing Growth', desc: 'Continuous optimization, content, and development through our retainers.' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-sans font-medium tracking-widest uppercase">
      {children}
    </span>
  );
}

function SectionHead({ badge, title, lead, center }: { badge: string; title: React.ReactNode; lead?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-16", center && "text-center flex flex-col items-center")}
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2 className={cn(
        "text-[1.9rem] sm:text-[2.8rem] md:text-[3.6rem] font-sans font-[600] tracking-tight leading-[1.1] text-white mt-6",
        center ? "max-w-3xl" : "max-w-2xl"
      )}>
        {title}
      </h2>
      {lead && (
        <p className={cn("text-white/50 text-lg leading-relaxed mt-5", center ? "max-w-2xl" : "max-w-xl")}>
          {lead}
        </p>
      )}
    </motion.div>
  );
}

function FeatureCards({ items }: { items: { icon: React.ReactNode; title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.55 }}
          className="group bg-white/[0.02] border border-white/[0.07] rounded-3xl p-7 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400"
        >
          <div className="mb-4">{item.icon}</div>
          <h4 className="text-white font-sans font-[600] text-base mb-2">{item.title}</h4>
          <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs font-sans">
      {children}
    </span>
  );
}

function PriceTag({ amount, note }: { amount: string; note: string }) {
  return (
    <div className="flex-shrink-0 px-6 py-4 bg-white/[0.03] border border-white/[0.10] rounded-2xl relative overflow-hidden">
      <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-blue-400/60 rounded-r" />
      <span className="block text-[2rem] font-sans font-[700] text-white leading-none">{amount}</span>
      <span className="block text-[10px] font-sans font-medium tracking-widest text-white/35 uppercase mt-2">{note}</span>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-sans font-[600] tracking-[0.25em] uppercase text-blue-400/80 mt-8 mb-4">
      {children}
    </p>
  );
}

function ChecklistGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.06]">
          <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span className="text-white/60 text-sm">{item}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mt-6">
      <div className="w-1 self-stretch bg-blue-400/40 rounded-full flex-shrink-0" />
      <div className="text-white/50 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function CompCell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) return (
    <td className={cn("text-center py-3.5 px-4", highlight && "bg-blue-500/[0.05]")}>
      <Check className="w-4 h-4 text-blue-400 mx-auto" />
    </td>
  );
  if (value === false) return (
    <td className={cn("text-center py-3.5 px-4", highlight && "bg-blue-500/[0.05]")}>
      <Minus className="w-4 h-4 text-white/20 mx-auto" />
    </td>
  );
  return (
    <td className={cn("text-center py-3.5 px-4 text-xs text-white/55 font-sans", highlight && "bg-blue-500/[0.05]")}>
      {value}
    </td>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export const PeptideProposal = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { lang } = useParams();
  const locale = Array.isArray(lang) ? lang[0] : lang ?? 'en';

  return (
    <div className="bg-black min-h-screen text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full flex flex-col justify-end overflow-hidden min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/about-bg.webp"
            alt="Belk Digital × 99 Purity Peptides Proposal"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_65%_30%,rgba(59,130,246,0.10),transparent)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-24 pt-40">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-end">

            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-white/50 text-[10px] font-sans font-medium tracking-widest uppercase">
                  Growth Proposal · 2026
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
              </div>

              <h1 className="text-[2.2rem] sm:text-[3.4rem] md:text-[4.8rem] lg:text-[5.5rem] font-sans font-[600] tracking-tight leading-[1.06] text-white">
                Belk Digital{' '}
                <span className="text-white/30">×</span>{' '}
                <span className="font-serif italic font-normal">99 Purity Peptides</span>
              </h1>

              <p className="text-white/45 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
                We help peptide and telehealth businesses build, scale, and dominate — through custom engineering,
                AI-first search optimization, disciplined marketing, and long-term growth partnership.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white/50 text-xs font-sans backdrop-blur-sm">
                  <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
                  Research Use Only · Compliance-Aware
                </span>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all"
                >
                  Start the Conversation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right — meta */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex border-l border-white/[0.10] pl-8 flex-col gap-6"
            >
              {[
                { k: 'Prepared By', v: 'Belk Digital' },
                { k: 'In Partnership With', v: '99 Purity Peptides' },
                { k: 'Website', v: 'belkdigital.com', href: 'https://belkdigital.com' },
                { k: 'Engagement', v: 'Build · Optimize · Scale' },
              ].map(({ k, v, href }) => (
                <div key={k}>
                  <p className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-white/25 mb-1">{k}</p>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm font-sans font-medium hover:underline">{v}</a>
                    : <p className="text-white text-sm font-sans font-medium">{v}</p>
                  }
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── INTRODUCTION ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] blur-[140px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-[42%] lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-xs text-white/40 uppercase tracking-[0.3em] font-medium">Introduction</span>
              </div>
              <h2 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-sans font-[600] tracking-tight leading-[1.1] text-white">
                We don't build templates. We build businesses{' '}
                <span className="font-serif italic font-normal">that scale.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-[58%] pt-2 flex flex-col gap-6"
            >
              <div className="w-14 h-[2px] bg-gradient-to-r from-blue-400/60 to-blue-600/30 rounded-full" />
              <p className="text-white/55 text-lg leading-relaxed">
                Belk Digital designs and engineers custom digital ecosystems for peptide retailers, telehealth companies,
                research laboratories, and modern healthcare brands. Every website we ship is coded from the ground up —
                no drag-and-drop shortcuts, no off-the-shelf themes.
              </p>
              <p className="text-white/40 text-base leading-relaxed">
                The result is a platform that loads instantly, ranks across both traditional and AI-driven search, and is
                architected to grow with your catalog, your traffic, and your ambition. This proposal outlines a complete
                engagement: from your storefront and telehealth infrastructure to the marketing and search programs that
                compound its value month after month.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/[0.04] blur-[130px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

          <SectionHead
            badge="Core Offerings"
            title={<>Three ways to build <span className="font-serif italic font-normal">with us.</span></>}
            lead="Launch a research storefront, stand up a full telehealth operation, or combine both into one engineered ecosystem."
          />

          {/* Tab bar */}
          <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl mb-10 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            {OFFERING_TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-sans font-medium transition-all duration-300",
                  activeTab === i
                    ? "bg-white text-black shadow-sm"
                    : "text-white/45 hover:text-white/70"
                )}
              >
                <span className="text-[10px] opacity-60 mr-1.5">{String(i + 1).padStart(2, '0')} ·</span>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">
            {/* ── PANEL 0: RUO ── */}
            {activeTab === 0 && (
              <motion.div
                key="ruo"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-2">Offering 01</p>
                    <h3 className="text-2xl md:text-3xl font-sans font-[600] text-white">Research Peptide (RUO) Retail Website</h3>
                  </div>
                  <PriceTag amount="$4,000" note="USD · One-Time Development" />
                </div>
                <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-4">
                  A conversion-focused, research-grade storefront engineered on a fully custom Next.js foundation.
                  Fast, credible, and built to sell — with the advanced commerce systems your operation actually needs.
                </p>

                {/* Supplier badge */}
                <div className="flex flex-col sm:flex-row gap-5 items-start bg-blue-500/[0.06] border border-blue-400/[0.20] rounded-2xl p-6 mb-2">
                  <div className="flex gap-2 flex-wrap flex-shrink-0">
                    {['503A Verified', '503B Verified', 'USA-Manufactured'].map(b => (
                      <span key={b} className="text-[10px] font-sans tracking-widest uppercase border border-blue-400/40 text-blue-300/80 rounded-full px-3 py-1">{b}</span>
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">We supply the peptides, too.</p>
                    <p className="text-white/45 text-sm leading-relaxed">
                      Belk Digital doesn't just build your storefront — we serve as your supplier for all peptides.
                      Product is manufactured in the USA at a facility that is both 503A and 503B verified,
                      giving your catalog a compliant, credible sourcing story from day one.
                    </p>
                  </div>
                </div>

                <FeatureCards items={RUO_FEATURES} />

                <SubLabel>Advanced Features · Included</SubLabel>
                <ChecklistGrid items={RUO_CHECKLIST} />

                <SubLabel>SEO Foundation · Included</SubLabel>
                <div className="flex flex-wrap gap-2">
                  {RUO_SEO_TAGS.map(t => <Tag key={t}>{t}</Tag>)}
                </div>

                {/* COA add-on */}
                <div className="mt-12 pt-10 border-t border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-1">Add-On</p>
                      <h4 className="text-xl font-sans font-[600] text-white">Certificates of Analysis (COA)</h4>
                    </div>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xl mb-6">
                    Independent third-party lab documentation that reinforces research credibility at the point of decision. Per-product pricing scales down as your catalog grows.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {COA_TIERS.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                          "border rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1",
                          t.best
                            ? "border-blue-400/30 bg-blue-500/[0.07]"
                            : "border-white/[0.07] bg-white/[0.02]"
                        )}
                      >
                        <p className="text-[10px] font-sans uppercase tracking-widest text-white/30 mb-2">{t.range}</p>
                        <p className={cn("text-3xl font-sans font-[700] mb-1", t.best ? "text-blue-400" : "text-white")}>{t.price}</p>
                        <p className="text-[10px] text-white/30 font-sans uppercase tracking-wider">{t.unit}</p>
                      </motion.div>
                    ))}
                  </div>
                  <Callout>
                    <strong className="text-white/75">Validity Period.</strong> Each Certificate of Analysis remains valid for{' '}
                    <span className="text-blue-300/90 font-semibold">3 months</span> from date of issue. Renewals are quoted per product as required.
                  </Callout>
                </div>

                {/* Google Ads add-on */}
                <div className="mt-12 pt-10 border-t border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-1">Add-On</p>
                      <h4 className="text-xl font-sans font-[600] text-white">Google Ads Management (RUO)</h4>
                    </div>
                    <PriceTag amount="7.5%" note="of Monthly Ad Spend" />
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xl mb-6">
                    Full-service paid search management for research-use-only products, run with a compliance-aware discipline.
                    We handle strategy, execution, and continuous optimization end to end.
                  </p>
                  <ChecklistGrid items={GOOGLE_ADS_CHECKLIST} />
                  <p className="text-white/25 text-xs italic mt-5">
                    Note: ad platform approval and specific performance outcomes cannot be guaranteed. Our management focuses on structuring and optimizing campaigns within platform policies.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── PANEL 1: TELEHEALTH ── */}
            {activeTab === 1 && (
              <motion.div
                key="tele"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-2">Offering 02</p>
                    <h3 className="text-2xl md:text-3xl font-sans font-[600] text-white">Telehealth Platform Development</h3>
                  </div>
                  <PriceTag amount="$4,000" note="USD · API Costs Excluded" />
                </div>
                <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-4">
                  A modern, patient-first telehealth platform built on custom Next.js. Clean workflows for patients,
                  clinicians, and administrators — all on scalable infrastructure ready for growth.
                </p>

                <FeatureCards items={TELEHEALTH_FEATURES} />

                <SubLabel>Search-Ready Architecture</SubLabel>
                <div className="flex flex-wrap gap-2">
                  {TELEHEALTH_TAGS.map(t => <Tag key={t}>{t}</Tag>)}
                </div>

                <Callout>
                  <strong className="text-white/75">Separate Billing.</strong> API licensing and third-party platform costs
                  (e.g. messaging, payments, EHR, telemedicine APIs) are billed separately and pass through at cost.
                </Callout>

                {/* Compliance Script */}
                <div className="mt-12 pt-10 border-t border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-1">Add-On</p>
                      <h4 className="text-xl font-sans font-[600] text-white">Legit Telehealth Compliance Script</h4>
                    </div>
                    <PriceTag amount="$4,500" note="USD · 4–6 Weeks" />
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xl mb-6">
                    A privacy-first implementation layer that gives your platform the operational structure and documentation
                    scaffolding expected of a modern, legitimate telehealth business.
                  </p>
                  <ChecklistGrid items={COMPLIANCE_CHECKLIST} />
                  <div className="flex flex-col gap-3 mt-4">
                    <Callout>
                      <strong className="text-white/75">Timeline.</strong> The compliance script is a considered build —
                      expect a delivery window of <span className="text-blue-300/90 font-semibold">4–6 weeks</span> depending on scope and client feedback.
                    </Callout>
                    <Callout>
                      <strong className="text-white/75">Client Responsibility.</strong> This service provides technical implementation support only.
                      Legal approval, regulatory compliance, and final HIPAA certification remain the responsibility of the client and their own legal and compliance advisors.
                    </Callout>
                  </div>
                </div>

                {/* Managed Support */}
                <div className="mt-12 pt-10 border-t border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-1">Add-On</p>
                      <h4 className="text-xl font-sans font-[600] text-white">Managed Customer Support</h4>
                    </div>
                    <span className="self-start px-4 py-2 rounded-full border border-white/[0.15] text-white/50 text-xs font-sans tracking-widest uppercase">Custom Pricing</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xl mb-6">
                    Staff your telehealth operation with a trained support team — choose the coverage that fits your market and budget.
                  </p>
                  <FeatureCards items={[
                    { icon: <Users className="w-5 h-5 text-blue-400" />, title: 'American Support Team', desc: 'US-based agents for a native, on-shore patient experience where accent, tone, and time-zone alignment matter most. Custom-priced.' },
                    { icon: <Globe className="w-5 h-5 text-blue-400" />, title: 'Foreign Support Team', desc: 'Cost-efficient off-shore agents trained to your scripts and standards for scalable, around-the-clock coverage. Custom-priced.' },
                  ]} />
                </div>

                {/* Advertising & Creative */}
                <div className="mt-12 pt-10 border-t border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-1">Add-On</p>
                      <h4 className="text-xl font-sans font-[600] text-white">In-House Advertising & Creative Department</h4>
                    </div>
                    <span className="self-start px-4 py-2 rounded-full border border-white/[0.15] text-white/50 text-xs font-sans tracking-widest uppercase">Custom Pricing</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed max-w-2xl mb-6">
                    Our full-service marketing agency and creative department, embedded in your telehealth business. We produce
                    best-in-class content — the finest custom AI creative <em>and</em> fully human, non-AI production — and we can
                    run the campaigns end to end. Every engagement is scoped and priced to the individual client's needs.
                  </p>
                  <FeatureCards items={[
                    { icon: <Zap className="w-5 h-5 text-blue-400" />, title: 'Content Development Only', desc: 'We craft the creative — custom AI-generated and traditional non-AI content — and hand it to your team to run. You own deployment.' },
                    { icon: <Target className="w-5 h-5 text-blue-400" />, title: 'Deployment Only', desc: 'You supply the creative; we manage the campaigns, targeting, tracking, and continuous optimization across channels.' },
                    { icon: <Shield className="w-5 h-5 text-blue-400" />, title: 'Full Service — Both', desc: 'The complete package: we develop the content and manage every deployment, so your advertising runs as one seamless operation.' },
                    { icon: <Brain className="w-5 h-5 text-blue-400" />, title: 'AI + Non-AI Creative', desc: 'Best-in-class on both fronts — cutting-edge AI production for speed and scale, plus human creative where authenticity counts.' },
                  ]} />
                  <Callout>
                    <strong className="text-white/75">Custom Pricing.</strong> Advertising and creative pricing is set per client according to scope, channels, content volume,
                    and whether you engage us for content, deployment, or both. Campaigns are engineered to maximize qualified reach and conversion opportunities through continuous
                    optimization — specific ROI or conversion rates are not promised.
                  </Callout>
                </div>
              </motion.div>
            )}

            {/* ── PANEL 2: COMBINED ── */}
            {activeTab === 2 && (
              <motion.div
                key="combined"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-white/30 mb-2">Offering 03</p>
                    <h3 className="text-2xl md:text-3xl font-sans font-[600] text-white">RUO Website + Telehealth — Combined Package</h3>
                  </div>
                  <span className="self-start px-5 py-3 rounded-2xl border border-white/[0.15] text-white/50 text-xs font-sans tracking-widest uppercase">Custom Pricing</span>
                </div>
                <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-6">
                  The complete ecosystem. Launch your research storefront and your telehealth platform together, engineered as one connected operation — shared design language, unified analytics, and a single team accountable for the whole build.
                </p>
                <FeatureCards items={COMBINED_FEATURES} />
                <SubLabel>Everything, Under One Roof</SubLabel>
                <div className="flex flex-wrap gap-2">
                  {COMBINED_TAGS.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                <Callout>
                  <strong className="text-white/75">Custom Package Pricing.</strong> Combined engagements are priced to the specific mix of platforms, add-ons, supply volume,
                  and ongoing services you need — typically at preferential terms versus commissioning each piece separately.
                  We'll build a tailored quote after a short discovery call.
                </Callout>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── COMPARISON TABLE: OFFERINGS ──────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/[0.04] blur-[140px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHead
            badge="Compare"
            title={<>The offerings, <span className="font-serif italic font-normal">side by side.</span></>}
            lead="A quick reference for what's included where. The Combined Package brings everything together under one team and one custom quote."
          />
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left py-4 px-5 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">Included</th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">
                    RUO Website<br /><span className="text-white/20 normal-case tracking-normal font-normal">$4,000</span>
                  </th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">
                    Telehealth<br /><span className="text-white/20 normal-case tracking-normal font-normal">$4,000</span>
                  </th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-blue-400/70">
                    Combined<br /><span className="text-blue-400/40 normal-case tracking-normal font-normal">Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 text-sm text-white/60 font-sans">{row.feature}</td>
                    <CompCell value={row.ruo} />
                    <CompCell value={row.telehealth} />
                    <CompCell value={row.combined} highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── AI LEAD GENERATION ───────────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
            <div>
              <SectionBadge>Cross-Offering</SectionBadge>
              <h2 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-sans font-[600] tracking-tight leading-[1.1] text-white mt-5 max-w-xl">
                AI Lead Generation <span className="font-serif italic font-normal">Program</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mt-4 max-w-lg">
                A bespoke, AI-powered lead generation engine that identifies, qualifies, and nurtures high-intent prospects across multiple channels — feeding directly into your CRM. Available with any offering above.
              </p>
            </div>
            <div className="flex-shrink-0">
              <PriceTag amount="Custom" note="Scoped to Your Goals" />
            </div>
          </div>
          <FeatureCards items={AI_LEAD_FEATURES} />
          <Callout>
            <strong className="text-white/75">Custom Pricing.</strong> Pricing is tailored to your business goals, geographic targeting, industry, and campaign scale.
            Campaigns are engineered to maximize qualified lead generation and conversion opportunities through continuous optimization — specific ROI or conversion rates are not promised.
          </Callout>
        </div>
      </section>

      {/* ── RETAINER TIERS ───────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/[0.04] blur-[140px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHead
            badge="Retainers"
            title={<>Monthly SEO · GEO · <span className="font-serif italic font-normal">AEO Programs</span></>}
            lead="Compounding search visibility across Google and the AI answer engines. Choose the level of partnership that matches your ambition — every tier is built for measurable, sustained growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RETAINER_TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative rounded-3xl p-7 flex flex-col border transition-all duration-500 hover:-translate-y-1",
                  tier.featured
                    ? "border-blue-400/30 bg-blue-500/[0.06]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                )}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-[10px] font-sans font-semibold tracking-widest uppercase text-white">
                      Most Comprehensive
                    </span>
                  </div>
                )}

                <p className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-white/30 mb-1">{tier.tier}</p>
                <h3 className="text-xl font-sans font-[600] text-white mb-3">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={cn("text-[2.8rem] font-sans font-[700] leading-none tracking-tight", tier.featured ? "text-blue-400" : "text-white")}>
                    {tier.price}
                  </span>
                  <span className="text-white/30 text-sm font-sans">{tier.period}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-6 pb-6 border-b border-white/[0.06]">{tier.desc}</p>
                <ul className="flex flex-col gap-2.5 mt-2">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className={cn("flex items-start gap-2.5 text-sm font-sans", f.on ? "text-white/60" : "text-white/20")}>
                      {f.on
                        ? <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        : <X className="w-3.5 h-3.5 text-white/20 flex-shrink-0 mt-0.5" />
                      }
                      {f.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <Callout>
            <strong className="text-white/75">SEO Essentials — Development Billing.</strong> Tier 03 does not include website maintenance or development support.
            Any development work requested is billed separately at{' '}
            <span className="text-blue-300/90 font-semibold">$40 USD / hour</span>.
          </Callout>
          <p className="text-white/25 text-xs italic mt-4">
            *Enterprise Growth includes unlimited development support for reasonable ongoing requests within the spirit of the partnership.
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE: RETAINERS ──────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-sans font-[600] text-white mb-8"
          >
            Retainers at a <span className="font-serif italic font-normal">glance</span>
          </motion.h2>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left py-4 px-5 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">Feature</th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">Essentials · $750</th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-white/30">Business · $1,000</th>
                  <th className="text-center py-4 px-4 text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-blue-400/70">Enterprise · $1,500</th>
                </tr>
              </thead>
              <tbody>
                {RETAINER_COMP.map((row, i) => (
                  <tr key={i} className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 text-sm text-white/60 font-sans">{row.feature}</td>
                    <CompCell value={row.ess} />
                    <CompCell value={row.biz} />
                    <CompCell value={row.ent} highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY BELK DIGITAL ─────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/[0.04] blur-[150px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHead
            badge="Why Belk Digital"
            title={<>The difference is in <span className="font-serif italic font-normal">the build.</span></>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-3xl overflow-hidden">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-black hover:bg-white/[0.03] transition-colors duration-300 p-8"
              >
                <p className="text-xs font-sans font-medium text-blue-400/70 tracking-widest mb-4">{item.n}</p>
                <h4 className="text-white font-sans font-[600] text-base mb-2">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.04] blur-[130px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHead
            badge="How We Work"
            title={<>A disciplined path from <span className="font-serif italic font-normal">idea to growth.</span></>}
          />
          <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="mb-14 last:mb-0 group"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-sans font-black tracking-[0.4em] text-white/35 uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400/50 to-blue-600/30 group-hover:w-16 transition-all duration-500 mb-5 rounded-full" />
                    <h3 className="text-xl font-sans font-[600] text-white mb-2">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </section>

      {/* ── TERMS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-white/[0.07] pt-16">
            <SectionHead
              badge="Support & Terms"
              title={<>Built for the <span className="font-serif italic font-normal">long run.</span></>}
              lead="Our engagements don't end at launch. We build long-term partnerships — offering ongoing technical support, feature enhancements, strategic consulting, and continuous digital growth well beyond go-live."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'All prices are quoted in USD.',
                'Development costs exclude domain registration, hosting, premium plugins, API licensing, and third-party software subscriptions unless otherwise stated.',
                'Project timelines depend on scope and timely client feedback.',
                'Additional custom features requested outside the agreed scope are quoted separately.',
              ].map((term, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <span className="text-blue-400/60 font-sans font-medium text-sm flex-shrink-0">§</span>
                  <p className="text-white/45 text-sm leading-relaxed">{term}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Partner with us to build a scalable, future-ready business."
        subtitle="From your first storefront to a compounding search presence across every engine that matters — Belk Digital is ready to engineer your next stage of growth."
        button="Start the Conversation"
      />
    </div>
  );
};
