const utcFormatter = require('./src/_filters/utc-formatter.js');
const dateFormatter = require('./src/_filters/date-formatter.js');
const updateTags = require('./src/_filters/update-tags.js');
const { minify } = require('terser');
const htmlmin = require('html-minifier-terser');
const { eleventyImageTransformPlugin } = require('@11ty/eleventy-img');

module.exports = async function(eleventyConfig) {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/img/meta-tags');
  // Add filters
  eleventyConfig.addFilter('utc', utcFormatter);
  eleventyConfig.addFilter('date', dateFormatter);
  eleventyConfig.addFilter('updateTags', updateTags);
  // Watch SCSS files for changes
  eleventyConfig.setServerOptions({
    watch: ['./_site/css/**/*.css'],
  });
  // Inline JS
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      // Fail gracefully.
      callback(null, code);
    }
  });
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith('.html') ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  // Ability to automatically add an ID addtribute to headings
  const { IdAttributePlugin } = await import('@11ty/eleventy');
	eleventyConfig.addPlugin(IdAttributePlugin);
  // Using Eleventy Image Plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'auto'],
    widths: ['auto'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
      pictureAttributes: {}
    },
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      includes: '_includes'
    }
  };
};
