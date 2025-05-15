import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://satnamenergystrategies.com', // Replace with actual domain
  integrations: [
    tailwind({
      // Apply Tailwind directives baseline to specific files instead of globally
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      // Use a minimalist theme or disable syntax highlighting if not needed
      theme: 'github-light',
    },
  },
});


