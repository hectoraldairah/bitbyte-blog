const { dest, src } = require('gulp');
const postCSS = require('gulp-postcss');
const sassProcessor = require('gulp-sass')(require('sass'));

// Flags whether we compress the output etc

/* eslint-disable no-eval */
const isProduction = process.env.NODE_ENV === 'production'; // eslint-disable-line no-eval
// An array of outputs that should be sent over to includes
const criticalStyles = [
  'critical.scss',
  'home.scss',
  'page.scss',
  'about.scss',
  'pixelart-gallery.scss',
];

// Takes the arguments passed by `dest` and determines where the output file goes
const calculateOutput = ({ history }) => {
  // By default, we want a CSS file in our dist directory, so the
  // HTML can grab it with a <link />
  let response = './dist/css';

  // Get everything after the last slash
  const sourceFileName = /[^/]*$/.exec(history[0])[0];

  // If this is critical CSS though, we want it to go
  // to the _includes directory, so nunjucks can include it
  // directly in a <style>
  if (criticalStyles.includes(sourceFileName)) {
    response = './src/_includes/css';
  }

  return response;
};

const sass = () => {
  return src('./src/scss/*.scss')
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(postCSS([require('postcss-custom-properties'), require('cssnano')]))
    .pipe(dest(calculateOutput, { sourceMaps: !isProduction }));
};

module.exports = sass;
