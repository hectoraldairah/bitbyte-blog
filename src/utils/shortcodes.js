//
//
// const imageShortcode = async (
//
//   src,
//   alt,
//   dir,
//   className = undefined,
//   widths = [400, 800, 1280],
//   formats = ['webp', 'jpeg'],
//   sizes = '100vw'
// ) => {
//
//   console.log(src)
//
// };
//
//
//
//
//
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
    const normal = `../${src}`;

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

    const result = Image.generateHTML(imageMetadata, imageAttributes);

    return result;
  },
};
