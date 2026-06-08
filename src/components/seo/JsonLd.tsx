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
        description: 'Belk Digital is a full-service digital agency specializing in Next.js web development, WordPress development, technical SEO, and custom web design for businesses in the United States, Europe, GCC, and Australia.',
        areaServed: [
            // Countries
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Country', name: 'Saudi Arabia' },
            { '@type': 'Country', name: 'Australia' },
            { '@type': 'Country', name: 'Canada' },
            // US cities — Charleston metro (primary local market)
            { '@type': 'City', name: 'Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Mount Pleasant', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'North Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Summerville', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Goose Creek', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            // US cities — other major markets
            { '@type': 'City', name: 'New York City', containedInPlace: { '@type': 'State', name: 'New York' } },
            { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
        ],
        sameAs: [
            'https://www.linkedin.com/company/belkdigital',
            'https://twitter.com/BelkDigital',
            'https://clutch.co/profile/belk-digital',
        ],
        knowsAbout: [
            'Next.js Development',
            'WordPress Development',
            'Web Design',
            'Web Development',
            'Search Engine Optimization',
            'Technical SEO',
            'SaaS Development',
            'UI/UX Design',
            'Shopify Development',
            'WooCommerce Development',
            'Headless CMS Development',
            'Core Web Vitals Optimization',
            'Digital Marketing',
            'Website Redesign',
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://belkdigital.com/#website',
        url: 'https://belkdigital.com',
        name: 'Belk Digital',
        description: 'Next.js & WordPress Web Development Agency | SEO & Custom Web Design',
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

    const professionalServiceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://belkdigital.com/#service',
        name: 'Belk Digital',
        url: 'https://belkdigital.com',
        image: 'https://belkdigital.com/logo.png',
        description: 'Full-service digital agency offering Next.js development, WordPress development, SEO, web design, and SaaS development for US businesses.',
        priceRange: '$$',
        email: 'contact@belkdigital.com',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Agency Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Next.js Web Development',
                        description: 'Custom high-performance web applications built with Next.js and React, optimized for SEO and Core Web Vitals.',
                        url: 'https://belkdigital.com/en/services/web-development',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'WordPress Development',
                        description: 'Custom WordPress websites, WooCommerce stores, and headless WordPress builds.',
                        url: 'https://belkdigital.com/en/services/web-development',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Search Engine Optimization (SEO)',
                        description: 'Technical SEO, on-page optimization, content strategy, and Core Web Vitals improvement for US businesses.',
                        url: 'https://belkdigital.com/en/services/seo-optimization',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Custom Web Design',
                        description: 'Brand-aligned, conversion-focused web design and UI/UX for startups and businesses.',
                        url: 'https://belkdigital.com/en/services/custom-web-design',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Shopify Development',
                        description: 'Custom Shopify themes, Shopify Plus, and e-commerce optimization for US brands.',
                        url: 'https://belkdigital.com/en/services/shopify-development',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'SaaS Development',
                        description: 'Full-stack SaaS platform development with Next.js, Node.js, and cloud infrastructure.',
                        url: 'https://belkdigital.com/en/services/web-development',
                    },
                },
            ],
        },
        areaServed: [
            // Countries
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Country', name: 'Australia' },
            { '@type': 'Country', name: 'Canada' },
            // US cities — Charleston metro (primary local market)
            { '@type': 'City', name: 'Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Mount Pleasant', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'North Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Summerville', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
            { '@type': 'City', name: 'Goose Creek', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
        ],
        provider: {
            '@id': 'https://belkdigital.com/#organization',
        },
        sameAs: [
            'https://clutch.co/profile/belk-digital',
            'https://www.linkedin.com/company/belkdigital',
        ],
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
        </>
    );
}
