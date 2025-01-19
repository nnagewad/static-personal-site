---
layout: 'layouts/medium-post.html'
pagination:
  data: medium
  size: 1
  alias: post
  addAllPagesToCollections: true
tags: posts
permalink: post/{{ post.published | utc | iso }}/{{ post.title | slugify }}/index.html
image: case-study
imageAltText: 'A 3D emoji of Nikin Nagewadia thinking.'
eleventyComputed:
  title: '{{ post.title }}'
  pubDate: '{{ post.published }}'
  isoDate: '{{ post.created }}'
  categories: '{{ post.category }}'
  mediumLink: '{{ post.link }}'
  metaDesc: 'A case study written by Nikin Nagewadia, published: {{ pubDate | utc | date }}.'
---
