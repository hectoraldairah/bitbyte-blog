module.exports = config => {

    // Filters
  const dateFilter = require('./src/filters/date-filters');
  const w3DateFilter = require('./src/filters/w3-date-filter.js');

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);


   // Returns a collection of blog posts in reverse date order
   config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Add filters
  config.addFilter('postDate', dateFilter);
  config.addFilter('w3Date', w3DateFilter);

    return {
      dir: {
        input: 'src',
        output: 'dist'
      }
    };
  };