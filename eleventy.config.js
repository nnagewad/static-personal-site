import 'dotenv/config';
import { minify } from 'terser';
import htmlmin from 'html-minifier-terser';
import sanitizeHtml from "sanitize-html";
import pluginRss from '@11ty/eleventy-plugin-rss';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// Import filters
import generateMetaDescription from './src/_filters/generate-meta-description.js';
import apiToFullDate from './src/_filters/api-to-full-date.js';
import apiToISO from './src/_filters/api-to-iso.js';
import isoToFullDate from './src/_filters/iso-to-full-date.js';
import isoToISODate from './src/_filters/iso-to-iso-date.js';
import updateTags from './src/_filters/update-tags.js';

// Configuration constants
const ALLOWED_TAGS = [
  "a", "b", "i", "em", "strong", "p", "ul", "ol", "li", "br", "img", 
  "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6"
];

export default async function(eleventyConfig) {
  // Configuration
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setServerOptions({
    watch: ['./_site/css/**/*.css'],
  });
  
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {}
    },
  });
  
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/img/favicon");
  eleventyConfig.addPassthroughCopy("src/img/open-graph");
  
  // Filters
  const filters = {
    generateMetaDescription,
    isoToFullDate,
    isoToISODate,
    apiToFullDate,
    apiToISO,
    updateTags,
    sanitizeHTML: (content) => sanitizeHtml(content, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: {
        a: ["href", "title", "rel", "target"],
        img: ["src", "alt", "title", "width", "height"],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      selfClosing: ["img", "br"],
    })
  };

  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

  // Async filters
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      callback(null, code);
    }
  });

  // HTML minification
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (!outputPath?.endsWith('.html')) return content;
    
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
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