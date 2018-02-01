/**
 * Variables
 * -----------------------------------------------------------------------------
 */
const fontName = 'Icons';
const src      = './src';
const dist     = './build';

/**
 * Set configurations
 * -----------------------------------------------------------------------------
 */
module.exports = {
  path: {
    build: dist,
    src: src,
  },
  styles: {
    src: src + '/styles/*.scss',
    dist: dist + '/assets/css/'
  },
  autoprefixer: {
    browsers: [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 9",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ]
  },
  components: {
    srcJs: src + '/components/**/**/*.js',
    distJs: dist + '/assets/js/',
    lint: src + '/components/**/**/**/*.js',
    srcCss: src + '/components/*.scss',
    distCss: dist + '/assets/css/'
  },
  modules: {
    srcJs: src + '/modules/**/**/*.js',
    distJs: dist + '/assets/js/',
    lint: src + '/modules/**/**/**/*.js',
    srcCss: src + '/modules/*.scss',
    distCss: dist + '/assets/css/'
  },
  vendors: {
    srcJs: [src + '/vendors/plugins/**/**/**/*.js', src + '/vendors/*.js'],
    distJs: dist + '/assets/js/',
    srcCss: [src + '/vendors/plugins/**/**/*.css', src + '/vendors/plugins/**/**/*.scss'],
    distCss: dist + '/assets/css/'
  },
  scripts:{
    src: src + '/scripts/*.js',
    dist: dist + '/assets/js/',
    lint: src + '/scripts/**/**/**/*.js'
  },
  concat:{
    srcCss: [
      dist + '/assets/css/vendors.min.css',
      dist + '/assets/css/components.min.css',
      dist + '/assets/css/style.min.css'
    ],
    distCss: dist + '/assets/css/',
    srcJs: [
      dist + '/assets/js/vendors.min.js',
      dist + '/assets/js/components.min.js',
      dist + '/assets/js/main.min.js'
    ],
    distJs: dist + '/assets/js/'
  },
  image: {
    src: src + '/assets/images/**/*.{jpg,jpeg,png,gif,svg,ico}',
    dist: dist + '/assets/images/',
    imagemin: {
      progressive: true,
      optimizationLevel: 3, // 0-7 low-high
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    }
  },
  svg: {
    src: src + '/assets/symbols/**/*.svg',
    dist: dist + '/assets/',
    media: src + '/media/',
    symbols: {
      mode: "symbols",
      common: "svg",
      svgId: "svg-%f"
    }
  },
  sprites: {
    src: src + '/assets/sprites/**/*',
    scss: src + '/assets/scss/media/',
    dist: dist + '/assets/images/'
  },
  fonts: {
    src: src + '/assets/fonts/**/*',
    dist: dist + '/assets/fonts/'
  },
  icons: {
    src: src + '/assets/fonts/icons/**/*.svg',
    dist: dist + '/assets/fonts/icons',
    iconFontCss: {
      fontName: fontName,
      targetPath: '../../../../app/assets/scss/media/_icons.scss', //baseado no caminho final para escrever no arquivo de desenvolvimento
      fontPath: 'fonts/icons'
    },
    iconFont: {
      fontName: fontName
    },
    iconFontHtml: {
      fontName: fontName,
      path: src + '/assets/scss/media/iconfonts.html',
      targetPath: 'fonticons.html',
    }
  }

}
