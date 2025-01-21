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
imageAltText: 'A 3D emoji of Nikin Nagewadia thinking.'
eleventyComputed:
  title: '{{ post.title }}'
  pubDate: '{{ post.published }}'
  categories: '{{ post.category }}'
  mediumLink: '{{ post.link }}'
  blogPost: '{{ post.content | updateTags | safe }}'
  metaDesc: 'A case study written by Nikin Nagewadia, published on: {{ pubDate | millisToFullDate }}.'
---
