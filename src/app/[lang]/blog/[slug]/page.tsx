import Blog from '@/screens/Blog';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale, i18n } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { getBlogPosts, blogPostsEN } from '@/i18n/blogPosts';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const params: Array<{ lang: string; slug: string }> = [];
    for (const lang of i18n.locales) {
        for (const post of blogPostsEN) {
            params.push({ lang, slug: post.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;

    // Resolve legacy alias first
    const effectiveSlug = slug === 'telehealth-website-development' ? 'medical-practice-website-development-hipaa-guide' : slug;

    // Find localized post using effectiveSlug, falling back to English if untranslated
    const posts = getBlogPosts(lang);
    const post = posts.find(p => p.slug === effectiveSlug) || blogPostsEN.find(p => p.slug === effectiveSlug);

    if (!post) {
        return {};
    }

    // Determine available locales where this post has genuine translation
    const availableLocales = i18n.locales.filter(l =>
        getBlogPosts(l).some(p => p.slug === effectiveSlug)
    );

    // Get article-specific image URL (supports both StaticImageData object and direct string)
    const postImageUrl = typeof post.image === 'string' ? post.image : post.image?.src;

    const rawTitle = post.metaTitle || post.title;
    const pageTitle = rawTitle.replace(/\s*\|\s*Belk Digital$/i, '');

    return constructMetadata({
        locale: lang,
        title: pageTitle,
        description: post.metaDescription || post.excerpt,
        keywords: post.keywords,
        path: `/blog/${effectiveSlug}`,
        type: 'article',
        image: postImageUrl,
        imageAlt: post.imageAlt || post.title,
        availableLocales,
    });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;

    // Resolve legacy alias first
    const effectiveSlug = slug === 'telehealth-website-development' ? 'medical-practice-website-development-hipaa-guide' : slug;

    // Find English post using effectiveSlug for validation & fallback
    const postEN = blogPostsEN.find(p => p.slug === effectiveSlug);

    // Call notFound() only AFTER alias resolution if effectiveSlug is absent from blogPostsEN
    if (!postEN) {
        notFound();
    }

    // Find localized post matching the current language, falling back to postEN if translation is missing
    const localizedPosts = getBlogPosts(lang);
    const post = localizedPosts.find(p => p.slug === effectiveSlug) || postEN;
    const postImageUrl = typeof post.image === 'string' ? post.image : post.image?.src;

    return (
        <>
            <PageJsonLd
                type="Article"
                url={`https://www.belkdigital.com/${lang}/blog/${effectiveSlug}`}
                lang={lang}
                headline={post.title}
                description={post.excerpt}
                datePublished={post.date}
                dateModified={post.date}
                authorName={post.author || "Belk Digital"}
                image={postImageUrl ? (postImageUrl.startsWith('http') ? postImageUrl : `https://www.belkdigital.com${postImageUrl}`) : undefined}
            />
            {post.faqs && post.faqs.length > 0 && (
                <PageJsonLd
                    type="FAQPage"
                    questions={post.faqs}
                />
            )}
            <Blog />
        </>
    );
}
