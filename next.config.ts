import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// decision: Cache Components (Next 16 default) is turned off. Every page on this
// site is fully static and content lives in TS/MDX modules, so the classic
// static-rendering model is simpler for student maintainers and avoids
// Suspense/"use cache" bookkeeping around search params.
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
