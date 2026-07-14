"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Palette, RefreshCw, Fingerprint, Layout, Code, Search, Wrench, ShoppingBag, Database,
  Brain, Target, TrendingUp, MessageCircle, Sparkles, Smartphone, GitBranch, Cloud,
  Stethoscope, FileText, ArrowRight, CheckSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ElementType> = {
  'custom-web-design': Palette,
  'website-redesign': RefreshCw,
  'branding': Fingerprint,
  'ui-ux-design': Layout,
  'web-development': Code,
  'seo-optimization': Search,
  'maintenance': Wrench,
  'shopify-development': ShoppingBag,
  'custom-cms': Database,
  'telehealth-development': Stethoscope,
  'ecommerce-development': ShoppingBag,
  'ai-solutions': Brain,
  'ai-lead-generation': Target,
  'performance-marketing': TrendingUp,
  'social-media-ugc': MessageCircle,
  'geo-optimization': Sparkles,
  'aeo-optimization': CheckSquare,
  'mobile-development': Smartphone,
  'api-integrations': GitBranch,
  'cloud-infrastructure': Cloud,
};

const CATEGORY: Record<string, string> = {
  'custom-web-design': 'design',
  'website-redesign': 'build',
  'branding': 'design',
  'ui-ux-design': 'design',
  'web-development': 'build',
  'seo-optimization': 'growth',
  'maintenance': 'build',
  'shopify-development': 'build',
  'custom-cms': 'build',
  'telehealth-development': 'build',
  'ecommerce-development': 'build',
  'ai-solutions': 'ai',
  'ai-lead-generation': 'ai',
  'performance-marketing': 'growth',
  'social-media-ugc': 'growth',
  'geo-optimization': 'growth',
  'aeo-optimization': 'growth',
  'mobile-development': 'build',
  'api-integrations': 'build',
  'cloud-infrastructure': 'build',
};

const CATEGORY_LABELS: Record<string, string> = {
  build: 'Engineering',
  ai: 'AI & Automation',
  growth: 'Growth & Search',
  design: 'Design & Brand',
};

const DEFAULT_TAGS: Record<string, string[]> = {
  'custom-web-design': ['Custom Design', 'UI/UX', 'Brand-Aligned', 'Responsive'],
  'website-redesign': ['Full Audit', 'Modern Redesign', 'Performance', 'SEO'],
  'branding': ['Logo Design', 'Brand Identity', 'Visual Systems', 'Creative Direction'],
  'ui-ux-design': ['Product Design', 'Wireframes', 'Prototypes', 'User Research'],
  'web-development': ['Next.js', 'React', 'Node.js', 'API', 'SaaS'],
  'seo-optimization': ['Technical SEO', 'Local SEO', 'Core Web Vitals', 'Audits'],
  'maintenance': ['Monitoring', 'Security', 'Bug Fixes', '24/7 Support'],
  'shopify-development': ['Shopify', 'WooCommerce', 'Subscriptions', 'Payments'],
  'custom-cms': ['Payload CMS', 'Sanity', 'Strapi', 'WordPress', 'Headless'],
  'telehealth-development': ['HIPAA-Aware', 'Patient Portal', 'Scheduling', 'Telehealth'],
};

const FILTERS = [
  { key: 'all', label: 'All Services' },
  { key: 'build', label: 'Engineering' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'growth', label: 'Growth & Search' },
  { key: 'design', label: 'Design & Brand' },
];

export function ServicesGrid() {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const services: any[] = t.services.items;
  const filtered = activeFilter === 'all'
    ? services
    : services.filter((s) => CATEGORY[s.slug] === activeFilter);

  return (
    <section className="py-28 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40 text-xs font-sans tracking-widest uppercase mb-6">
            Full-Stack Digital Growth
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-[600] tracking-tight text-white leading-[1.05] mb-5">
            Everything your brand needs to{' '}
            <span className="font-serif italic font-normal text-white/65">build, rank & scale.</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            One agency, {services.length} disciplines — from custom engineering and design to search, AI automation, and growth. Zero handoffs.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 border',
                activeFilter === f.key
                  ? 'bg-white text-black border-white'
                  : 'text-white/45 bg-white/[0.03] border-white/[0.08] hover:text-white hover:border-white/20'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => {
              const Icon = ICONS[service.slug] || FileText;
              const cat = CATEGORY[service.slug] || 'build';
              const tags: string[] = service.tags || DEFAULT_TAGS[service.slug] || [];

              return (
                <motion.div
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.28, delay: i * 0.03 }}
                >
                  <Link
                    href={`/${language}/services/${service.slug}`}
                    className="group flex flex-col h-full rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 p-7 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.07),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                    {/* Icon + category label */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="w-11 h-11 rounded-2xl bg-blue-500/[0.10] border border-blue-400/[0.15] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-sans font-medium tracking-widest uppercase text-white/20 mt-1 text-right">
                        {CATEGORY_LABELS[cat]}
                      </span>
                    </div>

                    {/* Title + description */}
                    <div className="flex-1 relative z-10">
                      <h3 className="text-[1.05rem] font-sans font-[600] text-white mb-2 leading-snug group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto relative z-10 mb-4">
                        {tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/30 text-[11px] font-sans"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-white/25 text-xs font-sans group-hover:text-blue-400 transition-colors relative z-10">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
