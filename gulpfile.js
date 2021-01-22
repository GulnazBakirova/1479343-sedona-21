const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
    return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
    autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
    csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;




// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// Script
const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.scripts = scripts;


// Оптимизация изображений

const images = () => {
 return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    ]))
    .pipe(gulp.dest("build/img"))
};

exports.images = images;


// Конвертация изображений в WebP

const createWebp = () => {
    return gulp.src("source/img/**/*.{jpg,png}")
 .pipe(webp({quality: 90}))
 .pipe(gulp.dest("build/img"))
};

exports.createWebp = createWebp;


// Sprite

const sprite = () => {
 return gulp.src("source/img/icons/*.svg")
 .pipe(svgstore())
 .pipe(rename("sprite.svg"))
 .pipe(gulp.dest("build/img"))
};

exports.sprite = sprite;


// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.{jpg,png,svg}"
  ],
  {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;


// Clean


const clean = () => {
    return del("build");
};

exports.clean = clean;




// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
};



// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

exports.build = build;



exports.default = gulp.series(
  build, server, watcher
);
