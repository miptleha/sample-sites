const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const uncss = require('uncss');
const cssnano = require('cssnano');

function style() {
    var plugins = [
        uncss.postcssPlugin({html: 'index.html'}),
        cssnano
    ];

    return gulp.src('scss/**/*.scss')
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            path: './'
        }
    });
    gulp.watch('scss/**/*.scss', style);
    gulp.watch('*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = gulp.series(style, watch);