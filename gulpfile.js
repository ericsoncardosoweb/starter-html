'use strict';
/**
 * Gulp for Front End.
 * 
 * @author  Ericson Cardoso <contato@ericsoncardoso.com.br>
 * @version 2.0.0
 * @license The MIT License (MIT)
 */

/**
 * # Load Plugins
 * ------------------------------------------------------------------
 */
  const gulp   = require('gulp');
  const config = require('./gulpconfig.js');
  const gutil  = require('gulp-util');

  // Style related.
  const postcss      = require('gulp-postcss'); // Transforming styles with JS plugins 
  const sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
  const cssnano      = require('cssnano'); // Minifies CSS files.
  const autoprefixer = require('autoprefixer'); // Autoprefixing magic.
  const csscomb      = require('gulp-csscomb'); // CSS coding style formatter
  const rtlcss       = require('rtlcss'); // Convert LTR CSS to RTL.
  const stylefmt     = require('stylefmt');  // Auto CSS formating.
  const cssMqpacker  = require('css-mqpacker'); // Packing same CSS media query rules into one.

  // Javascript related.
  const concat = require('gulp-concat'); // Concatenates JS files
  const jshint = require('gulp-jshint'); // Detect errors and potential problems in JavaScript code
  const uglify = require('gulp-uglify'); // Minifies JS files
  const babel  = require("gulp-babel"); // JavaScript compiler to write next generation JavaScript.

  // Image related.
  const imagemin = require('gulp-imagemin');

  // SVG
  const svgSprite = require("gulp-svg-sprites");

  // Font Icon
  const iconfont         = require('gulp-iconfont');
  const iconfontCss      = require('gulp-iconfont-css');
  const iconfontHtml = require('gulp-iconfont-template');

  // HTML
  const gih = require("gulp-include-html");
  const fileinclude = require('gulp-file-include');
  const markdown = require('markdown');

  // Utility related plugins.
  const rename      = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
  const lineec      = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
  const filter      = require('gulp-filter');   // Enables you to work on a subset of the original files by filtering them using globbing.
  const sourcemaps  = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
  const browserSync = require('browser-sync').create();
  const reload      = browserSync.reload;
  const sort        = require('gulp-sort'); // Recommended to prevent unnecessary changes in pot-file.
  const zip         = require('gulp-zip');  // ZIP compress files
  const mergeStream = require('merge-stream'); // Merges a bunch of streams.
  const debug       = require('gulp-debug');
  const gulpif      = require('gulp-if');
  const del         = require('del');
  const runSequence = require('run-sequence');
  const lazypipe    = require('lazypipe');
  runSequence.options.ignoreUndefinedTasks = true;
  runSequence.options.showErrorStackTrace = false;

/**
 * # Tasks
 * ------------------------------------------------------------------
 */

/**
 * Task: `serve`
 * 
 * Live reload, CSS injection.
 */
gulp.task('browser-sync', function(){
  browserSync.init(config.browsersync)
});

gulp.task('serve', ['browser-sync']);

// ------------------------ Style Tasks ------------------------

/**
 * Task: `styles-build`
 * 
 * This task does the following:
 *  1. Gets the source scss files.
 *  2. Compile SASS to CSS.
 *  3. Write sourcemaps for it.
 *  4. Autoprefix CSS
 *  5. Combo CSS.
 *  6. Merge Media Queries only for .min.css version.
 *  7. Minify CSS.
 *  8. Inject CSS or reloads the browser via browserSync.
 */
gulp.task('styles-build', function(){
  var builds = config.style.build.map(function(build){

    ['sourcemaps', 'minify'].forEach(item => {
      build[item] = 'undefined' === typeof build[item] ? Object() : build[item];
      build[item] = true === build[item] ? Object() : build[item]; 
    }); 

    return gulp.src(build.src)
      .pipe( gulpif(build.sourcemaps, sourcemaps.init(build.sourcemaps)) )
      .pipe( sass(config.style.sass) ) // Sass compilation.
      .on('error', console.error.bind(console))

      .pipe( postcss([
        autoprefixer(config.style.autoprefixer), // Automatically CSS vendor prefixes 
        stylefmt(config.style.stylefmt), // Auto CSS formating.
      ]) )

      .pipe( gulpif(build.sourcemaps, sourcemaps.write('./')) )
      .pipe( lineec() ) // Fix line endings.
      .pipe( browserSync.stream() ) // Reloads `style.css` if that is enqueued.
      .pipe( gulp.dest(build.dest) )
      .pipe( gulpif( build.minify, minifyChannel()()) );

      // Minify channel.
      function minifyChannel(){
        return lazypipe()
        .pipe( rename, {suffix: '.min'}) // Append ".min" to the filename.
        .pipe( filter, '**/*.css') // Filtering stream to only css files
        .pipe( postcss, [
          cssMqpacker(config.style.cssMqpacker), // Combine matching media queries.
          cssnano(config.style.cssnano) // Minify `style.min.css` file.
        ])
        .pipe( browserSync.stream ) // Reloads `style.min.css` if that is enqueued.
        .pipe( gulp.dest, build.dest );
      }
    });

  return mergeStream(builds);
});

/**
 * Task: `style` 
 * 
 * This task runs the following tasks sequently:
 *  
 * styles-build
 */
gulp.task('styles', function(callback){
  runSequence('styles-build', callback);
});

