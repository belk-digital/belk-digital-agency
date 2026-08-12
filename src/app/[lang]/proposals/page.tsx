import { Proposals } from '@/screens/Proposals';
import { constructMetadata } from '@/lib/seo';
import { i18n } from '@/lib/i18n-config';
import type { Metadata } from 'next';

export function generateStaticParams() {
    return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    return constructMetadata({
        locale: lang,
        title: 'Client Proposals | Belk Digital',
        description: 'Custom digital growth proposals from Belk Digital — covering web design, development, SEO retainers, and AI-powered marketing systems.',
        path: '/proposals',
    });
}

export default function ProposalsPage() {
    return <Proposals />;
}
