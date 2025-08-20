import { src, dest } from 'gulp';
import replace from 'gulp-replace';

export default function injectStagitCSS() {
  return src(['dist/stagit/**/*.html', 'dist/stagit/**/*.js.html'])
    .pipe(replace('</head>', '<link rel="stylesheet" type="text/css" href="https://bitbyte.blog/scss/stagit/styles.css" />\n</head>'))
    .pipe(replace(/<a href="[^"]*">(<img[^>]*logo\.png[^>]*>)<\/a>/g, '<a href="https://bitbyte.blog">$1</a>'))
    .pipe(replace(/src="[^"]*logo\.png"/g, 'src="https://bitbyte.blog/assets/images/ball.gif"'))
    .pipe(replace(/width="32" height="32"/g, 'width="150" height="150"'))
    .pipe(replace(/<h1>repo<\/h1>/g, '<h1>bitbyte-blog</h1>'))
    .pipe(replace(/<title>([^<]*) - repo - /g, '<title>$1 - bitbyte-blog - '))
    .pipe(dest('dist/stagit/'));
}
