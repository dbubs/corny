'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var babel = require('gulp-babel');

var pkg = require('./package.json');

var DEST = 'dist/';
var banner = [
  '  /*',
  '   * <%= name %> - <%= homepage %>',
  '   * Version - <%= version %>',
  '   * Licensed under the ISC license - https://opensource.org/licenses/ISC',
  '   * ',
  '   * Copyright (c) <%= new Date().getFullYear() %> <%= author.name %> <<%= author.email %>>',
  '  */\n\n',
].join('\n');

gulp.task('compileJs', function() {
  return gulp.src('lib/**/*.js')
    .pipe(concat('corny.js'))
    .pipe(header(banner, pkg))
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to corny.min.js
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(header(banner, pkg))
    .pipe(gulp.dest(DEST));
});

gulp.task('babelify', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['babelify', 'compileJs']);
