import { languages } from '@/lib/i18n-config';

const BASE_URL = 'https://www.belkdigital.com';
const OG_IMAGE = '/assets/og (1).png';

const OG_LOCALES: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
};

export function getHreflang(
    path: string = '',
    locale?: string,
    availableLocales?: string[]
): {
    canonical: string;
    languages: Record<string, string>;
} {
    const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);

    const languageAlternates: Record<string, string> = {};

    const targetLanguages = availableLocales
        ? languages.filter((lang) => availableLocales.includes(lang.code))
        : languages;

    targetLanguages.forEach((lang) => {
        languageAlternates[lang.code] = `${BASE_URL}/${lang.code}${cleanPath}`;
    });

    // Add x-default pointing to English if English is among available locales (or by default)
    if (!availableLocales || availableLocales.includes('en')) {
        languageAlternates['x-default'] = `${BASE_URL}/en${cleanPath}`;
    }

    // If current locale is not genuinely available, canonicalize to English (or primary available locale)
    const effectiveCanonicalLocale = (availableLocales && locale && !availableLocales.includes(locale))
        ? (availableLocales[0] || 'en')
        : (locale || 'en');

    return {
        canonical: `${BASE_URL}/${effectiveCanonicalLocale}${cleanPath}`,
        languages: languageAlternates,
    };
}

export function constructMetadata({
    keywords,
    title,
    description,
    path = '',
    image,
    type = 'website',
    noIndex = false,
    locale,
    availableLocales,
    imageAlt,
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    locale?: string;
    keywords?: string[];
    availableLocales?: string[];
}) {
    const alternates = getHreflang(path, locale, availableLocales);
    const ogImage = image || OG_IMAGE;
    const pageUrl = `${BASE_URL}/${locale || 'en'}${path === '/' ? '' : path}`;
    const ogLocale = (locale && OG_LOCALES[locale.toLowerCase()]) || 'en_US';

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
            locale: ogLocale,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: imageAlt || title,
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
