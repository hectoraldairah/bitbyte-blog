const quotes = [
  'Tired of Javascript',
  'Write simple CSS is hard',
  'Elixir should be more mainstream',
  'Nobody wants a ton of JS in their site',
  'Pixel-art is one of the best art styles',
  'JSX is ok',
  'Vue.js should be the number one',
];

export function getLinkActiveState(itemUrl, pageUrl) {
  let response = '';
  if (itemUrl === pageUrl) {
    response = ' aria-current="page" data-state="active"';
  }
  return response;
}

export function generateDate() {
  return new Date();
}

export function getQuoteOfTheDay() {
  const randomQuote = Math.floor(Math.random() * quotes.length);
  return quotes[randomQuote];
}

export function getThemeValue(theme) {
  console.log(theme);
}
