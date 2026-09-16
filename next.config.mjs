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

    async redirects() {
        return [
            {
                source: '/case-studies',
                destination: '/work',
                permanent: true,
            },
            {
                source: '/:lang(en|es|fr|de)/case-studies',
                destination: '/:lang/work',
                permanent: true,
            },
            {
                source: '/portfolio',
                destination: '/work',
                permanent: true,
            },
            {
                source: '/:lang(en|es|fr|de)/portfolio',
                destination: '/:lang/work',
                permanent: true,
            },
        ];
    },

    // Build output configuration (if needed for standalone/export)
    // output: 'standalone',
    experimental: {
        cpus: 4,
    },
};

export default nextConfig;
