/**
 * PageJsonLd — inject page-specific structured data schemas.
 * Usage: place inside the page component's JSX, not in <head>.
 * Next.js will hoist <script> tags appropriately.
 */

interface WebPageSchemaProps {
    type: 'WebPage';
    url: string;
    name: string;
    description: string;
    breadcrumb?: Array<{ name: string; url: string }>;
    lang?: string;
}

interface ArticleSchemaProps {
    type: 'Article';
    url: string;
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    image?: string;
    breadcrumb?: Array<{ name: string; url: string }>;
    lang?: string;
}

interface ServiceSchemaProps {
    type: 'Service';
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    areaServed?: string[];
    breadcrumb?: Array<{ name: string; url: string }>;
    lang?: string;
}

interface FAQSchemaProps {
    type: 'FAQPage';
    questions: Array<{ question: string; answer: string }>;
}

interface SpeakableSchemaProps {
    type: 'Speakable';
    url: string;
    cssSelectors: string[];
}

type PageJsonLdProps =
    | WebPageSchemaProps
    | ArticleSchemaProps
    | ServiceSchemaProps
    | FAQSchemaProps
    | SpeakableSchemaProps;

type SupportedLocale = 'en' | 'es' | 'fr' | 'de';

const CANONICAL_DOMAIN = 'https://www.belkdigital.com';

const BREADCRUMB_LABELS: Record<SupportedLocale, { home: string; services: string; blog: string }> = {
    en: { home: 'Home', services: 'Services', blog: 'Blog' },
    es: { home: 'Inicio', services: 'Servicios', blog: 'Blog' },
    fr: { home: 'Accueil', services: 'Services', blog: 'Blog' },
    de: { home: 'Startseite', services: 'Dienstleistungen', blog: 'Blog' },
};

function resolveLocale(lang?: string, url?: string): SupportedLocale {
    if (lang && (lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'de')) {
        return lang;
    }
    if (url) {
        try {
            const pathname = new URL(url).pathname;
            const segment = pathname.split('/')[1]?.toLowerCase();
            if (segment === 'en' || segment === 'es' || segment === 'fr' || segment === 'de') {
                return segment;
            }
        } catch {
            const match = url.match(/(?:\/|^)(en|es|fr|de)(?:\/|$)/i);
            if (match) {
                return match[1].toLowerCase() as SupportedLocale;
            }
        }
    }
    return 'en';
}

const buildBreadcrumb = (items: Array<{ name: string; url: string }>) => ({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

export default function PageJsonLd(props: PageJsonLdProps) {
    const schemas: Record<string, unknown>[] = [];

    if (props.type === 'WebPage') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': props.url,
            url: props.url,
            name: props.name,
            description: props.description,
            isPartOf: { '@id': 'https://www.belkdigital.com/#website' },
            publisher: { '@id': 'https://www.belkdigital.com/#organization' },
            ...(props.breadcrumb && { breadcrumb: buildBreadcrumb(props.breadcrumb) }),
        });
    }

    if (props.type === 'Article') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': props.url,
            headline: props.headline,
            description: props.description,
            url: props.url,
            datePublished: props.datePublished,
            dateModified: props.dateModified || props.datePublished,
            author: {
                '@type': 'Organization',
                '@id': 'https://www.belkdigital.com/#organization',
                name: props.authorName || 'Belk Digital',
            },
            publisher: { '@id': 'https://www.belkdigital.com/#organization' },
            isPartOf: { '@id': 'https://www.belkdigital.com/#website' },
            ...(props.image && {
                image: { '@type': 'ImageObject', url: props.image },
            }),
        });

        // Add BreadcrumbList for blog posts
        const articleLocale = resolveLocale(props.lang, props.url);
        const articleLabels = BREADCRUMB_LABELS[articleLocale];
        schemas.push({
            '@context': 'https://schema.org',
            ...buildBreadcrumb(
                props.breadcrumb || [
                    { name: articleLabels.home, url: `${CANONICAL_DOMAIN}/${articleLocale}` },
                    { name: articleLabels.blog, url: `${CANONICAL_DOMAIN}/${articleLocale}/blog` },
                    { name: props.headline, url: props.url },
                ]
            ),
        });
    }

    if (props.type === 'Service') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: props.name,
            description: props.description,
            url: props.url,
            provider: { '@id': 'https://www.belkdigital.com/#organization' },
            ...(props.serviceType && { serviceType: props.serviceType }),
            ...(props.areaServed && {
                areaServed: props.areaServed.map((area) => ({
                    '@type': 'Country',
                    name: area,
                })),
            }),
        });

        // Add BreadcrumbList for service pages
        const serviceLocale = resolveLocale(props.lang, props.url);
        const serviceLabels = BREADCRUMB_LABELS[serviceLocale];
        schemas.push({
            '@context': 'https://schema.org',
            ...buildBreadcrumb(
                props.breadcrumb || [
                    { name: serviceLabels.home, url: `${CANONICAL_DOMAIN}/${serviceLocale}` },
                    { name: serviceLabels.services, url: `${CANONICAL_DOMAIN}/${serviceLocale}/services` },
                    { name: props.name, url: props.url },
                ]
            ),
        });
    }

    if (props.type === 'FAQPage') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: props.questions.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answer,
                },
            })),
        });
    }

    if (props.type === 'Speakable') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': props.url,
            speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: props.cssSelectors,
            },
            url: props.url,
        });
    }

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
