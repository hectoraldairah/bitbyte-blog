import { src, dest } from 'gulp';
import replace from 'gulp-replace';

export default function injectStagitCSS() {
  return src(['dist/stagit/**/*.html', 'dist/stagit/**/*.js.html'])
    .pipe(replace('</head>', '<link rel="stylesheet" type="text/css" href="https://bitbyte.blog/scss/stagit/styles.css" />\n</head>'))
    .pipe(replace(/src="\.?\.?\/?(logo\.png)" alt="website logo" width="32" height="32"/g, 'src="https://bitbyte.blog/assets/images/ball.gif" alt="" width="150" height="150"'))
    .pipe(dest('dist/stagit/'));
}
