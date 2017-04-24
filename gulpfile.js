import fs from 'fs';
import path from 'path';

import {argv} from 'yargs';
import gulp from 'gulp';
import sass from 'gulp-sass';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import htmlmin from 'gulp-html-minifier';
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
console.log(`${colors.blue}%s${colors.reset}`, `environment: ${env}`);

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

function generateCSSVendor(done) {
  gulp.src(['./node_modules/reveal/index.css'])
    .pipe(concat('vendor.css'))
    .pipe(gulpIf(env === 'production', minifycss()))
    .pipe(gulp.dest('./dist/css'));

  done();
}

function generateCSS(done) {
  gulp.src('./app/scss/*scss')
    .pipe(plumber())
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
    .pipe(gulpIf(env != 'development', minifycss()))
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

function minifyHTML(done) {
  gulp.src('./app/html/*.html')
  .pipe(htmlmin({collapseWhitespace: true, collapseInlineTagWhitespace: true, ignoreCustomFragments: [/<!--[\s\S]-->/]}))
  .pipe(gulp.dest('./dist'))
  .pipe(gulpIf(reload, livereload()));

  done();
}

function cleanAssets(done) {
  gulp.src(['./dist/css/*.css', './dist/css/*.map', './dist/js/*.js', './dist/js/*.map'])
    .pipe(clean());

  done();
}

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(['./app/js/*.js'], gulp.series(generateJS), done => done());
  gulp.watch(['./app/scss/*.scss', './app/scss/**/*.scss'], gulp.series(generateCSSVendor, generateCSS), done => done());
  gulp.watch(['./app/html/*.html'], gulp.series(minifyHTML), done => done());
});


gulp.task('build', gulp.series(cleanAssets, generateCSSVendor, generateCSS, generateJS, minifyHTML, done => done()));