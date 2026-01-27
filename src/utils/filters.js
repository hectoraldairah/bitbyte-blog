import { DateTime } from 'luxon';

export function postDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
}

export function w3Date(value) {
  const dateObject = new Date(value);
  return DateTime.fromJSDate(dateObject).toLocaleString(DateTime.DATE_MED);
}

export function logger(value) {
  console.log(typeof value);
}

export function stars(rating) {
  return ['☆', '☆', '☆', '☆', '☆']
    .map((item, idx) => (idx + 1 <= rating ? '★' : item))
    .toString()
    .replaceAll(',', ' ');
}

export function previewDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' })
    .setLocale('en-US')
    .toISODate();
}

export function round2f(val) {
  if (typeof val === 'number') {
    return val.toFixed(2);
  }
  return '';
}

export function toc(content) {
  if (!content) return [];

  const headingRegex = /<h([123])[^>]*?\sid="([^"]*)"[^>]*?>(.*?)<a\s+class="header-anchor"/gis;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    // Extract just the text before the anchor link
    let text = match[3].replace(/<[^>]*>/g, '').trim();

    if (text) {
      headings.push({
        level,
        id,
        text
      });
    }
  }

  return headings;
}
