const Cache = require("@11ty/eleventy-fetch");

module.exports = async function() {
  let url = "https://v1.nocodeapi.com/nikin/medium/jiEUjZNwxwIIzlUq";

  /* This returns a promise */
  return Cache(url, {
    duration: "1d", // save for 1 day
    type: "json"    // we’ll parse JSON for you
  });
}
