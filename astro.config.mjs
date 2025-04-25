// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import rehypeMathjax from "rehype-mathjax/chtml";
import rehypeMermaid from "rehype-mermaid";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import addMermaidClass from './src/plugins/add-mermaid-classname';
import remarkCallout from './src/plugins/remark-callout';
import remarkCenter from './src/plugins/remark-center';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

export default defineConfig({
  site: "https://blog.woojiahao.com",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"]
    },
    remarkPlugins: [
      remarkDirective,
      remarkReadingTime,
      remarkMath,
      remarkCallout,
      remarkCenter,
    ],
    rehypePlugins: [
      addMermaidClass,
      [rehypeMermaid, { strategy: "img-svg", dark: false, colorScheme: "forest" }],
      [rehypeMathjax, {
        chtml: {
          fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
        },
        "HTML-CSS": {
          linebreaks: { automatic: true, width: "container" }
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
