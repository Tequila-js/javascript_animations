import fs from 'fs';
import path from 'path';

import {argv} from 'yargs';
import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import minifycss from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';
import livereload from 'gulp-livereload';
import webpack from 'gulp-webpack';

import config from './config/webpack';

const [reload, env, current] = [argv.reload == 'true', argv.env === 'production' ? 'production' : 'development', process.cwd()],
  jsConfig = config(env),
  colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
  };

console.log(`${colors.blue}%s${colors.reset}`, `livereload active: ${reload? 'ON' : 'OFF'}`);
console.log(`${colors.blue}%s${colors.reset}`, `environmemt: ${env}`);

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

function generateJS(done) {
  gulp.src('./app/js/*.js') 
    .pipe(plumber())
    .pipe(webpack(jsConfig))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulpIf(reload, livereload()));

  done();
}


gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(['./app/js/*.js'], gulp.parallel(generateJS), done => done());
});