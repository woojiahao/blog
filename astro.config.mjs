// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import rehypeMathjax from "rehype-mathjax/chtml"
import remarkMath from "remark-math"
import remarkCallout from './src/plugins/remark-callout';
import remarkDirective from "remark-directive"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkReadingTime,
      remarkMath,
      remarkCallout
    ],
    rehypePlugins: [
      [rehypeMathjax, {
        chtml: {
          fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
        }
      }],
    ],
    gfm: true,
  },

  integrations: [mdx(), react()],
  experimental: {
    svg: true
  }
});
