import 'dotenv/config';
import { minify } from 'terser';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import htmlmin from 'html-minifier-terser';
import sanitizeHtml from "sanitize-html";
import pluginRss from '@11ty/eleventy-plugin-rss';
import generateMetaDescription from './src/_filters/generate-meta-description.js';
import apiToFullDate from './src/_filters/api-to-full-date.js';
import apiToISO from './src/_filters/api-to-iso.js';
import isoToFullDate from './src/_filters/iso-to-full-date.js';
import isoToISODate from './src/_filters/iso-to-iso-date.js';
import updateTags from './src/_filters/update-tags.js';

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
      
      // Only process local images - skip ALL external URLs
      urlFilter: function(src) {
        // Skip all external URLs completely
        const isExternal = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//');
        
        if (isExternal) {
          console.log(`Skipping external image: ${src}`);
          return false;
        }
        
        console.log(`Processing local image: ${src}`);
        return true;
      },
      
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
  eleventyConfig.addPassthroughCopy("src/img/headshot");
  eleventyConfig.addPassthroughCopy("src/img/header");
  
  // Filters
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

  // Async filters
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      callback(null, code);
    }
  });

  // Transforms
  // Add a simple transform to add lazy loading to external images
  eleventyConfig.addTransform("addLazyLoadingToExternalImages", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Add lazy loading to external images that weren't processed by the Image plugin
      return content.replace(
        /<img([^>]*?)src=["'](https?:\/\/[^"']+)["']([^>]*?)(?![^>]*loading=)/gi,
        '<img$1src="$2"$3 loading="lazy" decoding="async"'
      );
    }
    return content;
  });

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