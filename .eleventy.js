const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = (config) => {
  // Filters
  const dateFilter = require("./src/filters/date-filters");
  const w3DateFilter = require("./src/filters/w3-date-filter.js");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/assets/fonts");

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Add filters
  config.addFilter("postDate", dateFilter);
  config.addFilter("w3Date", w3DateFilter);

  /* Markdown */
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  let md = markdownIt(options).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "before",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: config.getFilter("slug"),
  });

  config.setLibrary("md", md);

  config.addPairedShortcode("markdown", function (content, inline = false) {
    if (inline) {
      return md.renderInline(content);
    }
    return md.render(content);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
