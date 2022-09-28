const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const position = {
  false: 'push',
  true: 'unshift',
};

const renderPermalink = (slug, opts, state, idx) => {
  const space = () =>
    Object.assign(new state.Token('text', '', 0), {
      content: ' ',
    });

  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', opts.permalinkHref(slug, state)],
      ],
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      // Edit starts here:
      content: `<span aria-hidden="true" class="header-anchor__symbol">#</span>
      <span class="screen-reader-only">Direct link to this section</span>`,
      // Edit ends
    }),
    new state.Token('link_close', 'a', -1),
  ];

  if (opts.permalinkSpace) {
    linkTokens[position[!opts.permalinkBefore]](space());
  }
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens);
};

const markdownItOptions = {
  html: true,
};

const markdownItAnchorOptions = {
  permalink: true,
  renderPermalink,
};

/* Markdown Overrides */
let markdown = markdownIt(markdownItOptions).use(
  markdownItAnchor,
  markdownItAnchorOptions
);

module.exports = markdown;
