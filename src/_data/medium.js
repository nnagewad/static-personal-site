import Cache from '@11ty/eleventy-fetch';
import API_KEY from './api.js';

export default async function() {
  let mediumUsername = "nkngwd"; // Replace with your username
  let mediumUrl = `https://medium.com/feed/@${mediumUsername}`;
  let apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumUrl)}&api_key=${API_KEY}`;

  try {
    let jsonData = await Cache(apiUrl, {
        duration: "1d", // Cache for 1 day
        type: "json",
    });

    return jsonData.items || []; // Return the array of posts
  } catch (error) {
    console.error("Error fetching Medium RSS JSON:", error);
    return [];
  }
};
