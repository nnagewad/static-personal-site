import 'dotenv/config';
import { minify } from 'terser';
import htmlmin from 'html-minifier-terser';
import sanitizeHtml from "sanitize-html";
import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from "@11ty/eleventy-img";
import path from "path";
import fs from "fs";

// Import filters
import generateMetaDescription from './src/_filters/generate-meta-description.js';
import apiToFullDate from './src/_filters/api-to-full-date.js';
import apiToISO from './src/_filters/api-to-iso.js';
import isoToFullDate from './src/_filters/iso-to-full-date.js';
import isoToISODate from './src/_filters/iso-to-iso-date.js';
import updateTags from './src/_filters/update-tags.js';

// Configuration constants
const SKIP_PATTERNS = [
  'medium.com/_/stat',
  'event=post.clientViewed',
  'googletagmanager.com',
  'facebook.com/tr',
  'twitter.com/i/adsct',
  'doubleclick.net',
];

const ALLOWED_TAGS = [
  "a", "b", "i", "em", "strong", "p", "ul", "ol", "li", "br", "img", 
  "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6"
];

// Helper functions
const shouldSkipImage = (src) => SKIP_PATTERNS.some(pattern => src.includes(pattern));

const isExternalImage = (src) => src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//");

const extractAttributes = (imgTag) => {
  const attributes = {};
  const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
  let match;
  while ((match = attrRegex.exec(imgTag)) !== null) {
    const [, name, value] = match;
    if (name !== 'src') attributes[name] = value;
  }
  return attributes;
};

const addLazyLoading = (imgTag) => 
  imgTag.includes('loading=') ? imgTag : imgTag.replace(/<img/, '<img loading="lazy" decoding="async"');

const processImage = async (src, originalAttributes) => {
  const isExternal = isExternalImage(src);
  const srcPath = isExternal ? src : (src.startsWith("/") ? path.join("./src", src) : path.resolve("./src", src));
  
  const metadata = await Image(srcPath, {
    widths: ['auto'],
    formats: ["avif", "webp"],
    outputDir: ".cache/@11ty/img/",
    urlPath: "/img/optimized/",
    ...(isExternal && {
      cacheOptions: {
        duration: "1d",
        directory: ".cache",
      },
    }),
  });

  const imageAttributes = {
    ...originalAttributes,
    loading: "lazy",
    decoding: "async",
    ...(!originalAttributes.sizes && { sizes: "100vw" }),
  };

  return Image.generateHTML(metadata, imageAttributes);
};

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

  // Image optimization transform
  eleventyConfig.addTransform("optimizeImages", async function(content, outputPath) {
    if (!outputPath?.endsWith(".html")) return content;

    const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g;
    let processedContent = content;
    const matches = [...content.matchAll(imgRegex)];
    
    for (const [fullMatch, , src] of matches) {
      try {
        if (shouldSkipImage(src)) {
          processedContent = processedContent.replace(fullMatch, addLazyLoading(fullMatch));
          continue;
        }

        const originalAttributes = extractAttributes(fullMatch);
        const optimizedImg = await processImage(src, originalAttributes);
        processedContent = processedContent.replace(fullMatch, optimizedImg);
      } catch (error) {
        console.warn(`Failed to process image: ${src}`, error.message);
        processedContent = processedContent.replace(fullMatch, addLazyLoading(fullMatch));
      }
    }
    
    return processedContent;
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

  // Copy optimized images from cache to output directory after build
  eleventyConfig.on("eleventy.after", () => {
    const cacheDir = ".cache/@11ty/img/";
    const outputDir = path.join(eleventyConfig.directories.output, "/img/optimized/");
    
    if (fs.existsSync(cacheDir)) {
      fs.cpSync(cacheDir, outputDir, {
        recursive: true
      });
      console.log(`📸 Copied optimized images from cache to ${outputDir}`);
    }
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