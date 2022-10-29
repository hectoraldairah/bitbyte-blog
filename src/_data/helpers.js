const quotes = [
  "I'm tired of JavaScript",
  'Write simple CSS is hard',
  'Elixir should be more mainstream',
  'Nobody wants a ton of JS in their site',
  'Pixel-art is one of the best art styles',
  'JSX is ok',
  'Vue.js should be the number one',
  "I don't like Next.js",
];

module.exports = {
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page" data-state="active"';
    }
    return response;
  },
  generateDate: function () {
    const dateObj = new Date();
    return dateObj;
  },
  getQuoteOfTheDay: function () {
    const randomQuote = Math.floor(Math.random() * (quotes.length - 1) + 1);
    return quotes[randomQuote];
  },
  getThemeValue: function (theme) {
    console.log(theme);
  },
};
