---
layout: 'layouts/medium-post.njk'
pagination:
  data: medium
  size: 1
  alias: post
  addAllPagesToCollections: true
tags: posts
permalink: post/{{ post.title | slugify }}/index.html
image: case-study
imageAltText: '3D animated emoji of a person with a beard and round glasses, wearing a black tuque, in a thoughtful pose.'
eleventyComputed:
  title: '{{ post.title }}'
  pubDate: '{{ post.pubDate }}'
  xmlPubDate: '{{ pubDate | apiToISO }}'
  categories: '{{ post.categories }}'
  mediumLink: '{{ post.link }}'
  blogPostContent: '{{ post.content | updateTags | safe }}'
  xmlBlogPostContent: '{{ post.content | updateTags }}'
  metaDesc: '{{ post.content | generateMetaDescription }}'
---
