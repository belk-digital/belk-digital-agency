import Services from '@/screens/Services';
import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import PageJsonLd from '@/components/seo/PageJsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    // Find service to get specific title/description
    const service = dict.services?.items?.find((item: any) => item.slug === slug);

    // Fallback to generic services metadata if not found
    const title = service ? `${service.title} - Belk Digital` : dict.seo.services.title;
    const description = service ? service.description : dict.seo.services.description;

    return constructMetadata({
            locale: lang,
            title,
        description,
        path: `/services/${slug}`
        });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);
    const service = dict.services?.items?.find((item: any) => item.slug === slug);

    const title = service ? `${service.title} - Belk Digital` : dict.seo.services.title;
    const description = service ? service.description : dict.seo.services.description;

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
