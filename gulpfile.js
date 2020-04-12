'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./src/**/index.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/**/*.scss', gulp.series('sass'));
});

gulp.task('js', function() {
    return gulp.src('./src/**/index.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('js:watch', function() {
    gulp.watch('./src/**/*.js', gulp.series('js'));
});

gulp.task('connect', function() {
  connect.server();
});

// gulp.task('dev', ['connect', 'js:watch', 'sass:watch']);