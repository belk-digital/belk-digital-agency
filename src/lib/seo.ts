import { languages } from '@/lib/i18n-config';

const BASE_URL = 'https://www.belkdigital.com';
const OG_IMAGE = '/assets/og (1).png';

export function getHreflang(path: string = '', locale?: string): {
    canonical: string;
    languages: Record<string, string>;
} {
    const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);

    const languageAlternates: Record<string, string> = {};

    languages.forEach((lang) => {
        languageAlternates[lang.code] = `${BASE_URL}/${lang.code}${cleanPath}`;
    });

    // Add x-default pointing to English
    languageAlternates['x-default'] = `${BASE_URL}/en${cleanPath}`;

    const canonicalLocale = locale || 'en';

    return {
        canonical: `${BASE_URL}/${canonicalLocale}${cleanPath}`,
        languages: languageAlternates,
    };
}

export function constructMetadata({
    title,
    description,
    path = '',
    image,
    type = 'website',
    noIndex = false,
    locale,
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    locale?: string;
}) {
    const alternates = getHreflang(path, locale);
    const ogImage = image || OG_IMAGE;
    const pageUrl = `${BASE_URL}/${locale || 'en'}${path === '/' ? '' : path}`;

    return {
        metadataBase: new URL(BASE_URL),
        title,
        description,
        authors: [{ name: 'Belk Digital', url: BASE_URL }],
        creator: 'Belk Digital',
        publisher: 'Belk Digital',
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true, googleBot: { index: true, follow: true } },
        alternates: {
            canonical: alternates.canonical,
            languages: alternates.languages,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: 'Belk Digital',
            type,
            locale: 'en_US',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            site: '@BelkDigital',
            creator: '@BelkDigital',
        },
    };
}
