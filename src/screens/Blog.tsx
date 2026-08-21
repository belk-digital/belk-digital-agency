"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Clock, User, Tag, CheckCircle, ChevronRight, Share2, Bookmark, HelpCircle, ChevronDown } from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import { getBlogPosts } from '@/i18n/blogPosts';

const renderContentWithLinks = (text: string, lang: string) => {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const linkText = match[1];
    let linkUrl = match[2];

    if (linkUrl.startsWith('/') && !linkUrl.startsWith(`/${lang}`)) {
      const hasLangPrefix = /^\/[a-z]{2}(\/|$)/.test(linkUrl);
      if (!hasLangPrefix) {
        linkUrl = `/${lang}${linkUrl}`;
      }
    }

    parts.push(
      <Link
        key={match.index}
        href={linkUrl}
        className="text-[#9F5FFC] hover:text-white underline transition-colors duration-300"
      >
        {linkText}
      </Link>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};


const renderInline = (text: string, lang: string): React.ReactNode[] => {
  if (!text) return [];
  const regex = /(\*\*([^\*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // Bold text
      parts.push(<strong key={match.index} className="font-[600] text-white">{match[2]}</strong>);
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // Link
      const linkText = match[3];
      let linkUrl = match[4];

      if (linkUrl.startsWith('/') && !linkUrl.startsWith(`/${lang}`)) {
        const hasLangPrefix = /^\/[a-z]{2}(\/|$)/.test(linkUrl);
        if (!hasLangPrefix) {
          linkUrl = `/${lang}${linkUrl}`;
        }
      }

      parts.push(
        <Link
          key={match.index}
          href={linkUrl}
          className="text-[#9F5FFC] hover:text-white underline transition-colors duration-300"
        >
          {linkText}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

const renderRichContent = (text: string, lang: string) => {
  if (!text) return null;

  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  
  let currentBlockType: 'paragraph' | 'list' | 'ordered-list' | 'code' | 'table' | null = null;
  let currentLines: string[] = [];

  const flushBlock = (key: string | number) => {
    if (currentLines.length === 0) return;

    if (currentBlockType === 'code') {
      const codeText = currentLines.join('\n');
      blocks.push(
        <pre key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto text-sm text-white/90 font-mono mb-8 my-6">
          <code>{codeText}</code>
        </pre>
      );
    } else if (currentBlockType === 'table') {
      const rows = currentLines.map(line => 
        line.split('|').map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      ).filter(row => row.length > 0);

      if (rows.length > 0) {
        const headers = rows[0];
        const dataRows = rows.slice(1).filter(row => !row.every(cell => cell.startsWith('-')));

        blocks.push(
          <div key={key} className="overflow-x-auto my-8 border border-white/10 rounded-2xl bg-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {headers.map((h, i) => (
                    <th key={i} className="p-4 font-sans font-[600] text-white text-sm uppercase tracking-wider">{renderInline(h, lang)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-4 text-sm text-white/70 font-sans">{renderInline(cell, lang)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    } else if (currentBlockType === 'list') {
      blocks.push(
        <ul key={key} className="list-disc pl-6 space-y-3 text-lg text-white/70 mb-8 my-4">
          {currentLines.map((li, i) => (
            <li key={i}>{renderInline(li, lang)}</li>
          ))}
        </ul>
      );
    } else if (currentBlockType === 'ordered-list') {
      blocks.push(
        <ol key={key} className="list-decimal pl-6 space-y-3 text-lg text-white/70 mb-8 my-4">
          {currentLines.map((li, i) => (
            <li key={i}>{renderInline(li, lang)}</li>
          ))}
        </ol>
      );
    } else {
      const pText = currentLines.join('\n');
      blocks.push(
        <p key={key} className="text-lg text-white/70 mb-6 leading-relaxed whitespace-pre-wrap">
          {renderInline(pText, lang)}
        </p>
      );
    }

    currentLines = [];
    currentBlockType = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (currentBlockType === 'code') {
        flushBlock(`code-${i}`);
      } else {
        flushBlock(`pre-code-${i}`);
        currentBlockType = 'code';
      }
      continue;
    }

    if (currentBlockType === 'code') {
      currentLines.push(line);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushBlock(`pre-h3-${i}`);
      const h3Text = trimmed.substring(4);
      blocks.push(
        <h3 key={`h3-${i}`} className="text-xl font-sans font-[600] text-white mt-10 mb-4">
          {renderInline(h3Text, lang)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushBlock(`pre-h2-${i}`);
      const h2Text = trimmed.substring(3);
      blocks.push(
        <h2 key={`h2-${i}`} className="text-2xl font-sans font-[600] text-white mt-14 mb-6">
          {renderInline(h2Text, lang)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (currentBlockType !== 'table') {
        flushBlock(`pre-table-${i}`);
        currentBlockType = 'table';
      }
      currentLines.push(trimmed);
      continue;
    }

    const listMatch = trimmed.match(/^[-*•]\s+(.*)/);
    if (listMatch) {
      if (currentBlockType !== 'list') {
        flushBlock(`pre-list-${i}`);
        currentBlockType = 'list';
      }
      currentLines.push(listMatch[1]);
      continue;
    }

    const oListMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (oListMatch) {
      if (currentBlockType !== 'ordered-list') {
        flushBlock(`pre-olist-${i}`);
        currentBlockType = 'ordered-list';
      }
      currentLines.push(oListMatch[2]);
      continue;
    }

    if (trimmed === '') {
      flushBlock(`empty-${i}`);
      continue;
    }

    if (currentBlockType !== 'paragraph' && currentBlockType !== null) {
      flushBlock(`flush-para-${i}`);
    }
    currentBlockType = 'paragraph';
    currentLines.push(line);
  }

  flushBlock('final');
  return blocks;
};

const categories = ['all', 'business', 'design', 'seo', 'performance'] as const;

const Blog = () => {
  const { slug } = useParams();
  const { language, t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Get localized blog posts based on current language
  const blogPosts = getBlogPosts(language);

  // Single blog post view
  if (slug) {
    const effectiveSlug = slug === 'telehealth-website-development' ? 'medical-practice-website-development-hipaa-guide' : slug;
    const post = blogPosts.find(p => p.slug === effectiveSlug);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0515]">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold mb-4 text-white">Post not found</h1>
            <Link href={`/${language}/blog`} className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
              {t.blog?.backToBlog || "Back to Blog"}
            </Link>
          </div>
        </div >
      );
    }

    return (
      <div className="bg-[#0A0A0A] min-h-screen text-white">
        <section className="relative pt-32 pb-60 overflow-hidden">
          {/* Hero Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] z-20" />
          </div>

          <div className="container-wide relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Link
                href={`/${language}/blog`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
              >
                <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:-translate-x-1", isRTL ? "" : "rotate-180")} />
                {t.blog.backToBlog}
              </Link>

              <div className="flex flex-col items-center gap-6 mb-8">
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-sans font-medium tracking-widest uppercase">
                  {t.blog.categories[post.category as keyof typeof t.blog.categories]}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-[600] tracking-tight leading-[1.1] text-white">
                  {post.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50 border-y border-white/10 py-6">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} {t.blog.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-40 -mt-40 pb-24">
          <div className="container-wide max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-16 shadow-2xl relative"
            >
               {/* Content */}
               <div className={cn("prose prose-lg dark:prose-invert max-w-none text-white/80 leading-relaxed font-sans", isRTL && "text-right")}>
                  <p className="text-2xl md:text-3xl font-serif italic font-normal text-white mb-16 leading-snug border-l-2 border-white/20 pl-8">
                    {post.excerpt}
                  </p>

                  {post.content.intro && (
                    <>
                      {!post.content.intro.trim().startsWith('#') && (
                        <h2 className="text-3xl font-sans font-[600] text-white mt-16 mb-8">
                          {language === 'es' ? 'Introducción' : (language === 'fr' ? 'Introduction' : (language === 'de' ? 'Einführung' : 'Introduction'))}
                        </h2>
                      )}
                      <div className="mb-12 text-lg text-white/70 leading-relaxed font-sans">{renderRichContent(post.content.intro, language)}</div>
                    </>
                  )}

                  {post.content.sections && post.content.sections.length > 0 && post.content.sections.map((section, index) => (
                    <div key={index} className="mb-16">
                      <h2 className="text-2xl font-sans font-[600] text-white mt-16 mb-8">{section.title}</h2>
                      {section.content && <div className="mb-8 text-lg text-white/70 leading-relaxed font-sans">{renderRichContent(section.content, language)}</div>}

                      {section.points && section.points.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4 my-10">
                          {section.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/20 transition-all duration-300">
                              <CheckCircle className="w-5 h-5 text-white/40 group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                              <span className="font-sans text-white/80 group-hover:text-white transition-colors">{renderRichContent(point, language)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {post.content.conclusion && (
                    <>
                      {!post.content.conclusion.trim().startsWith('#') && (
                        <h2 className="text-3xl font-sans font-[600] text-white mt-16 mb-8">
                          {language === 'es' ? 'Conclusión' : (language === 'fr' ? 'Conclusion' : (language === 'de' ? 'Fazit' : 'Conclusion'))}
                        </h2>
                      )}
                      <div className="mb-12 text-lg text-white/70 leading-relaxed font-sans">{renderRichContent(post.content.conclusion, language)}</div>
                    </>
                  )}

                  {/* FAQs Accordion Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <div className="mt-20 pt-16 border-t border-white/10">
                      <h2 className="text-3xl font-sans font-[600] text-white mb-10 flex items-center gap-4">
                        <HelpCircle className="w-8 h-8 text-white/40" />
                        {language === 'es' ? 'Preguntas Frecuentes' : (language === 'fr' ? 'Questions Fréquentes' : (language === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'))}
                      </h2>
                      <div className="space-y-4">
                        {post.faqs.map((faq, index) => {
                          const isOpen = openFaqIndex === index;
                          return (
                            <div
                              key={index}
                              className={cn(
                                "border rounded-2xl transition-all duration-300 overflow-hidden",
                                isOpen ? "bg-white/[0.04] border-white/20" : "bg-white/[0.01] border-white/5 hover:border-white/15"
                              )}
                            >
                              <button
                                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-sans text-lg font-medium text-white/90 hover:text-white transition-colors"
                              >
                                <span>{faq.question}</span>
                                <ChevronDown className={cn("w-5 h-5 text-white/40 transition-transform duration-300", isOpen && "rotate-180 text-white")} />
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  >
                                    <div className="px-6 pb-6 text-base text-white/60 leading-relaxed font-sans border-t border-white/5 pt-4">
                                      {renderInline(faq.answer, language)}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Share Section */}
                <div className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                  <Link href={`/${language}/contact`} className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all text-sm">
                    {t.nav.contact}
                  </Link>
                </div>
            </motion.div>

            {/* Need Expert Help Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-[30px] p-10 md:p-12 text-center overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-sans font-[600] mb-4 text-white">{t.blog.postCta.title}</h3>
                <p className="text-white/60 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  {t.blog.postCta.subtitle}
                </p>
                <Link href={`/${language}/contact`} className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold hover:scale-105 transition-all text-lg shadow-xl shadow-white/5">
                  {t.nav.contact}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </div>
    );
  }

  const sortedByDate = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestPosts = sortedByDate.slice(0, 3);

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  // Blog listing page
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn("max-w-4xl mx-auto text-center", isRTL && "text-right")}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-sans font-medium tracking-widest uppercase">
                {t.blog.badge}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-[600] tracking-tight leading-[1.1] mb-8 text-white">
              {t.blog.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="font-serif italic font-normal text-white/90">
                {t.blog.title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-sans">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <h3 className={cn("text-2xl md:text-3xl font-sans font-[600] mb-12 text-center text-white", isRTL && "font-display")}>
              {t.blog.whatYouWillLearn.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {t.blog.whatYouWillLearn.items.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center gap-4 bg-white/[0.03] backdrop-blur-md p-6 rounded-[24px] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group",
                    isRTL && "flex-row-reverse text-right"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </div>
                  <span className="font-sans font-medium text-white/80 group-hover:text-white transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-24 border-b border-white/5">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn("flex items-center gap-4 mb-12", isRTL && "flex-row-reverse")}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest">
              {t.blog.latestPosts}
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestPosts.map((post, index) => (
              <motion.article
                key={`latest-${post.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/${language}/blog/${post.slug}`}
                  className="flex flex-col h-full bg-white/[0.02] backdrop-blur-sm rounded-[32px] border border-white/5 overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                      {index === 0 && (
                        <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider">
                          New
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                        {t.blog.categories[post.category as keyof typeof t.blog.categories]}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className={cn(
                      "flex items-center gap-4 mb-6 text-[10px] font-bold text-white/40 uppercase tracking-widest",
                      isRTL && "flex-row-reverse"
                    )}>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} {t.blog.readTime}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                    </div>

                    <h2 className={cn(
                      "text-xl md:text-2xl font-sans font-[600] mb-4 text-white line-clamp-2 leading-snug",
                      isRTL && "text-right"
                    )}>
                      {post.title}
                    </h2>

                    <p className={cn(
                      "text-white/50 text-sm leading-relaxed line-clamp-3 mb-8 font-sans",
                      isRTL && "text-right"
                    )}>
                      {post.excerpt}
                    </p>

                    <div className={cn(
                      "flex items-center justify-between mt-auto pt-6 border-t border-white/5",
                      isRTL && "flex-row-reverse"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-white/80">{post.author}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ChevronRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-y border-white/5">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-sans">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border",
                  activeCategory === category
                    ? "bg-white text-black border-white shadow-lg shadow-white/10"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {t.blog.categories[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  layout
                >
                  <Link
                    href={`/${language}/blog/${post.slug}`}
                    className="flex flex-col h-full bg-white/[0.02] backdrop-blur-sm rounded-[32px] border border-white/5 overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Blog Image */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                           {t.blog.categories[post.category as keyof typeof t.blog.categories]}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className={cn(
                        "flex items-center gap-4 mb-6 text-[10px] font-bold text-white/40 uppercase tracking-widest",
                        isRTL && "flex-row-reverse"
                      )}>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime} {t.blog.readTime}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                      </div>

                      <h2 className={cn(
                        "text-xl md:text-2xl font-sans font-[600] mb-4 text-white group-hover:text-white transition-colors line-clamp-2 leading-snug",
                        isRTL && "text-right"
                      )}>
                        {post.title}
                      </h2>

                      <p className={cn(
                        "text-white/50 text-sm leading-relaxed line-clamp-3 mb-8 font-sans",
                        isRTL && "text-right"
                      )}>
                        {post.excerpt}
                      </p>

                      <div className={cn(
                        "flex items-center justify-between mt-auto pt-6 border-t border-white/5",
                        isRTL && "flex-row-reverse"
                      )}>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                             {post.author.charAt(0)}
                           </div>
                           <span className="text-xs font-semibold text-white/80">{post.author}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <ChevronRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Blog;
