import { constructMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import FAQ from '@/screens/FAQ';
import PageJsonLd from '@/components/seo/PageJsonLd';
import { faqDataEN } from '@/i18n/faqData';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
            locale: lang,
            title: dict.seo.faq.title,
        description: dict.seo.faq.description,
        path: '/faq'
        });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    // Build flat list of all Q&A pairs from English data for structured data
    const allQuestions = faqDataEN.flatMap((category) =>
        category.questions.map(({ q, a }) => ({ question: q, answer: a }))
    );

    return (
        <>
            <PageJsonLd
                type="FAQPage"
                questions={allQuestions}
            />
            <FAQ />
        </>
    );
}
