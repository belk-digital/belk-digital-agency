import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/lib/i18n-config';

function getLocale(request: NextRequest): string {
    return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Explicitly return 404 for feed.xml and any sub-paths under it to prevent invalid locale routing
    if (pathname === '/feed.xml' || pathname.startsWith('/feed.xml/')) {
        return new NextResponse(null, { status: 404 });
    }

    // Match legacy routes and redirect them immediately to absolute, localized destinations
    const redirectMap: Record<string, string> = {
        '/pricing': 'https://www.belkdigital.com/en/contact',
        '/pricing/': 'https://www.belkdigital.com/en/contact',
        '/clients': 'https://www.belkdigital.com/en/work',
        '/clients/': 'https://www.belkdigital.com/en/work',
        '/login': 'https://www.belkdigital.com/en/contact',
        '/login/': 'https://www.belkdigital.com/en/contact',
        '/signup': 'https://www.belkdigital.com/en/contact',
        '/signup/': 'https://www.belkdigital.com/en/contact',
        '/forgot-password': 'https://www.belkdigital.com/en/contact',
        '/forgot-password/': 'https://www.belkdigital.com/en/contact',
        '/products': 'https://www.belkdigital.com/en/services',
        '/products/': 'https://www.belkdigital.com/en/services',
        '/cookie-policy': 'https://www.belkdigital.com/en/privacy',
        '/cookie-policy/': 'https://www.belkdigital.com/en/privacy',
        '/studio': 'https://www.belkdigital.com/en',
        '/studio/': 'https://www.belkdigital.com/en',
    };

    if (pathname in redirectMap) {
        const redirectUrl = new URL(redirectMap[pathname]);
        redirectUrl.search = request.nextUrl.search;
        return NextResponse.redirect(redirectUrl, {
            status: 308 // Permanent Redirect
        });
    }

    // 1. Exclude static files and API routes explicitly
    if (
        pathname.startsWith('/_next') || // Next.js internals
        pathname.startsWith('/api') ||   // API routes
        pathname.startsWith('/static') || // Static files
        pathname.includes('.') // Files with extensions (e.g. favicon.ico, images)
    ) {
        return NextResponse.next();
    }

    // 2. Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // 3. Handle missing locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // For the root path, rewrite internally to /en so the URL stays as /
        if (pathname === '/') {
            return NextResponse.rewrite(new URL(`/${locale}`, request.url));
        }

        // For all other paths without a locale, redirect to include the locale
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        console.log(`Middleware: Redirecting ${pathname} to ${newUrl.pathname}`);
        return NextResponse.redirect(newUrl);
    }
}


