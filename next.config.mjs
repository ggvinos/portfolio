/** @type {import('next').NextConfig} */
const nextConfig = {
  // permite buildar num diretorio separado enquanto o `next dev` roda:
  // NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
