---
layout: 'layouts/medium-post.html'
pagination:
  data: medium
  size: 1
  alias: post
  addAllPagesToCollections: true
tags: posts
permalink: post/{{ post.title | slug }}/index.html
socialImage: /images/profile.png
eleventyComputed:
  title: '{{ post.title }}'
  pubDate: '{{ post.pubDate }}'
  isoDate: '{{ post.isoDate }}'
  categories: '{{ post.categories }}'
  mediumLink: '{{ post.link }}'
  metaDesc: 'A case study written by Nikin Nagewadia, and published in {{ post.pubDate | date }}.'
---
