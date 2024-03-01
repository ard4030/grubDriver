/** @type {import('next').NextConfig} */
const nextConfig = {
        reactStrictMode: false,
        images: {
            remotePatterns: [
              {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
              },
              {
                protocol: 'http',
                hostname: 'grub24.ir',
                port: '',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'grub24s3.s3.eu-west-2.amazonaws.com',
                port: '',
                pathname: '/**',
              },

              {
                protocol: 'https',
                hostname: 'grub24.co.uk',
                port: '',
                pathname: '/**',
              },

            ],
        },
};

export default nextConfig;
