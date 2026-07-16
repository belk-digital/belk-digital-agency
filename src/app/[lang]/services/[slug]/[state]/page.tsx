import Services from '@/screens/Services';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale, i18n } from '@/lib/i18n-config';
import { Metadata } from 'next';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { US_STATES } from '@/lib/states';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const states = Object.keys(US_STATES);
    const slug = 'custom-web-design';

    return i18n.locales.flatMap((lang) =>
        states.map((state) => ({
            lang,
            slug,
            state,
        }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string; state: string }>;
}): Promise<Metadata> {
    const { lang, slug, state } = await params;

    if (slug !== 'custom-web-design' || !US_STATES[state]) {
        return {};
    }

    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);
    const stateName = US_STATES[state];

    const baseTitle = service ? service.title : dict.seo.services.title;
    const serviceTitle = service?.detailTitle || baseTitle;
    const title = `${serviceTitle} in ${stateName} - Belk Digital`;
    const description = `We provide ${serviceTitle} in ${stateName} and across the United States, focused on performance, scalability, and measurable results.`;

    return constructMetadata({
        title,
        description,
        path: `/services/${slug}/${state}`,
    });
}

export default async function ServiceStateDetailPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string; state: string }>;
}) {
    const { lang, slug, state } = await params;

    if (slug !== 'custom-web-design' || !US_STATES[state]) {
        notFound();
    }

    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);
    const stateName = US_STATES[state];

    const baseTitle = service ? service.title : dict.seo.services.title;
    const serviceTitle = service?.detailTitle || baseTitle;
    const title = `${serviceTitle} in ${stateName} - Belk Digital`;
    const description = `We provide ${serviceTitle} in ${stateName} and across the United States, focused on performance, scalability, and measurable results.`;

    return (
        <>
            <PageJsonLd
                type="Service"
                name={title}
                description={description}
                url={`https://belkdigital.com/${lang}/services/${slug}/${state}`}
                serviceType={service?.title}
                areaServed={[stateName, 'United States']}
            />
            <Services />
        </>
    );
}
