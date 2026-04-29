import { languages } from '@/lib/i18n-config';

const BASE_URL = 'https://belkdigital.com';
const OG_IMAGE = '/assets/og (1).png';

export function getHreflang(path: string = ''): {
    canonical: string;
    languages: Record<string, string>;
} {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    const languageAlternates: Record<string, string> = {};

    languages.forEach((lang) => {
        languageAlternates[lang.code] = `${BASE_URL}/${lang.code}${cleanPath}`;
    });

    // Add x-default pointing to English
    languageAlternates['x-default'] = `${BASE_URL}/en${cleanPath}`;

    return {
        canonical: `${BASE_URL}/en${cleanPath}`,
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
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
}) {
    const alternates = getHreflang(path);
    const ogImage = image || OG_IMAGE;
    const pageUrl = `${BASE_URL}/en${path}`;

    return {
        metadataBase: new URL(BASE_URL),
        title,
        description,
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
