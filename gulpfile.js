const gulp = require('gulp');
const { series, parallel } = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
// const terser = require('gulp-terser');
const del = require('del');
// const cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

function clean() {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'dist/**/*',
  ]);
};

function copyUploads() {
    return gulp.src('./src/uploads/*')
      .pipe(gulp.dest('./dist/uploads'));
  }

function compileScss () {
    return gulp.src('./src/**/index.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
};

function watchScss() {
    gulp.watch('./src/**/*.scss', gulp.series(compileScss));
};

function buildJavaScript() {
    return gulp.src('./src/**/index.js')
        .pipe(gulp.dest('./dist'));
};

function watchJavaScript () {
    gulp.watch('./src/**/*.js', gulp.series(buildJavaScript));
}

function startServer () {
    connect.server();
}

exports.build = series(
    clean,
    copyUploads,
    buildJavaScript,
    compileScss
);

exports.dev = series(
    clean,
    copyUploads,
    buildJavaScript,
    compileScss,
    parallel(startServer, watchJavaScript, watchScss)
);

// exports.prod = series(
//     clean,
//     copyUploads
// );