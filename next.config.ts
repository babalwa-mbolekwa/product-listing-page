import type { NextConfig } from "next"

// Adding remote patterns for Next.js to optimize images served from loremflickr.com and picsum.photos (from API).
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            }
        ]
    }
}

export default nextConfig
