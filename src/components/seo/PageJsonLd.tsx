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
}

interface FAQSchemaProps {
    type: 'FAQPage';
    questions: Array<{ question: string; answer: string }>;
}

type PageJsonLdProps =
    | WebPageSchemaProps
    | ArticleSchemaProps
    | ServiceSchemaProps
    | FAQSchemaProps;

export default function PageJsonLd(props: PageJsonLdProps) {
    let schema: Record<string, unknown> = {};

    if (props.type === 'WebPage') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': props.url,
            url: props.url,
            name: props.name,
            description: props.description,
            isPartOf: { '@id': 'https://belkdigital.com/#website' },
            publisher: { '@id': 'https://belkdigital.com/#organization' },
            ...(props.breadcrumb && {
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: props.breadcrumb.map((item, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.name,
                        item: item.url,
                    })),
                },
            }),
        };
    }

    if (props.type === 'Article') {
        schema = {
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
                image: {
                    '@type': 'ImageObject',
                    url: props.image,
                },
            }),
        };
    }

    if (props.type === 'Service') {
        schema = {
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
        };
    }

    if (props.type === 'FAQPage') {
        schema = {
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
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
