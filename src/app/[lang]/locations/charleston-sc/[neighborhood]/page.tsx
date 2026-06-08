import { CharlestonNeighborhood } from '@/screens/CharlestonNeighborhood';
import { constructMetadata } from '@/lib/seo';
import { i18n } from '@/lib/i18n-config';
import CharlestonNeighborhoodJsonLd from '@/components/seo/CharlestonNeighborhoodJsonLd';
import type { Metadata } from 'next';

const NEIGHBORHOOD_META: Record<string, { title: string; description: string }> = {
    'downtown': {
        title: 'Web Design & Digital Marketing in Downtown Charleston, SC | Belk Digital',
        description: 'Belk Digital helps Downtown Charleston businesses grow with custom web design, local SEO, and digital marketing. Get found by customers on the Charleston peninsula.',
    },
    'mount-pleasant': {
        title: 'Web Design & Digital Marketing in Mount Pleasant, SC | Belk Digital',
        description: 'Belk Digital serves Mount Pleasant, SC businesses with custom websites and local SEO. Capture customers in one of Charleston\'s fastest-growing communities.',
    },
    'north-charleston': {
        title: 'Web Design & Digital Marketing in North Charleston, SC | Belk Digital',
        description: 'Belk Digital helps North Charleston businesses build powerful online presences with custom web design and local SEO strategies that drive measurable results.',
    },
    'west-ashley': {
        title: 'Web Design & Digital Marketing in West Ashley, SC | Belk Digital',
        description: 'Belk Digital serves West Ashley businesses with local SEO, custom websites, and digital marketing tailored to Charleston\'s western suburbs.',
    },
    'james-island': {
        title: 'Web Design & Digital Marketing in James Island, SC | Belk Digital',
        description: 'Belk Digital helps James Island, SC businesses grow online with custom web design and local SEO. Stand out in the Charleston market.',
    },
    'johns-island': {
        title: 'Web Design & Digital Marketing in Johns Island, SC | Belk Digital',
        description: 'Belk Digital helps Johns Island, SC businesses grow their digital presence with custom websites and local SEO tailored to the Lowcountry.',
    },
    'daniel-island': {
        title: 'Web Design & Digital Marketing in Daniel Island, SC | Belk Digital',
        description: 'Belk Digital serves Daniel Island businesses and professionals with premium web design, local SEO, and digital marketing that matches this community\'s standard.',
    },
    'summerville': {
        title: 'Web Design & Digital Marketing in Summerville, SC | Belk Digital',
        description: 'Belk Digital helps Summerville, SC businesses grow with custom websites and local SEO. Reach the area\'s rapidly growing population online.',
    },
};

export async function generateStaticParams() {
    const neighborhoods = Object.keys(NEIGHBORHOOD_META);
    return i18n.locales.flatMap((lang) =>
        neighborhoods.map((neighborhood) => ({ lang, neighborhood }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
    const { neighborhood } = await params;
    const meta = NEIGHBORHOOD_META[neighborhood];

    if (!meta) {
        return constructMetadata({
            title: 'Charleston SC Local Digital Services | Belk Digital',
            description: 'Belk Digital provides web design and digital marketing services across Charleston, SC and surrounding neighborhoods.',
            path: `/locations/charleston-sc/${neighborhood}`,
        });
    }

    return constructMetadata({
        title: meta.title,
        description: meta.description,
        path: `/locations/charleston-sc/${neighborhood}`,
    });
}

export default async function NeighborhoodPage({
    params,
}: {
    params: Promise<{ neighborhood: string }>;
}) {
    const { neighborhood } = await params;
    return (
        <>
            <CharlestonNeighborhoodJsonLd neighborhood={neighborhood} />
            <CharlestonNeighborhood />
        </>
    );
}
