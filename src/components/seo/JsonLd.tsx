export default function JsonLd() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://belkdigital.com/#organization',
        name: 'Belk Digital',
        url: 'https://belkdigital.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://belkdigital.com/logo.png',
            width: 300,
            height: 60,
        },
        email: 'contact@belkdigital.com',
        description: 'Belk Digital is a global digital agency delivering premium web design, web development, SaaS, and SEO services to businesses in the US, Europe, GCC, and Australia.',
        areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Country', name: 'Saudi Arabia' },
            { '@type': 'Country', name: 'Australia' },
            { '@type': 'Country', name: 'Canada' },
        ],
        sameAs: [
            'https://www.linkedin.com/company/belkdigital',
            'https://twitter.com/BelkDigital',
        ],
        knowsAbout: [
            'Web Design',
            'Web Development',
            'SaaS Development',
            'Search Engine Optimization',
            'UI/UX Design',
            'Digital Marketing',
            'Shopify Development',
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://belkdigital.com/#website',
        url: 'https://belkdigital.com',
        name: 'Belk Digital',
        description: 'Premium Web Design & Digital Agency',
        publisher: {
            '@id': 'https://belkdigital.com/#organization',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://belkdigital.com/en/blog?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
