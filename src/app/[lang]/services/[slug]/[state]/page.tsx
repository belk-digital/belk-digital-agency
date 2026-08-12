import Services from '@/screens/Services';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale, i18n } from '@/lib/i18n-config';
import { Metadata } from 'next';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { US_STATES } from '@/lib/states';
import { getPSEOTemplates } from '@/lib/pseo-templates';
import { notFound } from 'next/navigation';

const SERVICE_SLUGS = [
    'custom-web-design',
    'website-redesign',
    'branding',
    'ui-ux-design',
    'web-development',
    'seo-optimization',
    'maintenance',
    'shopify-development',
    'custom-cms',
    'telehealth-development',
    'ecommerce-development',
    'ai-solutions',
    'ai-lead-generation',
    'performance-marketing',
    'social-media-ugc',
    'geo-optimization',
    'aeo-optimization',
    'mobile-development',
    'api-integrations',
    'cloud-infrastructure'
];

export async function generateStaticParams() {
    const states = Object.keys(US_STATES);

    return i18n.locales.flatMap((lang) =>
        SERVICE_SLUGS.flatMap((slug) =>
            states.map((state) => ({
                lang,
                slug,
                state,
            }))
        )
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string; state: string }>;
}): Promise<Metadata> {
    const { lang, slug, state } = await params;

    if (!SERVICE_SLUGS.includes(slug) || !US_STATES[state]) {
        return {};
    }

    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);
    if (!service) {
        return {};
    }

    const stateName = US_STATES[state];
    const pSEO = getPSEOTemplates(lang, slug, service.title, state, stateName);

    const title = `${pSEO.detailTitle} | Belk Digital`;
    const description = pSEO.detailSubtitle;

    // Soft-clamp metadata lengths to SEO recommended character guidelines
    const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

    return constructMetadata({
            locale: lang,
            title: optimizedTitle,
        description: optimizedDescription,
        path: `/services/${slug}/${state}`,
        });
}

export default async function ServiceStateDetailPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string; state: string }>;
}) {
    const { lang, slug, state } = await params;

    if (!SERVICE_SLUGS.includes(slug) || !US_STATES[state]) {
        notFound();
    }

    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);
    if (!service) {
        notFound();
    }

    const stateName = US_STATES[state];
    const pSEO = getPSEOTemplates(lang, slug, service.title, state, stateName);

    const title = `${pSEO.detailTitle} | Belk Digital`;
    const description = pSEO.detailSubtitle;

    return (
        <>
            <PageJsonLd
                type="Service"
                name={title}
                description={description}
                url={`https://belkdigital.com/${lang}/services/${slug}/${state}`}
                serviceType={service?.title || 'Custom Web Design & UI/UX'}
                areaServed={[stateName, 'United States']}
                breadcrumb={[
                    { name: 'Home', url: `https://belkdigital.com/${lang}` },
                    { name: 'Services', url: `https://belkdigital.com/${lang}/services` },
                    { name: service?.title || 'Custom Web Design & UI/UX', url: `https://belkdigital.com/${lang}/services/${slug}` },
                    { name: `${service?.title || 'Service'} in ${stateName}`, url: `https://belkdigital.com/${lang}/services/${slug}/${state}` },
                ]}
            />
            <Services />
        </>
    );
}
