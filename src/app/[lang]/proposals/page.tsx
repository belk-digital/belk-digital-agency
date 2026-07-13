import { Proposals } from '@/screens/Proposals';
import { constructMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return constructMetadata({
        title: 'Client Proposals | Belk Digital',
        description: 'Custom digital growth proposals from Belk Digital — covering web design, development, SEO retainers, and AI-powered marketing systems.',
        path: '/proposals',
    });
}

export default function ProposalsPage() {
    return <Proposals />;
}
