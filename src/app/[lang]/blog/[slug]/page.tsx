import Blog from '@/screens/Blog';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { blogPostsEN, blogPostsES, blogPostsFR } from '@/i18n/blogPosts';
import PageJsonLd from '@/components/seo/PageJsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    // Find post
    let post;
    if (lang === 'es') post = blogPostsES.find(p => p.slug === slug);
    else if (lang === 'fr') post = blogPostsFR.find(p => p.slug === slug);
    else post = blogPostsEN.find(p => p.slug === slug);

    return constructMetadata({
        title: post ? post.title : dict.seo.blog.title,
        description: post ? post.excerpt : dict.seo.blog.description,
        path: `/blog/${slug}`,
        type: 'article',
    });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;

    // Find English post for structured data (consistent date/author info)
    const post = blogPostsEN.find(p => p.slug === slug);

    return (
        <>
            {post && (
                <PageJsonLd
                    type="Article"
                    url={`https://belkdigital.com/${lang}/blog/${slug}`}
                    headline={post.title}
                    description={post.excerpt}
                    datePublished={post.date}
                    dateModified={post.date}
                    authorName="Belk Digital"
                />
            )}
            <Blog />
        </>
    );
}
