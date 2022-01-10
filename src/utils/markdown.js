const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("slugify");

const linkBeforeHeader = markdownItAnchor.permalink.linkAfterHeader({
  class: "anchor",
  symbol: "<span hidden>#</span>",
  style: "aria-labelledby",
});

const markdownItOptions = {
  level: [1, 2, 3],
  slugify: (str) => slugify(str, { lower: true, strict: true, remove: /["]/g }),
  tabIndex: false,
  permalink(slug, opts, state, idx) {
    state.tokens.splice(
      idx,
      0,
      Object.assign(new state.Token("div_open", "div", 1), {
        // Add class "header-wrapper [h1 or h2 or h3]"
        attrs: [["class", `heading-wrapper ${state.tokens[idx].tag}`]],
        block: true,
      })
    );
    state.tokens.splice(
      idx + 4,
      0,
      Object.assign(new state.Token("div_close", "div", -1), {
        block: true,
      })
    );

    linkBeforeHeader(slug, opts, state, idx + 1);
  },
};

/* Markdown Overrides */
let markdown = markdownIt({
  html: true,
}).use(markdownItAnchor, markdownItOptions);

module.exports = markdown;
