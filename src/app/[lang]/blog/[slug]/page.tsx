import Blog from '@/screens/Blog';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale, i18n } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { getBlogPosts, blogPostsEN } from '@/i18n/blogPosts';
import PageJsonLd from '@/components/seo/PageJsonLd';

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
    const dict = await getDictionary(lang as Locale);
    const effectiveSlug = slug === 'telehealth-website-development' ? 'medical-practice-website-development-hipaa-guide' : slug;

    // Find localized post
    const posts = getBlogPosts(lang);
    const post = posts.find(p => p.slug === effectiveSlug);

    return constructMetadata({
            locale: lang,
            title: post ? post.title : dict.seo.blog.title,
        description: post ? post.excerpt : dict.seo.blog.description,
            keywords: post?.keywords,
        path: `/blog/${effectiveSlug}`,
        type: 'article',
        });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const effectiveSlug = slug === 'telehealth-website-development' ? 'medical-practice-website-development-hipaa-guide' : slug;

    // Find English post for structured data (consistent date/author info)
    const post = blogPostsEN.find(p => p.slug === effectiveSlug);

    return (
        <>
            {post && (
                <PageJsonLd
                    type="Article"
                    url={`https://belkdigital.com/${lang}/blog/${effectiveSlug}`}
                    headline={post.title}
                    description={post.excerpt}
                    datePublished={post.date}
                    dateModified={post.date}
                    authorName={post.author || "Belk Digital"}
                />
            )}
            {post && post.faqs && post.faqs.length > 0 && (
                <PageJsonLd
                    type="FAQPage"
                    questions={post.faqs}
                />
            )}
            <Blog />
        </>
    );
}
