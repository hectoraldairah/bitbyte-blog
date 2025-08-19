import fs from "node:fs";
import pluginNavigation from '@11ty/eleventy-navigation';
import pluginRSS from '@11ty/eleventy-plugin-rss';
import pluginSyntax from '@11ty/eleventy-plugin-syntaxhighlight';
import metagen from 'eleventy-plugin-metagen';
import EleventyPluginOgImage from "eleventy-plugin-og-image";

import * as filters from './src/utils/filters.js';
import markdown from './src/utils/markdown.js';
import * as shortcodes from './src/utils/shortcodes.js';

const CONTENT_GLOBS = {
  post: './src/posts/**/*.md',
  pixelart: './src/pixelart/**/*.md',
  books: './src/books/**/*.md',
};

/** @param { import('@11ty/eleventy/src/UserConfig').default } eleventyConfig */
export default async function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRSS);
  eleventyConfig.addPlugin(pluginSyntax);
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    async shortcodeOutput(ogImage) {
      return ogImage.outputUrl();
    },
    satoriOptions: {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "PixelFree",
          data: fs.readFileSync("./src/assets/fonts/FreePixel.ttf"),
          weight: 400,
          style: "normal",
        },
      ]
    },
    outputDir: "assets/og-images",
    outputFileExtension: "png",
    urlPath: "/assets/og-images",
    previewMode: "auto"
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy('./src/images/');
  eleventyConfig.addPassthroughCopy('./src/assets/');
  eleventyConfig.addPassthroughCopy('./src/icons/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/pixelart/');
  eleventyConfig.addPassthroughCopy('./src/posts/');
  eleventyConfig.addPassthroughCopy('./src/books/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addPassthroughCopy("src/.stagit/**/*.html");
  eleventyConfig.addPassthroughCopy("src/.stagit/**/*.xml");
  eleventyConfig.addPassthroughCopy("src/.stagit/**/*.css");

  // Filters
  for (const [name, fn] of Object.entries(filters)) {
    eleventyConfig.addFilter(name, fn);
  }

  // Shortcodes (Nunjucks async + Liquid)
  for (const [name, fn] of Object.entries(shortcodes)) {
    eleventyConfig.addNunjucksAsyncShortcode(name, fn);
    eleventyConfig.addLiquidShortcode(name, fn);
  }

  // Markdown
  eleventyConfig.setLibrary('md', markdown);

  // Collections
  eleventyConfig.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.post)]
      .filter((item) => !item.data.development)
      .reverse();
  });

  eleventyConfig.addCollection('featured', (collection) => {
    return collection
      .getFilteredByGlob(CONTENT_GLOBS.post)
      .filter((item) => item.data.featured && !item.data.development)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection('pixelart', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.pixelart)].reverse();
  });

  eleventyConfig.addCollection('books', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.books)].reverse();
  });

  eleventyConfig.addCollection('publish', (collection) => {
    const pixelart = [...collection.getFilteredByGlob(CONTENT_GLOBS.pixelart)].reverse();
    const blog = [...collection.getFilteredByGlob(CONTENT_GLOBS.post)].reverse();
    return [...pixelart, ...blog].reverse();
  });

  eleventyConfig.addCollection('log', (collection) => {
    return [...collection.items.filter((item) => item.data.gym)];
  });

  eleventyConfig.addCollection('navItems', (collection) => {
    return collection.getAll().filter(item => item.data.eleventyNavigation);
  });

  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: { input: 'src', output: 'dist' },
  };
}
