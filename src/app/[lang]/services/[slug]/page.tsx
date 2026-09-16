import Services from '@/screens/Services';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { notFound } from 'next/navigation';
import { SERVICE_SLUGS } from '@/lib/services';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;

    if (!SERVICE_SLUGS.includes(slug)) {
        return {};
    }

    const dict = await getDictionary(lang as Locale);

    // Find service to get specific title/description
    const service = dict.services?.items?.find((item: any) => item.slug === slug);
    if (!service) {
        return {};
    }

    const title = `${service.title} - Belk Digital`;
    const description = service.description;

    return constructMetadata({
        locale: lang,
        title,
        description,
        path: `/services/${slug}`
    });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;

    if (!SERVICE_SLUGS.includes(slug)) {
        notFound();
    }

    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);

    if (!service) {
        notFound();
    }

    const title = `${service.title} - Belk Digital`;
    const description = service.description;

    return (
        <>
            <PageJsonLd
                type="Service"
                name={title}
                description={description}
                url={`https://belkdigital.com/${lang}/services/${slug}`}
                serviceType={service?.title}
                areaServed={['United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Australia', 'Canada']}
            />
            <Services />
        </>
    );
}
