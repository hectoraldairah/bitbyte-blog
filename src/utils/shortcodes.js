const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = {
  image: async function (
    src,
    alt,
    className = undefined,
    caption = false,
    widths = [400, 800, 1280],
    sizes = '100vw'
  ) {
    if (alt === undefined) {
      throw new Error('Missing atl prop for image', src);
    }

    function figure(html, caption, width) {
      return `<figure>${html}<figcaption style="width: ${width}px">${caption}</figcaption></figure>`;
    }

    const ext = path.extname(src).toLowerCase();

    if (ext === '.gif') {
      const cleanedSrc = src.replace(/^src/, '');
      const imgTag = `<img src="${cleanedSrc}" alt="${alt}"${
        className ? ` class="${className}"` : ''
      } loading="eager" decoding="async">`;
      if (caption) {
        return figure(imgTag, caption, 0);
      }
      return imgTag;
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
      loading: 'eager',
      decoding: 'async',
    };

    const metadata = await Image(src, options);

    const generated = Image.generateHTML(metadata, imageAttributes);

    const figWidth = metadata.webp[0].width;

    if (caption) {
      return figure(generated, caption, figWidth);
    }

    return generated;
  },
  pixelArtImage: async function (
    src,
    alt,
    className = undefined,
    widths = [400, 800, 1280],
    sizes = '100vw'
  ) {
    if (alt === undefined) {
      throw new Error('Missing alt prop for image', src);
    }

    const options = {
      widths,
      formats: ['webp', 'jpeg', 'svg'],
      urlPath: '/pixelart/**/',
      outputDir: 'dist/pixelart/**/',
      defaultAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
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
