import { src, dest } from 'gulp';
import replace from 'gulp-replace';

export default function injectStagitCSS() {
  return src(['dist/stagit/**/*.html', 'dist/stagit/**/*.js.html'])
    .pipe(replace('</head>', '<link rel="stylesheet" type="text/css" href="https://bitbyte.blog/scss/stagit/styles.css" />\n</head>'))
    .pipe(replace(/<img[^>]*logo\.png[^>]*>/g, ''))
    .pipe(dest('dist/stagit/'));
}
