import Image from '@11ty/eleventy-img';
import path from 'node:path';

export async function image(
  src,
  alt,
  className = undefined,
  caption = false,
  widths = [400, 800, 1280],
  sizes = '100vw'
) {
  if (alt === undefined) {
    throw new Error('Missing alt prop for image: ' + src);
  }

  function figure(html, caption, width) {
    return `<figure>${html}<figcaption style="width: ${width}px">${caption}</figcaption></figure>`;
  }

  const ext = path.extname(src).toLowerCase();

  // Passthrough para GIF animados (no reencode)
  if (ext === '.gif') {
    const cleanedSrc = src.replace(/^src/, '');
    const imgTag = `<img src="${cleanedSrc}" alt="${alt}"${
      className ? ` class="${className}"` : ''
    } loading="eager" decoding="async">`;
    return caption ? figure(imgTag, caption, 0) : imgTag;
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

  // Ancho mayor del conjunto webp (si no hay webp, intenta con jpeg)
  const webpSet = metadata.webp?.length ? metadata.webp : metadata.jpeg;
  const figWidth = webpSet[webpSet.length - 1].width;

  return caption ? figure(generated, caption, figWidth) : generated;
}

export async function pixelArtImage(
  src,
  alt,
  className = undefined,
  widths = [400, 800, 1280],
  sizes = '100vw'
) {
  if (alt === undefined) {
    throw new Error('Missing alt prop for image: ' + src);
  }

  const options = {
    widths,
    formats: ['webp', 'jpeg', 'svg'], // mantiene tu set original
    urlPath: '/pixelart/**/',          // si te da problemas, usa un path fijo como '/pixelart'
    outputDir: 'dist/pixelart/**/',    // idem: normalmente debe ser una carpeta, no un patrón
    defaultAttributes: {
      loading: 'eager',
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
}
