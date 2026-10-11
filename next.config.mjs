/** @type {import('next').NextConfig} */
const nextConfig = {
  // permite buildar num diretorio separado enquanto o `next dev` roda:
  // NEXT_DIST_DIR=.next-build npm run build
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
        pathname:
          "/projects/max_808_webp/d16c32204101211.Y3JvcCw5MjAsNzIwLDE4MCww.png",
      },
    ],
  },
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
