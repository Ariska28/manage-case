"use strict";

require('dotenv').config();

const gulp = require('gulp');

/* eslint-disable no-param-reassign */

const plugins =  {
    browserSync: require('browser-sync'),
    del: require('del'),
    runSequence: require('run-sequence'),
    sass: require('gulp-sass'),
    autoprefixer: require('autoprefixer'),
    cssnano: require('cssnano'),
    postcss: require('gulp-postcss'),
    babel: require('gulp-babel'),
    uglify: require('gulp-uglify'),
    rename: require('gulp-rename'),
    concat: require('gulp-concat'),
    cssTimeStamp: require('gulp-timestamp-css-url'),
    imagemin: require('gulp-imagemin'),
    rigger: require('gulp-rigger'),
    iconfont: require('gulp-iconfont')
};

const tasks = [
    './gulp-tasks/icon-font',
    './gulp-tasks/clean',
    './gulp-tasks/serve',
    './gulp-tasks/styles',
    './gulp-tasks/watch',
    './gulp-tasks/scripts',
    './gulp-tasks/html',
    './gulp-tasks/copy',
    './gulp-tasks/images',
];

const dirs = {
    src: './src',
    dist: './public',
    node_modules: './node_modules',
    templates: './../templates',
    temp: '/.tmp'
};

const soursPath = {
    php: {
      watch: './../templates/**/*.php'
    },
    styles: {
        build: [
            `${dirs.src}/scss/styles.scss`,
            `${dirs.src}/scss/styles-*.scss`,
            `${dirs.src}/scss/admin.scss`
        ],
        watch: [`${dirs.src}/scss/**/*.scss`],
        dist: `${dirs.dist}/css`,
        // temp: [`${dirs.temp}/css`],
        vendors: [
            `${dirs.node_modules}/select2/dist/css/select2.css`,
            `${dirs.node_modules}/slick-carousel/slick/slick.css`,
            `${dirs.node_modules}/ion-rangeslider/css/ion.rangeSlider.css`,
            `${dirs.node_modules}/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css`,
        ],
    },
    html: {
        build: [`${dirs.src}/index.html`, `${dirs.src}/**/pages/*.html`],
        watch: [`${dirs.src}/**/*.html`],
        // temp: [`${dirs.temp}/index.html`, `${dirs.temp}/pages/*.html`],
        dist: `${dirs.dist}`,
    },
    images: {
        build: [`${dirs.src}/images/*.*`],
        watch: [`${dirs.src}/images/*.*`],
        // temp: [`${dirs.temp}/images/*.*`],
        dist: `${dirs.dist}/images/`
    },
    fonts: {
        build: [`${dirs.src}/fonts/*`],
        watch: [`${dirs.src}/fonts`],
        dist: `${dirs.dist}/fonts`,
    },
    icons: {
        build: [`${dirs.src}/icons/*.svg`],
        watch: [`${dirs.src}/icons/*.svg`],
        dist: `${dirs.dist}/fonts`,
        // temp: [`${dirs.temp}/icons/**`],
    },
    js: {
        build: [
            `${dirs.src}/js/script.js`,
            `${dirs.src}/js/script-*.js`,
        ],
        watch: [
            `${dirs.src}/js/**/*.js`,
        ],
        dist: `${dirs.dist}/js`,
        // temp: [`${dirs.temp}/js`],
        vendors: [
            `${dirs.node_modules}/jquery/dist/jquery.js`,
            `${dirs.node_modules}/select2/dist/js/select2.js`,
            `${dirs.node_modules}/sticky-kit/dist/sticky-kit.js`,
            `${dirs.node_modules}/waypoints/lib/jquery.waypoints.js`,
            `${dirs.node_modules}/waypoints/lib/shortcuts/sticky.js`,
            `${dirs.node_modules}/waypoints/lib/shortcuts/inview.js`,
            `${dirs.node_modules}/slick-carousel/slick/slick.js`,
            `${dirs.node_modules}/ion-rangeslider/js/ion.rangeSlider.js`,
        ],
    }
};

tasks.forEach(taskPath => {
    require(taskPath)(gulp, plugins, soursPath)
});



// develop task watching local server with wordpress
// watching *.php files and reload due to it changes
//todo: add images
gulp.task('default', (callback) => {
   plugins.runSequence(
      ['clean:js', 'clean:css'],
      'icon-font',
      ['copy:fonts', 'css', 'css:vendors', 'scripts', 'scripts:vendors', 'images'],
      ['serve:wp', 'watch:build']
  );
    callback();
});

// develop task watching local server WITHOUT wordpress
// all changes in *.php files will be ignored
//todo: add images
gulp.task('dev', (callback) => {
    plugins.runSequence(
        ['clean:js', 'clean:html', 'clean:css'],
         'icon-font',
        ['copy:fonts', 'html', 'css', 'css:vendors', 'scripts', 'scripts:vendors', 'images'],
        ['serve:dev', 'watch:dev']
    );
    callback();
});

