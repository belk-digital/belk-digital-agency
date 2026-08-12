import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale, i18n } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { AreasWeServe } from '@/screens/AreasWeServe';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { US_STATES } from '@/lib/states';

export function generateStaticParams() {
    return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
            locale: lang,
            title: `${dict.nav.areasWeServe} Across the United States | Belk Digital`,
        description: 'Belk Digital provides custom web design, SaaS development, and outcome-based SEO services across all 50 U.S. states. Explore your state and services.',
        path: '/areas-we-serve'
        });
}

export default async function AreasWeServePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const baseUrl = 'https://www.belkdigital.com';
    const pageUrl = `${baseUrl}/${lang}/areas-we-serve`;

    // 1. CollectionPage Schema
    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${dict.nav.areasWeServe} Across the United States | Belk Digital`,
        description: 'Belk Digital provides custom web design, SaaS development, and outcome-based SEO services across all 50 U.S. states. Explore your state and services.',
        isPartOf: { '@id': `${baseUrl}/#website` },
        publisher: { '@id': `${baseUrl}/#organization` }
    };

    // 2. ItemList Schema (mapping states to their custom web design pSEO pages)
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'U.S. State Dynamic Service Hubs',
        numberOfItems: Object.keys(US_STATES).length,
        itemListElement: Object.entries(US_STATES).map(([slug, name], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${name} Digital Services`,
            url: `${baseUrl}/${lang}/services/custom-web-design/${slug}`
        }))
    };

    // 3. Organization Schema
    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Belk Digital',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
            'https://linkedin.com/company/belk-digital',
            'https://twitter.com/belkdigital'
        ]
    };

    return (
        <>
            <PageJsonLd
                type="WebPage"
                url={pageUrl}
                name={`${dict.nav.areasWeServe} Across the United States | Belk Digital`}
                description="Belk Digital provides custom web design, SaaS development, and outcome-based SEO services across all 50 U.S. states. Explore your state and services."
                breadcrumb={[
                    { name: 'Home', url: `${baseUrl}/${lang}` },
                    { name: dict.nav.areasWeServe, url: pageUrl }
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            <AreasWeServe />
        </>
    );
}
