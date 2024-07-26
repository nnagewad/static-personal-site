const utcFormatter = require('./src/filters/utc-formatter.js');
const dateFormatter = require('./src/filters/date-formatter.js');
const updateTags = require('./src/filters/update-tags.js');
const { minify } = require('terser');
const htmlmin = require('html-minifier-terser');

module.exports = config => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  // Add filters
  config.addFilter('utc', utcFormatter);
  config.addFilter('date', dateFormatter);
  config.addFilter('updateTags', updateTags);
  // Watch SCSS files for changes
  config.setServerOptions({
    watch: ['./dist/css/**/*.css'],
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
  config.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes'
    }
  };
};
