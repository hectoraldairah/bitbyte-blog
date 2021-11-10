const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const anchorSlugify = (s) =>
  encodeURIComponent(
    "h-" +
      String(s)
        .trim()
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, "")
        .replace(/\s+/g, "-")
  );

const markdown = markdownIt({
  html: true,
  breaks: true,
  typographer: true,
  linkify: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.ariaHidden({
    placement: "before",
    class: "direct-link",
    symbol: "#",
    level: [1, 2, 3, 4],
  }),
  permalinkBefore: true,
  permalinkAttrs: () => ({ "aria-hidden": true }),
  level: 2,
  slugify: anchorSlugify,
});

module.exports = markdown;
