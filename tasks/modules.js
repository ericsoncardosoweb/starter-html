// config import
const config       = require('./../gulpconfig.js');

// Style related.
const gulp         = require('gulp');

const concat       = require('gulp-concat'); // Concatenates JS files
const uglify       = require('gulp-uglify'); // Minifies JS files
const babel        = require("gulp-babel"); // JavaScript compiler to write next generation JavaScript.
const eslint       = require('gulp-eslint'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector
const jshint       = require('gulp-jshint'); //Check erros js
const rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
const changed      = require('gulp-changed'); // event in modify files
const include      = require('gulp-include');
const sourcemaps   = require('gulp-sourcemaps'); // sourcemap js and css

const lineec       = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector
const postcss      = require('gulp-postcss'); // Transforming styles with JS plugins
const sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
const cssnano      = require('cssnano'); // Minifies CSS files.
const autoprefixer = require('gulp-autoprefixer'); // Automatically CSS vendor prefixes
const csscomb      = require('gulp-csscomb'); // CSS coding style formatter
const stylefmt     = require('gulp-stylefmt');  // Auto CSS formating.
const rtlcss       = require('rtlcss'); // Convert LTR CSS to RTL.
const cssMqpacker  = require('css-mqpacker'); // Packing same CSS media query rules into one.

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
    gulp.src([config.modules.srcJs])
    // Concatenate includes
    .pipe(include())
    // Transpile
    .pipe(babel())
    .pipe(concat('modules.js'))
    .pipe(gulp.dest(config.modules.distJs))
    // Optimize and minify
    .pipe(uglify())
    // Append suffix
    .pipe(rename({
      suffix: '.min',
    }))
    // Save minified file
    .pipe(gulp.dest(config.modules.distJs))
  },
  lint: function () {
    gulp
    // Select files
    .src(config.modules.lint)
    // Check for errors
    .pipe(jshint())
    // Format errors
    .pipe(eslint.format())
  },
  css: function () {
    gulp.src(config.modules.srcCss)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe( autoprefixer(config.autoprefixer) )
    .pipe(sourcemaps.write())
    .pipe( lineec() )
    .pipe(stylefmt())
    .pipe(gulp.dest(config.modules.distCss))
    .pipe( postcss([
      cssMqpacker(), // Combine matching media queries.
      cssnano({
        reduceIdents: false,
        zindex: false
      })
    ]) )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.modules.distCss))
  }
};