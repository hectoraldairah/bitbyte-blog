---
title: "Blog"
layout: "layouts/feed.njk"
eleventyNavigation:
  key: blog
  order: 2
pagination:
  data: collections.blog
  size: 5
paginationPrevText: "Newer posts"
paginationNextText: "Older posts"
paginationAnchor: "#post-list"
permalink: "blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html"
---
