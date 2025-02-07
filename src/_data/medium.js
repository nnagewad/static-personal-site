import Cache from '@11ty/eleventy-fetch';

export default async function() {
  let url = "https://v1.nocodeapi.com/nikin/medium/jiEUjZNwxwIIzlUq";
  return Cache(url, {
    duration: "1d", 
    type: "json"
  });
}