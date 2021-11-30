const dateFormatter = require('./src/filters/date-formatter.js');
const updateTags = require('./src/filters/update-tags.js');
const { minify } = require('terser');

module.exports = config => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  // Add filters
  config.addFilter('date', dateFormatter);
  config.addFilter('updateTags', updateTags);
  // Watch SCSS files for changes
  config.setBrowserSyncConfig({
    files: './dist/css/**/*.css'
  });
  // Inline JS
  config.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
