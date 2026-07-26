const BASE_URL = 'https://www.belkdigital.com';

interface NeighborhoodMeta {
    name: string;
    description: string;
    postalCode: string;
    latitude: number;
    longitude: number;
}

const NEIGHBORHOOD_DATA: Record<string, NeighborhoodMeta> = {
    'downtown': {
        name: 'Downtown Charleston',
        description: 'Belk Digital provides web design, local SEO, and digital marketing for businesses in Downtown Charleston, SC — helping restaurants, law firms, boutiques, and hospitality businesses grow online.',
        postalCode: '29401',
        latitude: 32.7765,
        longitude: -79.9311,
    },
    'mount-pleasant': {
        name: 'Mount Pleasant',
        description: 'Belk Digital serves Mount Pleasant, SC businesses with custom web design, local SEO, and digital marketing that drives growth in one of the Charleston area\'s fastest-growing communities.',
        postalCode: '29464',
        latitude: 32.8323,
        longitude: -79.8284,
    },
    'north-charleston': {
        name: 'North Charleston',
        description: 'Belk Digital helps North Charleston, SC businesses build powerful online presences with custom websites and local SEO strategies that attract more customers.',
        postalCode: '29405',
        latitude: 32.8546,
        longitude: -79.9748,
    },
    'west-ashley': {
        name: 'West Ashley',
        description: 'Belk Digital provides web design and local SEO services to West Ashley businesses, helping them rank higher in Charleston-area search results and convert more website visitors.',
        postalCode: '29414',
        latitude: 32.7607,
        longitude: -80.0300,
    },
    'james-island': {
        name: 'James Island',
        description: 'Belk Digital helps James Island, SC businesses grow online with professionally designed websites and local SEO that connects them with customers across the Charleston area.',
        postalCode: '29412',
        latitude: 32.7357,
        longitude: -79.9748,
    },
    'johns-island': {
        name: 'Johns Island',
        description: 'Belk Digital serves Johns Island, SC businesses with custom websites and local SEO tailored to the character and growth of the Lowcountry\'s largest island.',
        postalCode: '29455',
        latitude: 32.6835,
        longitude: -80.0487,
    },
    'daniel-island': {
        name: 'Daniel Island',
        description: 'Belk Digital provides premium web design and digital marketing for Daniel Island, SC businesses and professionals, matching the sophisticated standard of this master-planned community.',
        postalCode: '29492',
        latitude: 32.8643,
        longitude: -79.9007,
    },
    'summerville': {
        name: 'Summerville',
        description: 'Belk Digital helps Summerville, SC businesses grow online with custom websites and local SEO that connects them with the area\'s rapidly expanding population.',
        postalCode: '29483',
        latitude: 33.0185,
        longitude: -80.1756,
    },
};

interface Props {
    neighborhood: string;
}

export default function CharlestonNeighborhoodJsonLd({ neighborhood }: Props) {
    const data = NEIGHBORHOOD_DATA[neighborhood];
    if (!data) return null;

    const pageUrl = `${BASE_URL}/en/locations/charleston-sc/${neighborhood}`;

    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${pageUrl}#localbusiness`,
        name: `Belk Digital — Web Design & Digital Marketing in ${data.name}, SC`,
        url: pageUrl,
        email: 'contact@belkdigital.com',
        description: data.description,
        image: `${BASE_URL}/logo.png`,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: data.name,
            addressRegion: 'SC',
            postalCode: data.postalCode,
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude,
        },
        areaServed: [
            { '@type': 'City', name: data.name },
            {
                '@type': 'City',
                name: 'Charleston',
                sameAs: 'https://en.wikipedia.org/wiki/Charleston,_South_Carolina',
            },
        ],
        parentOrganization: {
            '@id': `${BASE_URL}/#organization`,
        },
        // When you have Google reviews, add aggregateRating here:
        // aggregateRating: {
        //   '@type': 'AggregateRating',
        //   ratingValue: '5.0',
        //   reviewCount: '12',
        //   bestRating: '5',
        //   worstRating: '1',
        // },
        sameAs: [
            'https://www.linkedin.com/company/belkdigital',
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
            { '@type': 'ListItem', position: 4, name: data.name, item: pageUrl },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
        </>
    );
}
