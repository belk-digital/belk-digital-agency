"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useParams } from 'next/navigation';
import { CTASection } from '@/components/home/CTASection';

const PROPOSALS = [
  {
    slug: '99-purity-peptides',
    client: '99 Purity Peptides',
    category: 'E-Commerce & Telehealth',
    year: '2025',
    tags: ['RUO Storefront', 'Telehealth Platform', 'SEO Retainer', 'AI Lead Gen'],
    summary:
      'A complete digital growth roadmap covering a research-use peptide storefront, a white-label telehealth platform, multi-tier SEO retainers, and AI-powered lead generation.',
    accent: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
  },
];

export function Proposals() {
  const { lang } = useParams<{ lang: string }>();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent)] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 text-xs tracking-widest uppercase mb-8">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Client Proposals
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-semibold tracking-tight leading-[1.08] mb-6 text-white">
              Growth{' '}
              <span className="font-serif italic font-normal text-white/80">
                Proposals
              </span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              Custom digital strategy documents crafted for each client — covering
              design, development, SEO, and growth systems tailored to their market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proposals Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {PROPOSALS.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/${lang}/proposals/${p.slug}`}
                  className={`group block h-full rounded-3xl bg-white/[0.03] border ${p.border} hover:bg-white/[0.05] hover:border-blue-400/40 transition-all duration-300 overflow-hidden`}
                >
                  {/* Gradient top strip */}
                  <div className={`h-1 w-full bg-gradient-to-r ${p.accent} opacity-60`} />

                  <div className="p-8 md:p-10 flex flex-col h-full gap-6">
                    {/* Icon + Meta */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-white/30 text-xs font-mono">{p.year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{p.category}</p>
                      <h2 className="text-2xl font-sans font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {p.client}
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed">{p.summary}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-white/40 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                      View Full Proposal
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for your own proposal?"
        subtitle="Tell us about your project and we'll put together a custom growth strategy tailored to your business."
        button="Request a Proposal"
      />
    </div>
  );
}
