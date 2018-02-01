/**
 * Gulp for Front End.
 *
 * @businnes Lumus Inteligência Estratégica
 * @author  Ericson Cardoso <ericson.cardoso@bliteti.com.br>
 * @version 2.0.0
 * @license The MIT License (MIT)
 *  Copyright (c) 2018 JustCoded.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:

 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */
/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

const config = require('./gulpconfig.js');//Gulp settings and variables

const requireDir  = require('require-dir');
const tasks       = requireDir('./tasks');

const bs = require('browser-sync');
const livereload    = require('gulp-livereload');

const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const include = require('gulp-include');

const minimist = require('minimist');
const nano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sequence = require('run-sequence');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');


/**
 * Catch stream errors
 * -----------------------------------------------------------------------------
 */

const gulpSrc = gulp.src;

gulp.src = function onError(...args) {
  return gulpSrc
    .apply(gulp, args)
    // Catch errors
    .pipe(plumber(function onError(error) {
      gutil.log(gutil.colors.red(`Error (${error.plugin}):${error.message}`));
      this.emit('end');
    }));
};

/**
 * Default task
 * -----------------------------------------------------------------------------
 */

gulp.task('default', (callback) => sequence(
  ['build'],
  ['server'],
  ['concatFiles'],
  callback
));

/**
 * Local dev server with live reload
 * -----------------------------------------------------------------------------
 */

gulp.task('server', () => {
  // var server = livereload();
  // livereload.listen();
  // Create and initialize local server
  bs.create();
  bs.init({
    notify: false,
    server: config.path.build,
    open: 'local',
    ui: false,
  });
  // Watch for build changes and reload browser
  bs.watch(config.path.build + '/**/**/**/*').on('change', bs.reload);
  // Watch for source changes and execute associated tasks

  gulp.watch(`./${config.path.src}/data/**/*`, ['files:data']);
  gulp.watch(`./${config.path.src}/media/**/*`, ['files:media']);
  gulp.watch(`./${config.path.src}/misc/**/*`, ['files:misc']);
  gulp.watch(`./${config.path.src}/assets/fonts/**/*`, ['media:fonts']);
  gulp.watch(`./${config.path.src}/assets/images/**/*`, ['media:images']);
  gulp.watch(`./${config.path.src}/assets/icons/**/*`, ['media:icons']);
  gulp.watch(`./${config.path.src}/assets/symbols/**/*`, ['media:symbols']);
  gulp.watch(`./${config.path.src}/assets/sprites/**/*`, ['media:sprites']);
  gulp.watch(`./${config.path.src}/scripts/**/**/*.js`, ['scripts:js']);
  gulp.watch(`./${config.path.src}/components/**/**/*.js`, ['components:js']);
  gulp.watch(`./${config.path.src}/components/**/**/*.scss`, ['components:css']);
  gulp.watch(`./${config.path.src}/modules/**/**/*.js`, ['modules:js']);
  gulp.watch(`./${config.path.src}/modules/**/**/**/*.scss`, ['modules:css']);
  gulp.watch(`./${config.path.src}/vendors/**/**/**/*.js`, ['vendors:js']);
  gulp.watch(`./${config.path.src}/vendors/**/**/**/*.scss`, ['vendors:css']);
  gulp.watch(`./${config.path.src}/styles/**/**/**/*.scss`, ['styles:scss']);
  gulp.watch(`./${config.path.src}/styles/**/**/**/*.scss`, ['styles:basic']);
  gulp.watch(`./${config.path.src}/views/**/**/**/*.pug`, ['views:pug']);
});

/**
 * Build static assets
 * -----------------------------------------------------------------------------
 */

gulp.task('build', (callback) => sequence(
  ['clean'],
  ['assets'],
  ['scripts:js'],
  ['styles:scss'],
  ['styles:basic'],
  ['components:js'],
  ['components:css'],
  ['modules:js'],
  ['modules:css'],
  ['vendors:js'],
  ['vendors:css'],
  ['views:pug'],
  callback
));

/**
 * Remove build directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', () => del('./build'));

/**
 * Assets
 * -----------------------------------------------------------------------------
 */

gulp.task('assets', (callback) => sequence(
  ['files:data'],
  ['files:media'],
  ['files:misc'],
  ['media:images'],
  ['media:symbols'],
  ['media:icons'],
  ['media:sprites'],
  callback
));

/**
 * Concat files
 * -----------------------------------------------------------------------------
 */

gulp.task('concatFiles', (callback) => sequence(
  ['concat:styles'],
  ['concat:scripts'],
  callback
));


/*=============================
=            TASKS            =
=============================*/
gulp.task('views:pug', tasks.views.pug);

gulp.task('styles:scss', tasks.styles.scss);
gulp.task('styles:basic', tasks.styles.basic);

gulp.task('scripts:lint', tasks.scripts.lint);
gulp.task('components:lint', tasks.components.lint);
gulp.task('modules:lint', tasks.modules.lint);

gulp.task('scripts:js', ['scripts:lint'], tasks.scripts.js);

gulp.task('components:js', ['components:lint'], tasks.components.js);
gulp.task('components:css', tasks.components.css);

gulp.task('modules:js', ['modules:lint'], tasks.modules.js);
gulp.task('modules:css', tasks.modules.css);

gulp.task('vendors:js', tasks.vendors.js);
gulp.task('vendors:css', tasks.vendors.css);

gulp.task('concat:scripts', tasks.concat.scripts);
gulp.task('concat:styles', tasks.concat.styles);

gulp.task('files:data', tasks.files.data);
gulp.task('files:media', tasks.files.media);
gulp.task('files:misc', tasks.files.misc);

gulp.task('media:images', tasks.media.images);
gulp.task('media:icons', tasks.media.icons);
gulp.task('media:symbols', tasks.media.symbols);
gulp.task('media:sprites', tasks.media.sprites);
