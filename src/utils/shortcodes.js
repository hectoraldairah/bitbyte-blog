const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = {
  image: async function (
    src,
    alt,
    className = undefined,
    widths = [400, 800, 1280],
    sizes = '100vw'
  ) {
    if (alt === undefined) {
      throw new Error('Missing atl prop for image', src);
    }

    const options = {
      widths,
      formats: ['webp', 'jpeg'],
      urlPath: '/assets/images',
      outputDir: 'dist/assets/images/',
    };

    const imageAttributes = {
      alt,
      sizes,
      class: className,
      loading: 'lazy',
      decoding: 'async',
    };

    const metadata = await Image(src, options);

    return Image.generateHTML(metadata, imageAttributes);
  },
};
