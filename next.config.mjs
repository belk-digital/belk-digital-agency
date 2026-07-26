/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,

    // Whitelist domains for next/image if needed in future
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
            {
                protocol: 'https',
                hostname: 'unpkg.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // Build output configuration (if needed for standalone/export)
    // output: 'standalone',
    experimental: {
        cpus: 4,
    },
    async redirects() {
        return [
            {
                source: '/pricing',
                destination: '/en/contact',
                permanent: true,
            },
            {
                source: '/clients',
                destination: '/en/work',
                permanent: true,
            },
            {
                source: '/signup',
                destination: '/en/contact',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/en/contact',
                permanent: true,
            },
            {
                source: '/forgot-password',
                destination: '/en/contact',
                permanent: true,
            },
            {
                source: '/studio',
                destination: '/en',
                permanent: true,
            },
            {
                source: '/cookie-policy',
                destination: '/en/privacy',
                permanent: true,
            },
            {
                source: '/products',
                destination: '/en/services',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;

