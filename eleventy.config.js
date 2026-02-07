import { minify } from 'terser';
import htmlmin from 'html-minifier-terser';
import sanitizeHtml from "sanitize-html";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import path from "path";
import fs from "fs";
import { IdAttributePlugin } from "@11ty/eleventy";
import MarkdownIt from "markdown-it";

// Import filters
import isoToFullDate from './src/_filters/iso-to-full-date.js';
import isoToISODate from './src/_filters/iso-to-iso-date.js';

// Define allowed HTML tags for sanitization
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'a', 'img', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span',
  'div', 'figure', 'figcaption'
];

const md = new MarkdownIt();

export default async function(eleventyConfig) {
  // Configuration
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setServerOptions({
    watch: ['./_site/css/**/*.css'],
  });
  
  // Collections
  eleventyConfig.addCollection("caseStudies", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/case-study/*.md").map(item => ({
      url: item.url,
      title: item.data.title,
      subTitle: item.data.subTitle
    }));
  });

  // Plugins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    urlPath: "/img/",
    outputDir: ".cache/@11ty/img/",
    formats: ["avif", "webp"],
    widths: ["auto"],
    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {}
    },
  });

  eleventyConfig.addPlugin(IdAttributePlugin);
  
  // Filters
  const filters = {
    isoToFullDate,
    isoToISODate,
    markdown: (content) => md.render(content || ''),
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
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Store output directory for use in event handlers
  const outputDirectory = "_site";

  // Copy processed images from cache to final output after build
  eleventyConfig.on("eleventy.after", () => {
    if (process.env.ELEVENTY_RUN_MODE === "build") {
      const cacheDir = ".cache/@11ty/img/";
      const outputDir = path.join(outputDirectory, "img");
      
      try {
        // Check if cache directory exists
        fs.accessSync(cacheDir);
        
        // Use synchronous copy for better Node.js compatibility
        fs.cpSync(cacheDir, outputDir, {
          recursive: true,
          force: true // Overwrite existing files
        });
        console.log("📸 Copied processed images from cache to output directory");
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log("ℹ️ No cached images found to copy");
        } else {
          console.error(`❌ Failed to copy processed images from "${cacheDir}" to "${outputDir}":`, err);
        }
      }
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