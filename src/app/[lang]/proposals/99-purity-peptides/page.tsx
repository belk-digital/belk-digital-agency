import { PeptideProposal } from '@/screens/PeptideProposal';
import { constructMetadata } from '@/lib/seo';
import { i18n } from '@/lib/i18n-config';
import type { Metadata } from 'next';

export function generateStaticParams() {
    return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
    return constructMetadata({
        title: 'Digital Growth Proposal — 99 Purity Peptides × Belk Digital',
        description: 'A complete digital growth proposal for 99 Purity Peptides: RUO storefront, telehealth platform, SEO retainers, and AI lead generation.',
        path: '/proposals/99-purity-peptides',
    });
}

export default function PeptideProposalPage() {
    return <PeptideProposal />;
}
