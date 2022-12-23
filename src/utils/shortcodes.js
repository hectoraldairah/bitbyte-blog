const Image = require('@11ty/eleventy-img');

module.exports = {
  image: async function (
    src,
    alt,
    dir,
    className,
    widths = [400, 800, 1280],
    formats = ['webp', 'png'],
    sizes = '100vw'
  ) {
    const normal = `src${src}`;

    console.log(normal, 'noooormal');

    const imageMetadata = await Image(normal, {
      widths: [...widths, null],
      formats: [...formats, null],
      urlPath: '/assets/images',
      outputDir: 'dist/images/',
    });

    const imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };

    return Image.generateHTML(imageMetadata, imageAttributes);
  },
};
