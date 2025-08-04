const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginSyntax = require('@11ty/eleventy-plugin-syntaxhighlight');

const filters = require('./src/utils/filters');
const markdown = require('./src/utils/markdown');
const shortcodes = require('./src/utils/shortcodes');

const CONTENT_GLOBS = {
  post: './src/posts/**/*.md',
  pixelart: './src/pixelart/**/*.md',
  books: './src/books/**/*.md',
};

module.exports = (config) => {
  // Plugins
  config.addPlugin(pluginNavigation);
  config.addPlugin(pluginRSS);
  config.addPlugin(pluginSyntax);

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/assets/');
  config.addPassthroughCopy('./src/icons/');
  config.addPassthroughCopy('./src/fonts/');
  config.addPassthroughCopy('./src/pixelart/');
  config.addPassthroughCopy('./src/posts/');
  config.addPassthroughCopy('./src/books/');

  // Add filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Add shortcodes
  Object.keys(shortcodes).forEach((shortCodeName) => {
    config.addNunjucksAsyncShortcode(shortCodeName, shortcodes[shortCodeName]);
    config.addLiquidShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  // Markdown Passing
  config.setLibrary('md', markdown);

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.post)]
      .filter((item) => !item.data.development)
      .reverse();
  });

  config.addCollection('featured', (collection) => {
    return collection
      .getFilteredByGlob(CONTENT_GLOBS.post)
      .filter((item) => item.data.featured && !item.data.development)
      .sort((a, b) => b.date - a.date);
  });

  config.addCollection('pixelart', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.pixelart)].reverse();
  });

  config.addCollection('books', (collection) => {
    return [...collection.getFilteredByGlob(CONTENT_GLOBS.books)].reverse();
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

  config.addCollection('log', (collection) => {
    return [...collection.items.filter((item) => item.data.gym)];
  });

  config.addCollection('navItems', (collection) => {
    return collection.getAll().filter(item => item.data.eleventyNavigation)
  })

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
