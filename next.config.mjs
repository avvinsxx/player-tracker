/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.communitydragon.org',
            },
            {
                protocol: 'https',
                hostname: 'raw.communitydragon.org',
            },
            {
                protocol: 'https',
                hostname: 'avatars.steamstatic.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.cloudflare.steamstatic.com'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: false,
            },
        ]
    },


};

export default nextConfig;
