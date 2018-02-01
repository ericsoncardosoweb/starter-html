// config import
const config     = require('./../gulpconfig.js');

// Style related.
const gulp       = require('gulp');
const minimist   = require('minimist');
const livereload = require('gulp-livereload'); //server

const changed    = require('gulp-changed');
const pug        = require('gulp-pug');

/**
 * Task: Tasks for creating view files {php.html, pug, nunjucks, etc ...}
 *
 * https://pugjs.org/api/getting-started.html
 *
 * This task does the following:
 *  1. PUG is an HTML preprocessor designed to optimize front-end development
 */

/**
 * Set build options
 * -----------------------------------------------------------------------------
 */

const options = minimist(process.argv.slice(2), {
  string: ['env'],
  default: {
    env: 'dev',
  },
});

module.exports = {
  pug: function () {
    gulp
    // Select files
    .src(`${config.path.src}/views/site/**/*.pug`)
    // Check which files have changed
    .pipe(changed(config.path.build, {
      extension: '.html',
    }))
    // Compile Pug
    .pipe(pug({
      basedir: `${config.path.src}/views`,
      pretty: (options.env === 'dev'),
      data: {
        env: options.env,
      },
    }))
    // Save files
    .pipe(gulp.dest(config.path.build))
    // .pipe(livereload())
  }
};
