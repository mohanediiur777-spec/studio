import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    // 🛑 REMOVE 'output: 'export'': Vercel runs a full server, so you don't need a static export.
    // 🛑 REMOVE 'basePath': Vercel deploys to a root domain (your-app-name.vercel.app), so no subpath is needed.

    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // 🛑 REMOVE 'unoptimized: true': Vercel provides excellent image optimization, so we turn this off.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // The rest of the config is fine
};

export default nextConfig;
