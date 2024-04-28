/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend_url: process.env.NODE_ENV === "development" ? "https://api.msaramen.com/" : "https://api.msaramen.com/",
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
