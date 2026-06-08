const BASE_URL = 'https://belkdigital.com';

export default function CharlestonJsonLd() {
    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${BASE_URL}/en/locations/charleston-sc#localbusiness`,
        name: 'Belk Digital — Web Design & Digital Marketing Agency',
        alternateName: 'Belk Digital Charleston SC',
        url: `${BASE_URL}/en/locations/charleston-sc`,
        email: 'contact@belkdigital.com',
        description:
            'Belk Digital is a web design and digital marketing agency serving Charleston, SC and the surrounding Lowcountry. We help local businesses grow online with custom websites, local SEO, and results-driven digital marketing.',
        image: `${BASE_URL}/logo.png`,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Charleston',
            addressRegion: 'SC',
            postalCode: '29401',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 32.7765,
            longitude: -79.9311,
        },
        serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 32.7765,
                longitude: -79.9311,
            },
            // ~50 mile radius covering the full Charleston metro
            geoRadius: '80000',
        },
        areaServed: [
            {
                '@type': 'City',
                name: 'Charleston',
                sameAs: 'https://en.wikipedia.org/wiki/Charleston,_South_Carolina',
            },
            { '@type': 'City', name: 'Mount Pleasant' },
            { '@type': 'City', name: 'North Charleston' },
            { '@type': 'City', name: 'Summerville' },
            { '@type': 'City', name: 'Goose Creek' },
            { '@type': 'AdministrativeArea', name: 'West Ashley' },
            { '@type': 'AdministrativeArea', name: 'James Island' },
            { '@type': 'AdministrativeArea', name: 'Johns Island' },
            { '@type': 'AdministrativeArea', name: 'Daniel Island' },
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Services for Charleston SC Businesses',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Web Design Charleston SC',
                        description: 'Custom, conversion-focused websites for Charleston businesses.',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Local SEO Charleston SC',
                        description: 'Local search engine optimization to rank in Google Maps and organic results across the Charleston metro.',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Digital Marketing Charleston SC',
                        description: 'PPC, social media advertising, and content marketing for Lowcountry businesses.',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Website Redesign Charleston SC',
                        description: 'Modernize your existing website for speed, SEO, and lead generation.',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Web Development Charleston SC',
                        description: 'Scalable web and SaaS application development for Charleston companies.',
                    },
                },
            ],
        },
        parentOrganization: {
            '@id': `${BASE_URL}/#organization`,
        },
        sameAs: [
            'https://www.linkedin.com/company/belkdigital',
            'https://twitter.com/BelkDigital',
            'https://clutch.co/profile/belk-digital',
        ],
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/en` },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: `${BASE_URL}/en/locations` },
            { '@type': 'ListItem', position: 3, name: 'Charleston, SC', item: `${BASE_URL}/en/locations/charleston-sc` },
        ],
    };

    const webPage = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${BASE_URL}/en/locations/charleston-sc`,
        url: `${BASE_URL}/en/locations/charleston-sc`,
        name: 'Web Design & Digital Marketing Agency in Charleston, SC | Belk Digital',
        description:
            'Belk Digital helps Charleston, SC businesses grow online with custom web design, local SEO, and digital marketing built for the Lowcountry market.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        breadcrumb,
        about: { '@id': `${BASE_URL}/en/locations/charleston-sc#localbusiness` },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
            />
        </>
    );
}
