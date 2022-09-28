---
title: 'Tag Archive'
layout: 'layouts/feed.njk'
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'rss', 'featured', 'pixelart']
permalink: '/tag/{{ tag | slug }}/'
---
