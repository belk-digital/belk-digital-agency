import { i18n, Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/i18n';
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Layout as AppLayout } from '@/components/layout/Layout';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomScrollbar } from '@/components/ui/CustomScrollbar';
import { Preloader } from '@/components/ui/Preloader';
import { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.belkdigital.com'),
    title: {
        default: 'Belk Digital | Premium Web Design & Digital Agency',
        template: '%s | Belk Digital',
    },
    description: 'Belk Digital delivers high-performance websites and expert digital strategies to help businesses elevate their online presence globally.',
    icons: {
        icon: '/favicon.png',
    },
    verification: {
        google: 'sBaajTez7z9DFfQbQ3OumVRXJiidx-yTFabbuT2eMQE',
    },
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const dir = 'ltr'; // Hardcoded as ltr because all current languages (en, es, fr, de) are ltr

    return (
        <html lang={lang} dir={dir} suppressHydrationWarning>
            <head>
                {/* Google tag (gtag.js) */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-597Q1N3GPZ" strategy="afterInteractive" />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-597Q1N3GPZ');
                    `}
                </Script>

                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://api.fontshare.com" />

                {/* Fonts */}
                <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet" />

                {/* Theme color */}
                <meta name="theme-color" content="#0A0A0A" />

                <JsonLd />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <Preloader />
                <Providers dictionary={dict} language={lang as Locale} dir={dir}>
                    <SmoothScroll>
                        <CustomScrollbar />
                        <AppLayout>
                            {children}
                        </AppLayout>
                    </SmoothScroll>
                </Providers>
                <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" />
            </body>
        </html >
    );
}
