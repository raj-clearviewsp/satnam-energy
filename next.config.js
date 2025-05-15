/* next.config.js ------------------------------------------------------- */
/* MDX support ---------------------------------------------------------- */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* -- General -------------------------------------------------------- */
  reactStrictMode: true,

  /* -- MD / MDX file extensions so you can do `page.mdx` ------------- */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  /* -- Remote images you allow `next/image` to optimise -------------- */
  images: {
    domains: ['images.unsplash.com'],
  },

  /* -- (Nothing else needed for Vercel) ------------------------------- */
};

module.exports = withMDX(nextConfig);
