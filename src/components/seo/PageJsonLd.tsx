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
}

interface ServiceSchemaProps {
    type: 'Service';
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    areaServed?: string[];
    breadcrumb?: Array<{ name: string; url: string }>;
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
            isPartOf: { '@id': 'https://belkdigital.com/#website' },
            publisher: { '@id': 'https://belkdigital.com/#organization' },
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
                '@id': 'https://belkdigital.com/#organization',
                name: props.authorName || 'Belk Digital',
            },
            publisher: { '@id': 'https://belkdigital.com/#organization' },
            isPartOf: { '@id': 'https://belkdigital.com/#website' },
            ...(props.image && {
                image: { '@type': 'ImageObject', url: props.image },
            }),
        });

        // Add BreadcrumbList for blog posts
        schemas.push({
            '@context': 'https://schema.org',
            ...buildBreadcrumb([
                { name: 'Home', url: 'https://belkdigital.com/en' },
                { name: 'Blog', url: 'https://belkdigital.com/en/blog' },
                { name: props.headline, url: props.url },
            ]),
        });
    }

    if (props.type === 'Service') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: props.name,
            description: props.description,
            url: props.url,
            provider: { '@id': 'https://belkdigital.com/#organization' },
            ...(props.serviceType && { serviceType: props.serviceType }),
            ...(props.areaServed && {
                areaServed: props.areaServed.map((area) => ({
                    '@type': 'Country',
                    name: area,
                })),
            }),
        });

        // Add BreadcrumbList for service pages
        schemas.push({
            '@context': 'https://schema.org',
            ...buildBreadcrumb(
                props.breadcrumb || [
                    { name: 'Home', url: 'https://belkdigital.com/en' },
                    { name: 'Services', url: 'https://belkdigital.com/en/services' },
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
