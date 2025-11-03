import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    // CRITICAL: Enables static HTML export for GitHub Pages
    output: 'export', 

    // CRITICAL: Sets the path prefix for assets and links
    // ⬇️ REPLACE <your-repo-name> with the exact name of your GitHub repository
    basePath: '/<your-repo-name>', 
    
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // MANDATORY for static export
        unoptimized: true, 
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
                // Your image source from the index.html content
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
