/** @type {import('next').NextConfig} */
const nextConfig = { 
  output: 'standalone',    
  images: {
    remotePatterns: [

      // ✅ Local development IP
      {
        protocol: 'http',
        hostname: '192.168.18.24',
        port: '4006',
        pathname: '/uploads/**',
      },
      // ✅ Optional: Localhost support
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4006',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
