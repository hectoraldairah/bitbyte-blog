const fs = require('fs');

const pluginImage = require('@11ty/eleventy-img');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRSS = require('@11ty/eleventy-plugin-rss');

const filters = require('./src/utils/filters');
const markdown = require('./src/utils/markdown');

const CONTENT_GLOBS = {
  post: './src/posts/**/*.md',
  pixelart: './src/pixelart/**/*.md',
};

module.exports = (config) => {
  // Plugins
  config.addPlugin(pluginNavigation);
  config.addPlugin(pluginRSS);

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/assets/');
  config.addPassthroughCopy('./src/icons/');
  config.addPassthroughCopy('./src/fonts/');
  config.addPassthroughCopy('./src/pixelart/');
  config.addPassthroughCopy('./src/posts/');

  // Add filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Markdown Passing
  config.setLibrary('md', markdown);

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.post)].reverse();
  });

  config.addCollection('featured', (collection) => {
    return collection
      .getFilteredByGlob(CONTENT_GLOBS.post)
      .filter((item) => item.data.featured)
      .sort((a, b) => b.date - a.date);
  });

  config.addCollection('pixelart', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.pixelart)].reverse();
  });

  config.addCollection('publish', (collection) => {
    const pixelart = [
      ...collection.getFilteredByGlob(CONTENT_GLOBS.pixelart),
    ].reverse();
    const blog = [
      ...collection.getFilteredByGlob(CONTENT_GLOBS.post),
    ].reverse();
    return [...pixelart, ...blog].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
