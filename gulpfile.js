import fs from 'fs';
import path from 'path';

import {argv} from 'yargs';
import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import minifycss from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';
import livereload from 'gulp-livereload';

const [reload, current] = [argv == 'true', process.cwd()],
      colors = {
        green: '\x1b[32m',
        blue: '\x1b[34m',
        reset: '\x1b[0m'
      };

['dist/js', 'dist/css'].forEach(function checkIfCriticalRouteExist(item) {
  let [routeFolders, route] = [item.split('/'), __dirname];

  routeFolders.forEach(function generateFolder(folder) {
    route += `${path.sep}${folder}`;

    if (!fs.existsSync(route)) {
      fs.mkdirSync(route);
      console.log(`${colors.green}%s${colors.reset}`, `Created: ${route}`);
    }
  });
});


gulp.task('watch', function () {
  livereload.listen();
});