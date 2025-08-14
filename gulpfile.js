import { parallel, watch } from 'gulp';
import sass from './gulp-tasks/sass.js';

// Watcher: no ejecutar al iniciar, solo en cambios
export const watcher = () =>
  watch('./src/scss/**/*.scss', { ignoreInitial: true }, sass);

// Tarea por defecto
export default parallel(sass);

// Exporta la tarea individual si la quieres correr como `gulp sass`
export { sass };
