// config import
const config       = require('./../gulpconfig.js');

// Style related.
const gulp         = require('gulp');
const livereload   = require('gulp-livereload'); //server

const imagemin     = require('gulp-imagemin'); // optimized images
const svgSprite    = require("gulp-svg-sprites"); // create symbols svg
const iconfont     = require('gulp-iconfont'); // create fonicons
const iconfontCss  = require('gulp-iconfont-css'); // auto make style fonticon
const iconfontHtml = require('gulp-iconfont-template'); // auto make html reference fonticon
const changed      = require('gulp-changed'); // event in modify files
const spritesmith  = require("gulp-spritesmith");
const gulpif       = require('gulp-if');

/**
 * Task: This task group is responsible for managing and compiling the media and files of the site such as: images, icons, symbol links and sprites
 *
 * This task does the following:
 *  1. images: download images and optimize your web size
 *  2. icons: transform svg files into a font family
 *  3. symbols: transform svg files into symbol links
 *  4. sprites: convert png images into a single already with css declared to optimize your code
 */

/**
 * Set build options
 * -----------------------------------------------------------------------------
 */

module.exports = {
  images: function () {
    gulp.src(config.image.src)
    .pipe(changed(config.image.dist))
    .pipe(imagemin(config.image.imagemin))
    .pipe(gulp.dest(config.image.dist))
    .pipe(livereload());
  },
  symbols: function () {
    gulp.src(config.svg.src)
    .pipe(svgSprite(config.svg.symbols))
    .pipe(gulp.dest(config.svg.dist))
    .pipe(livereload());
  },
  icons: function () {
    gulp.src([config.icons.src])
    .pipe(iconfontHtml(config.icons.iconFontHtml))
    .pipe(iconfontCss(config.icons.iconFontCss))
    .pipe(iconfont(config.icons.iconFont))
    .pipe(gulp.dest(config.icons.dist))
    .pipe(livereload());
  },
  sprites: function () {
    gulp.src([config.sprites.src])
    .pipe(spritesmith({
        imgName: 'sprite.png',
        styleName: '_sprites.scss',
        imgPath: '../images/sprite.png'
    }))
    .pipe(gulpif('*.png', gulp.dest(config.sprites.dist)))
    .pipe(gulpif('*.scss', gulp.dest(config.sprites.scss)))
    .pipe(livereload());
  },
  fonts: function () {
    gulp
    // Select files
    .src([config.fonts.src])
    // Check for changes
    .pipe(changed([config.fonts.dist]))
    // Save files
    .pipe(gulp.dest([config.fonts.dist]))
    .pipe(livereload());
  },
};
