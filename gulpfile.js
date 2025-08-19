import { series, watch } from 'gulp';
import sass from './gulp-tasks/sass.js';
import { injectStagitCSS } from './gulp-tasks/sass.js';

// Watcher: no ejecutar al iniciar, solo en cambios
export const watcher = () =>
  watch('./src/scss/**/*.scss', { ignoreInitial: true }, sass);

// Build task that runs sass first, then injects stagit CSS
export const build = series(sass, injectStagitCSS);

// Tarea por defecto - now includes stagit CSS injection
export default sass;

// Exporta las tareas individuales si las quieres correr como `gulp sass` o `gulp injectStagitCSS`
export { sass, injectStagitCSS };

// Alternative: if you want to run both tasks in parallel instead of series
// export const buildParallel = parallel(sass, injectStagitCSS);
