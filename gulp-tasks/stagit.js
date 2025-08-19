import { src, dest } from 'gulp';
import replace from 'gulp-replace';

export default function injectStagitCSS() {
  return src('dist/stagit/**/*.html')
    .pipe(replace('</head>', '<link rel="stylesheet" type="text/css" href="https://bitbyte.blog/scss/stagit/styles.css" />\n</head>'))
    .pipe(replace('src="logo.png"', 'src="https://bitbyte.blog/assets/images/ball.gif"'))
    .pipe(dest('dist/stagit/'));
}
