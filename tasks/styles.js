// config import
const config       = require('./../gulpconfig.js');

// Style related.
const gulp         = require('gulp');

const concat       = require('gulp-concat'); // Concatenates JS files
const rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
const changed      = require('gulp-changed'); // event in modify files
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
  scss: function () {
    gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe( autoprefixer(config.autoprefixer) )
    .pipe(sourcemaps.write())
    .pipe( lineec() )
    .pipe(stylefmt())
    .pipe(gulp.dest(config.styles.dist))
    .pipe( postcss([
      cssMqpacker(), // Combine matching media queries.
      cssnano({
        reduceIdents: false,
        zindex: false
      })
    ]) )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.styles.dist))
  },
  basic: function () {
    gulp.src(config.path.src+'/styles/basic.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe( autoprefixer(config.autoprefixer) )
    .pipe( lineec() )
    .pipe(stylefmt())
    .pipe( postcss([
      cssMqpacker(), // Combine matching media queries.
      cssnano({
        reduceIdents: false,
        zindex: false
      })
    ]) )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.path.src+'/media/'))
  }
};
