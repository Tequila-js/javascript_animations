import fs from 'fs';
import path from 'path';

import {argv} from 'yargs';
import gulp from 'gulp';
import hash from 'gulp-hash';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
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

function removeContent(path = '', extension = '') {
  fs.readdirSync(path).forEach((file, index) => {
    if (file.indexOf(extension) !== -1) {
      fs.unlinkSync(`${path}/${file}`);
    }
  })
}

function removeJS(done) {
  removeContent(path.join(`${__dirname}/dist/js`), '.js');
  done();
}

function removeCSS(done) {
  removeContent(path.join(`${__dirname}/dist/css`), '.css');
  done();
}

function generateCSSVendor(done) {
  gulp.src(['./node_modules/reveal/index.css'])
    .pipe(concat('vendor.css'))
    .pipe(hash())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));

  done();
}

function generateCSS(done) {
  gulp.src('./app/scss/*scss')
    .pipe(plumber())
    .pipe(hash())
    .pipe(gulpIf(env === 'development', sourcemaps.init()))
    .pipe(sass({
      style: 'nested',
      noCache: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }))
    .pipe(gulpIf(env === 'development', sourcemaps.write('.')))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulpIf(reload, livereload()));

  done();
}

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

  gulp.watch(['./app/js/*.js'], gulp.series(removeJS, generateJS), done => done());
  gulp.watch(['./app/scss/*.scss', './app/scss/**/*.scss'], gulp.series(removeCSS, generateCSSVendor, generateCSS), done => done());
});