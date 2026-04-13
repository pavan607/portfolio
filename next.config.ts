import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma must run as a Node external; bundling it (especially with Turbopack) can break DB writes.
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
