"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '@/i18n/blogPosts';

export function JournalSection() {
    const { language, t } = useLanguage();

    const latestPosts = [...getBlogPosts(language)]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section className="py-24 md:py-32 bg-black transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

                {/* Header */}
                <div className="flex justify-between items-end mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-white tracking-tight leading-[1.1]">
                            {t.homeJournal.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href={`/${language}/blog`}
                            className="group flex items-center gap-2 px-6 py-2 rounded-full border border-white text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 uppercase"
                        >
                            {t.homeJournal.blog}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {latestPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.12 }}
                            className="group relative aspect-[4/3] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            <Link href={`/${language}/blog/${post.slug}`} className="block w-full h-full">

                                {/* Background image */}
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Gradient — strong at bottom, fades out at top */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Text pinned to bottom-left */}
                                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8 flex flex-col gap-1.5">
                                    <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase">
                                        {new Date(post.date).toLocaleDateString(
                                            language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US',
                                            { month: 'long', day: 'numeric', year: 'numeric' }
                                        )}
                                    </span>

                                    <h3 className="text-white text-xl md:text-[1.35rem] font-bold leading-snug line-clamp-2 transition-transform duration-500 group-hover:-translate-y-0.5">
                                        {post.title}
                                    </h3>

                                    <p className="text-white/55 text-sm leading-relaxed line-clamp-2 mt-0.5">
                                        {post.excerpt}
                                    </p>
                                </div>

                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
