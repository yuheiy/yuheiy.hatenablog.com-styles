const vfs = require('vinyl-fs')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const gapProperties = require('postcss-gap-properties')
const csswring = require('csswring')
const header = require('gulp-header')
const browserSync = require('browser-sync')
const { series } = require('bach')

let isDebug = true

let postcssPlugins = null

const css = () => {
  if (!postcssPlugins) {
    postcssPlugins = [
      autoprefixer({
        cascade: false,
      }),
      gapProperties(),
      !isDebug && csswring(),
    ].filter(Boolean)
  }

  return vfs
    .src('main.scss')
    .pipe(rename({ suffix: '.bundle' }))
    .pipe(gulpif(isDebug, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(isDebug, sourcemaps.write()))
    .pipe(header('/*! Responsive: yes */\n'))
    .pipe(vfs.dest('.'))
}

const serve = (done) => {
  const bs = browserSync.create()

  bs.init(
    {
      notify: false,
      ui: false,
      server: true,
      files: [
        {
          match: 'main.scss',
          fn: css,
        },
        'main.bundle.css',
      ],
      watchEvents: ['add', 'change', 'unlink'],
      ghostMode: false,
      open: false,
      socket: {
        domain: 'localhost:3000',
      },
    },
    done,
  )
}

const script = process.argv[2]
let main = null

switch (script) {
  case 'start':
    main = series(css, serve)
    break
  case 'build':
    isDebug = false
    main = series(css)
    break
}

if (main) {
  main((err) => {
    if (err) {
      process.exitCode = 1
      console.trace(err)
    }
  })
}
