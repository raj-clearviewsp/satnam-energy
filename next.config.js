const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      // If you use remark-gfm, you'll need to use next.config.mjs
      // as the package is ESM only
      // https://github.com/remarkjs/remark-gfm#install
      remarkPlugins: [],
      rehypePlugins: [],
      // If you use `MDXProvider`, uncomment the following line.
      providerImportSource: "@mdx-js/react",
    },
  })
  
  /** @type {import('next').NextConfig} */
  module.exports = {
    output: 'export',          // tells Next to emit static HTML
    images: { unoptimized: true }, // disable the Next.js image optimizer
  };
  
  const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com'],
    },
  }
  
  // Merge MDX config with Next.js config
  module.exports = withMDX(nextConfig)