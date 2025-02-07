import Cache from '@11ty/eleventy-fetch';
import API_KEY from './api.js';

export default async function() {
  let url = `https://v1.nocodeapi.com/nikin/medium/${API_KEY}`;
  return Cache(url, {
    duration: "1d", 
    type: "json"
  });
}