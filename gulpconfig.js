/**
 * # Gulp Configuration.
 * ------------------------------------------------------------------
 */
const paths = {
  src: './app/',
  dist: './dist/'
}

var fontName = 'Icons';

module.exports = {
  // Browser Sync
  browsersync: {
    files: ['**/*', '!**.map', '!**.css'], // Exclude map files.
    notify: false, // 
    open: true, // Set it to false if you don't like the broser window opening automatically.
    port: 8080, // 
    proxy: 'localhost/', // 
    watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    }
  },

  // Style Related.
  style: {
    build: [ 
      {
        src: paths.src + 'assets/scss/*.scss', // Path to main .scss file.
        dest: paths.dist + 'assets/css/', // Path to place the compiled CSS file.
        sourcemaps: true, // Allow to enable/disable sourcemaps or pass object to configure it.
        minify: true, // Allow to enable/disable minify the source.
      }
    ],

    // Browsers you care about for auto-prefixing.
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

    // SASS Configuration for all builds.
    sass: { 
      errLogToConsole: true,
      outputStyle: 'compressed',
    },

    // CSS MQ Packer configuration for all builds and style tasks.
    cssMqpacker: { 
    },

    // CSS nano configuration for all builds.
    cssnano: { 
      reduceIdents: false,
      zindex: false
    }
  },
  
  // Script related.
  script: {
    bundles: [
      {
        src: [
          paths.src + 'assets/js/scripts/**/*.js',
          paths.src + 'assets/js/functions/**/*.js',
          paths.src + 'assets/js/ready.js',
          paths.src + 'assets/js/app.js',
        ],
        dest: paths.dist + 'assets/js/main.js', // Destination of the bundle.
        sourcemaps: true, // Allow to enable/disable sourcemaps or pass object to configure it.
        babel: true // Allow to enable/disable babel compiler or pass object to configure it.
      }
    ],
    minify: [
      {
        src: [
          paths.dist + 'assets/js/main.js'
        ],
        dest: paths.dist + 'assets/js/', 
        sourcemaps: true // Allow to enable/disable sourcemaps or pass object to configure it.
      }
    ],
    lint: {
      src: [
        paths.dist + 'assets/js/main.js',
      ]        
    }
  },

  // Images related.
  image: {
    src: paths.src + 'assets/images/**/**/*.{jpg,jpeg,png,gif,svg}',
    dist: paths.dist + 'assets/images/',
    // Configuration of imagemin plugin for all builds.
    imagemin: {
      progressive: true,
      optimizationLevel: 3, // 0-7 low-high
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    }
  },

  // svg
  svg: {
    src: paths.src + 'assets/symbols/**/*.svg',
    dist: paths.dist + 'assets/',
    symbols: {
      mode: "symbols",
      common: "svg",
      svgId: "svg-%f"
    }
  },

  // fonticon
  fonticon: {
    src: paths.src + 'assets/fonts/icons/**/*.svg',
    dist: paths.dist + 'assets/fonts/icons',
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
      path: paths.src + 'assets/scss/media/iconfonts.html',
      targetPath: 'fonticons.html',
    }
  },

  // Compress related.
  compress: {
    filename: 'pack.zip',
    src: [
      '**/*',
      '!**/*.map',
      '!todo',
      '!.todo',
      '!pack.zip',
      '!bs-config.js',
      '!.vscode',
      '!node_modules/**',
      '!.gitignore',
    ],  
    dest: './'
  },

  // Clean specific files.
  clean: [
    '**/.DS_Store',
    './assets/js/**/*.min.js',
    '**/*.map',
    '**/*.min.css',
    'assets/fonts/**/**/*'
  ],

  // Watch related.
  watch: {
    css: [paths.src + 'assets/sass/**/**/**/*.scss'],
    js: [paths.src + 'assets/js/**/**/**/*.js', !paths.src + 'assets/assets/js/**/*.min.js'],
    html: [paths.src + '**/**/**/*.{html,php,phtml}'],
    symbols: [paths.src + 'assets/symbols/**/*'],
    images: [paths.src + 'assets/images/**/*']
  }
};