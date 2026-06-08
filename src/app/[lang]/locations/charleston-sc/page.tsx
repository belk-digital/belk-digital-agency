import { CharlestonSC } from '@/screens/CharlestonSC';
import { constructMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return constructMetadata({
        title: 'Web Design & Digital Marketing Agency in Charleston, SC | Belk Digital',
        description: 'Belk Digital is a web design and digital marketing agency serving Charleston, SC. We help Lowcountry businesses grow online with local SEO, custom websites, and results-driven marketing.',
        path: '/locations/charleston-sc',
    });
}

export default function CharlestonSCPage() {
    return <CharlestonSC />;
}
