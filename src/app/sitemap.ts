import { MetadataRoute } from 'next';
import { getDictionary } from '@/lib/i18n';
import { i18n, Locale } from '@/lib/i18n-config';
import { blogPostsEN } from '@/i18n/blogPosts';

const baseUrl = 'https://belkdigital.com';

// Location city/region slugs that have dedicated pages
const locationSlugs = [
    'usa',
    'europe',
    'gcc',
    'australia',
    'canada',
    'dubai',
    'london',
    'new-york',
    'riyadh',
    'jeddah',
    'abu-dhabi',
    'sydney',
    'toronto',
    'vancouver',
];

// Charleston, SC neighborhood slugs
const charlestonNeighborhoods = [
    'downtown',
    'mount-pleasant',
    'north-charleston',
    'west-ashley',
    'james-island',
    'johns-island',
    'daniel-island',
    'summerville',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/locations', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/work', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    ];

    let sitemap: MetadataRoute.Sitemap = [];

    for (const locale of i18n.locales) {
        // 1. Static Routes
        for (const route of staticRoutes) {
            sitemap.push({
                url: `${baseUrl}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
            });
        }

        // 2. Location sub-pages (city/region pages)
        for (const slug of locationSlugs) {
            sitemap.push({
                url: `${baseUrl}/${locale}/locations/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        }

        // 3. Charleston, SC hub page
        sitemap.push({
            url: `${baseUrl}/${locale}/locations/charleston-sc`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        });

        // 4. Charleston, SC neighborhood pages
        for (const neighborhood of charlestonNeighborhoods) {
            sitemap.push({
                url: `${baseUrl}/${locale}/locations/charleston-sc/${neighborhood}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.75,
            });
        }

        // 5. Dynamic Blog Posts
        for (const post of blogPostsEN) {
            sitemap.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        }

        // 6. Dynamic Services
        const dict = await getDictionary(locale as Locale);
        if (dict.services?.items) {
            dict.services.items.forEach((service: any) => {
                sitemap.push({
                    url: `${baseUrl}/${locale}/services/${service.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.9,
                });
            });
        }
    }

    return sitemap;
}
