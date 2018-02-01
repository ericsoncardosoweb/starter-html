// config import
const config     = require('./../gulpconfig.js');

// Style related.
const gulp       = require('gulp');
const minimist   = require('minimist');
const livereload = require('gulp-livereload'); //server

const changed    = require('gulp-changed');

/**
 * Task: Tasks to migrate required app files
 *
 * This task does the following:
 *  1. date: This is where the data structure files are allocated with {json, xml, csv, etc}
 *  2. media: This is where extra files that do not require compilation are to be allocated and which must be inserted in their respective paths
 *  3. misc: In this directory you can define files that will be used according to the development stage. Ex: Production, Homologation, Development, ...
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
  data: function () {
    gulp
    // Select files
    .src(`${config.path.src}/data/**/*`)
    // Check for changes
    .pipe(changed(`${config.path.build}/data`))
    // Save files
    .pipe(gulp.dest(`${config.path.build}/data`))
  },
  media: function () {
    gulp
    // Select files
    .src(`${config.path.src}/media/**/*`)
    // Check for changes
    .pipe(changed(`${config.path.build}/media`))
    // Save files
    .pipe(gulp.dest(`${config.path.build}/media`))
  },
  misc: function () {
    gulp
    // Select files
    .src([
      `${config.path.src}/misc/${options.env}/**/*`,
      `${config.path.src}/misc/all/**/*`,
    ], {
      dot: true,
    })
    // Check for changes
    .pipe(changed(config.path.build))
    // Save files
    .pipe(gulp.dest(config.path.build));

  }
};
