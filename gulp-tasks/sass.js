import { src, dest } from 'gulp';
import postCSS from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import postcssCustomProperties from 'postcss-custom-properties';
import cssnano from 'cssnano';
import replace from 'gulp-replace';

const sassProcessor = gulpSass(dartSass);

const isProduction = process.env.NODE_ENV === 'production';

const criticalStyles = [
  'notfound.scss',
  'critical.scss',
  'home.scss',
  'page.scss',
  'about.scss',
  'pixelart-gallery.scss',
];

const calculateOutput = ({ history }) => {
  let outDir = './dist/css';

  const sourceFileName = /[^/]*$/.exec(history[0])[0];

  if (criticalStyles.includes(sourceFileName)) {
    outDir = './src/_includes/css';
  }

  return outDir;
};

export default function sass() {
  return src('./src/scss/*.scss', { sourcemaps: !isProduction })
    .pipe(
      sassProcessor().on('error', function(err) {
        console.warn('SASS Warning:', err.messageFormatted);
        this.emit('end');
      })
    )
    .pipe(
      postCSS([
        postcssCustomProperties(),
        cssnano(),
      ])
    )
    .pipe(dest(calculateOutput, { sourcemaps: !isProduction }));
}

export function injectStagitCSS() {
  return src(['dist/stagit/**/*.html', 'dist/stagit/**/*.js.html'])
    .pipe(replace('</head>', '<link rel="stylesheet" type="text/css" href="https://bitbyte.blog/scss/stagit/styles.css" />\n</head>'))
    .pipe(replace(/src="\.?\.?\/?(logo\.png)" alt="website logo" width="32" height="32"/g, 'src="https://bitbyte.blog/assets/images/ball.gif" alt="" width="150" height="150"'))
    .pipe(dest('dist/stagit/'));
}
