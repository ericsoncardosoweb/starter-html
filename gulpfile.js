/**
 * Gulp for Front End.
 *
 * @author  Ericson Cardoso <contato@ericsoncardoso.com.br>
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

var path = require('path');
var del = require('del');
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
const sequence = require('run-sequence');
var $ = require('gulp-load-plugins')({ rename: { 'gulp-if': 'if' } });

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 1337;
var app = 'src/';
var dist = 'dist/';


/**
 * Local dev server with live reload
 * -----------------------------------------------------------------------------
 */

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});


/**
 * Remove build directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', function(cb) {
  return del([dist], cb);
});


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
// by default build project and then watch files in order to trigger livereload
gulp.task('default', (callback) => sequence(
  'clean',
  'public',
  'vendorStyles',
  'vendorScripts',
  'scripts',
  'styles',
  'basic_style',
  'html',
  'pug',
  'serve',
  'watch',
  callback
));


// waits until clean is finished then builds the project
gulp.task('build', (callback) => sequence(
  'clean',
  'public',
  'allScripts',
  'allStyles',
  'basic_style',
  'html',
  'pug',
  callback
));

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'components/**/*.scss', ['styles', 'basic_style']);
  gulp.watch(app + 'styles/**/*.scss', ['styles', 'basic_style']);
  gulp.watch(app + 'views/**/*.html', ['html']);
  gulp.watch(app + 'public/**/*.*', ['public']);
  gulp.watch(app + 'views/**/*.pug', ['pug']);
  gulp.watch(app + 'components/**/*.js', ['scripts']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
});

/*=============================
=            Tasks Settings            =
=============================*/
// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [                 
  'ie >= 9',
  'ie_mob >= 10', 
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

const minimist = require('minimist');
const options = minimist(process.argv.slice(2), {
  string: ['env'],
  default: {
    env: 'dev',
  },
});

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.sourcemaps.init())
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('public', function () {
  return gulp.src(app + 'public/**/*.*')
    .pipe(gulp.dest(dist + 'public/'))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'views/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// Compile Pug files
gulp.task('pug', function() {
  return gulp.src(app + 'views/site/**/*.pug')
    .pipe($.changed(dist, {
      extension: '.html',
    }))
    .pipe($.pug({
      basedir: app + 'views/',
      pretty: (options.env === 'dev'),
      data: {
        env: options.env,
      },
    })) 
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'PUG' }))
    .pipe($.connect.reload());
});


const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
gulp.task('styles', function (cb) {
  // convert stylus to css
  return gulp.src(app + 'styles/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: isProduction ? 'compress' : 'expanded'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe($.sourcemaps.write('.'))
    .pipe($.if(isProduction,
      $.postcss([
        cssMqpacker(), // Combine matching media queries.
        cssnano({
          reduceIdents: false,
          zindex: false
        })
      ])
      .pipe($.rename({ suffix: '.min' }))
    ))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title: 'css' }))
    .pipe($.connect.reload());
});

gulp.task('basic_style', function (cb) {
  // convert stylus to css
  return gulp.src(app + 'styles/basic.scss')
    .pipe($.sass({
      outputStyle: 'compress'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe($.postcss([
      cssMqpacker(), // Combine matching media queries.
      cssnano({
        reduceIdents: false,
        zindex: false
      })
    ]))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title: 'css basic' }))
    .pipe($.connect.reload());
});

// Vendors Style
gulp.task('vendorStyles', function (cb) {
  // convert stylus to css
  return gulp.src([app + 'vendors/static/**/*.scss', app + 'vendors/static/**/*.css'])
    .pipe($.sass({
      outputStyle: 'compress'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(
      $.postcss([
        cssMqpacker(), // Combine matching media queries.
        cssnano({
          reduceIdents: false,
          zindex: false
        })
      ])
    )
    .pipe($.concat('vendors.min.css'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title: 'vendor styles' }))
    .pipe($.connect.reload());
});

// Concatenação de scripts
gulp.task('vendorScripts', function (cb) {
  // convert stylus to css
  return gulp.src(app + 'vendors/static/**/*.js')
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title: 'vendor scripts' }))
    .pipe($.connect.reload());
});

// Concatenação de estilos
gulp.task('allStyles', function (cb) {
  // convert stylus to css
  return gulp.src([app + 'styles/main.scss', app + 'vendors/static/**/*.css', app + 'vendors/static/**/*.scss'])
    .pipe($.sass({
      outputStyle: 'compress'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(
      $.postcss([
        cssMqpacker(), // Combine matching media queries.
        cssnano({
          reduceIdents: false,
          zindex: false
        })
      ])
    )
    .pipe($.concat('all.min.css'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title: 'allStyles' }))
    .pipe($.connect.reload());
});

// Concatenação de scripts
gulp.task('allScripts', function (cb) {
  // convert stylus to css
  return gulp.src([dist + 'js/vendor.js', dist + 'js/main.js'])
    .pipe($.uglify())
    .pipe($.concat('all.min.js'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title: 'allScripts' }))
    .pipe($.connect.reload());
});