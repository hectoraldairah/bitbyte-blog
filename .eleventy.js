const filters = require("./src/utils/filters");
const markdown = require("./src/utils/markdown");

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/assets/fonts");

  // Add filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Markdown Passing
  config.setLibrary("md", markdown);

  // Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
