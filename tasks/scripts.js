// config import
const config     = require('./../gulpconfig.js');

// Style related.
const gulp       = require('gulp');

const concat     = require('gulp-concat'); // Concatenates JS files
const uglify     = require('gulp-uglify'); // Minifies JS files
const babel      = require("gulp-babel"); // JavaScript compiler to write next generation JavaScript.
const eslint     = require('gulp-eslint'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector
const rename     = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
const changed    = require('gulp-changed'); // event in modify files
const include    = require('gulp-include');
const sourcemaps = require('gulp-sourcemaps'); // sourcemap js and css

/**
 * Task: `scripts`
 *
 * This task does the following.
 *  1. Gets the source JavaScript files.
 *  2. Compiler all JS files on Babel.
 *  3. Concatenates JS files.
 *  4. Corrects the line endings.
 *  5. Writes sourcemaps for it.
 */

module.exports = {
  js: function () {
    gulp
    // Select files
    .src(config.scripts.src)
    // source map
    .pipe(sourcemaps.init())
    // Concatenate includes
    .pipe(include())
    // Transpile
    .pipe(babel())
    // write source map
    .pipe(sourcemaps.write())
    // Save unminified file
    .pipe(gulp.dest(config.scripts.dist))
    // Optimize and minify
    .pipe(uglify())
    // Append suffix
    .pipe(rename({
      suffix: '.min',
    }))
    // Save minified file
    .pipe(gulp.dest(config.scripts.dist))
  },
  lint: function () {
    gulp
    // Select files
    .src(config.scripts.lint)
    // Check for errors
    .pipe(eslint())
    // Format errors
    .pipe(eslint.format())
  }
};
