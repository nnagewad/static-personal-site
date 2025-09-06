import 'dotenv/config';
import { minify } from 'terser';
import htmlmin from 'html-minifier-terser';
import sanitizeHtml from "sanitize-html";
import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from "@11ty/eleventy-img";
import path from "path";
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
  
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/img/favicon");
  eleventyConfig.addPassthroughCopy("src/img/open-graph");
  
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
  eleventyConfig.addTransform("optimizeLocalImages", async function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g;
      let processedContent = content;
      const matches = [...content.matchAll(imgRegex)];
      
      for (const match of matches) {
        const [fullMatch, beforeSrc, src, afterSrc] = match;
        
        // Skip external images - just add lazy loading
        if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) {
          if (!fullMatch.includes('loading=')) {
            const lazyImg = fullMatch.replace(/<img/, '<img loading="lazy" decoding="async"');
            processedContent = processedContent.replace(fullMatch, lazyImg);
          }
          continue;
        }
        
        // Extract all attributes from the original img tag
        const extractAttributes = (imgTag) => {
          const attributes = {};
          const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
          let attrMatch;
          while ((attrMatch = attrRegex.exec(imgTag)) !== null) {
            const [, name, value] = attrMatch;
            if (name !== 'src') { // Exclude src as it will be handled by the Image plugin
              attributes[name] = value;
            }
          }
          return attributes;
        };
        
        const originalAttributes = extractAttributes(fullMatch);
        
        try {
          // Convert relative paths to absolute paths
          const srcPath = src.startsWith("/") ? path.join("./src", src) : path.resolve("./src", src);
          
          let metadata = await Image(srcPath, {
            widths: ['auto'],
            formats: ["avif", "webp", "jpeg"],
            outputDir: "./_site/img/optimized/",
            urlPath: "/img/optimized/",
          });

          // Merge original attributes with required ones
          let imageAttributes = {
            ...originalAttributes, // Preserve all original attributes (class, id, data-*, etc.)
            loading: "lazy",
            decoding: "async",
          };

          // Remove sizes from original attributes if it exists, as we want to control it
          if (!originalAttributes.sizes) {
            imageAttributes.sizes = "100vw";
          }

          const optimizedImg = Image.generateHTML(metadata, imageAttributes);
          processedContent = processedContent.replace(fullMatch, optimizedImg);
        } catch (error) {
          console.warn(`Failed to process local image: ${src}`, error.message);
          // Keep original image with lazy loading
          if (!fullMatch.includes('loading=')) {
            const lazyImg = fullMatch.replace(/<img/, '<img loading="lazy" decoding="async"');
            processedContent = processedContent.replace(fullMatch, lazyImg);
          }
        }
      }
      
      return processedContent;
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