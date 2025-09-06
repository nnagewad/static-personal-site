import generateMetaDescription from './src/_filters/generate-meta-description.js';
import apiToFullDate from './src/_filters/api-to-full-date.js';
import apiToISO from './src/_filters/api-to-iso.js';
import isoToFullDate from './src/_filters/iso-to-full-date.js';
import isoToISODate from './src/_filters/iso-to-iso-date.js';
import updateTags from './src/_filters/update-tags.js';
import { minify } from 'terser';
import htmlmin from 'html-minifier-terser';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginRss from '@11ty/eleventy-plugin-rss';
import 'dotenv/config';
import sanitizeHtml from "sanitize-html";

export default async function(eleventyConfig) {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);
  // Set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy('./src/img/');
  // Add filters
  eleventyConfig.addFilter('generateMetaDescription', generateMetaDescription);
  eleventyConfig.addFilter('isoToFullDate', isoToFullDate);
  eleventyConfig.addFilter('isoToISODate', isoToISODate);
  eleventyConfig.addFilter('apiToFullDate', apiToFullDate);
  eleventyConfig.addFilter('apiToISO', apiToISO);
  eleventyConfig.addFilter('updateTags', updateTags);
  eleventyConfig.addFilter("sanitizeHTML", (content) => {
    return sanitizeHtml(content, {
      allowedTags: [
        "a", "b", "i", "em", "strong", "p", "ul", "ol", "li", "br", "img", "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6"
      ],
      allowedAttributes: {
        a: ["href", "title", "rel", "target"],
        img: ["src", "alt", "title", "width", "height"],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      selfClosing: ["img", "br"],
    });
  });
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

  // Ability to automatically add an ID addtribute to headings
  const { IdAttributePlugin } = await import('@11ty/eleventy');
  eleventyConfig.addPlugin(IdAttributePlugin);

  // DISABLED - Image plugin causing GIF processing errors on Netlify
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   formats: ['avif', 'webp'],
  //   widths: ['auto'],
  //   dryRun: true,
  //   htmlOptions: {
  //     imgAttributes: {
  //       loading: 'lazy',
  //       decoding: 'async',
  //     },
  //     pictureAttributes: {}
  //   },
  // });

  // Simple transform to add loading attributes without image processing
  eleventyConfig.addTransform("addImageAttributes", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(
        /<img(?![^>]*\bloading\s*=)([^>]*)>/gi,
        '<img loading="lazy" decoding="async"$1>'
      );
    }
    return content;
  });

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
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

  // Using ELeventy RSS Plugin
  eleventyConfig.addPlugin(pluginRss);

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