// ------------------------ Script Tasks ------------------------

/**
 * Task: `js-lint`
 * 
 * This task Checks scripts for errors.
 */
gulp.task( 'js-lint', function(){
  return gulp.src(config.script.lint.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * Task: `js-bundle`
 *  
 * This task does the following.
 *  1. Gets the source JavaScript files.
 *  2. Compiler all JS files on Babel.
 *  3. Concatenates JS files.
 *  4. Corrects the line endings.
 *  5. Writes sourcemaps for it.
 */
gulp.task('js-bundle', function(){
  var bundles = config.script.bundles.map(function(bundle){

    ['sourcemaps', 'babel'].forEach(item => {
      bundle[item] = 'undefined' === typeof bundle[item] ? Object() : bundle[item];
      bundle[item] = true === bundle[item] ? Object() : bundle[item]; 
    });

    return gulp.src(bundle.src)
      .pipe( gulpif(bundle.sourcemaps, sourcemaps.init(bundle.sourcemaps) ))
      .pipe( gulpif(bundle.babel, babel(bundle.babel)) )
      .pipe( concat(bundle.dest.substring( bundle.dest.lastIndexOf('/'), bundle.dest.length ) ) )
      .pipe( lineec() ) // Fix line endings.
      .pipe( gulpif(bundle.sourcemaps, sourcemaps.write('./') ))
      .pipe( filter(['**/*.js.map', '**/*.js']) )
      .pipe( gulp.dest(bundle.dest.substring(0, bundle.dest.lastIndexOf('/'))) );
  });

  return mergeStream(bundles);
});

/**
 * Task: `js-minify`
 * 
 * This task minifies JS files and suffix them to `.min`.
 */
gulp.task('js-minify', function(){
  var builds = config.script.minify.map(function(build){
    return gulp.src(build.src)
      .pipe( uglify() )
      .pipe( rename({suffix: '.min'}) )
      .pipe( filter( '**/*.js' ) ) // Filtering stream to only javascript files
      .pipe( gulp.dest(build.dest) );
  });

  return mergeStream(builds);
});

/**
 * Task: `js`
 * 
 * This task runs the following tasks sequently:
 * 
 * js-lint -> js-bundle -> js-minify
 */
gulp.task('js', function(callback){
  runSequence('js-lint', 'js-bundle', 'js-minify', callback);
});

gulp.task('js-plugins', function(){
  return gulp.src('app/assets/plugins/**/**/**/*.js')
    .pipe(concat('plugins.min.js'))
    .pipe( uglify() )
    .pipe( filter( '**/*.js' ) ) // Filtering stream to only javascript files
    .pipe( gulp.dest('dist/assets/js/') );
});

gulp.task('css-plugins', function(){
  return gulp.src('app/assets/plugins/**/**/**/*.{css, scss}')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(concat('plugins.min.css'))
    .pipe( gulp.dest('dist/assets/css/') );
});


/**
 * # HTML, PHP, NUNJUCKS
 * ------------------------------------------------------------------
 */
gulp.task('html', function(){
 gulp.src(['app/*.{html,php,phtml}','app/views/*.{html,php,phtml}','app/components/**/**/*.{html,php,phtml}'])
 // .pipe(gih())
 .pipe(fileinclude({
   prefix: '@@',
   basepath: '@file',
   filters: {
     markdown: markdown.parse
   }
 }))
 .pipe(gulp.dest('dist'))
});

/**
 * # Fonts, Icons and Images
 * ------------------------------------------------------------------
 */
/**
 * Task: `image`
 * 
 * This task minifies PNG, JPEG, GIF, and SVG files.
 */
gulp.task('images', function(){
  gulp.src(config.image.src)
  .pipe(imagemin(config.image.imagemin))
  .pipe(gulp.dest(config.image.dist))
});

gulp.task('symbols', function(){
    gulp.src(config.svg.src)
    .pipe(svgSprite(config.svg.symbols))
    .pipe(gulp.dest(config.svg.dist))
});

gulp.task('fonticon', function(){
  gulp.src([config.fonticon.src])
  .pipe(iconfontHtml(config.fonticon.iconFontHtml))
  .pipe(iconfontCss(config.fonticon.iconFontCss))
  .pipe(iconfont(config.fonticon.iconFont))
  .pipe(gulp.dest(config.fonticon.dist));
});



/**
 * Task: `compress`
 * 
 * Compress all theme files to final zip file.
 */
gulp.task('compress', function(){
	return gulp.src(config.compress.src)
		.pipe(zip(config.compress.filename)) // Zip compress files.
		.pipe(gulp.dest(config.compress.dest));
});

/**
 * Task: `clean`
 * 
 * Clean specific build files of your theme/plugin.
 */
gulp.task('clean', function(){
  return del(config.clean);
});

/**
 * Task: `watch`
 * 
 * Watch css, javascript and images files.
 */
gulp.task('watch', function(){
  browserSync.init(config.browsersync)
  gulp.watch(config.watch.css, ['styles']);
  gulp.watch(config.watch.js, ['js']);
  gulp.watch(config.watch.symbols, ['symbols', reload]);
  gulp.watch(config.watch.images, ['images', reload]);
  gulp.watch(config.watch.html, ['html', reload]);
});

gulp.task('default', ['images', 'symbols', 'fonticon', 'styles', 'js', 'js-plugins', 'css-plugins', 'html', 'serve']);