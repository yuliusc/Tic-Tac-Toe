const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create()

const css = function() {
    return gulp.src('./style/*.css', { allowEmpty: true })
        .pipe(cssnano())
        .pipe(gulp.dest("./style"));
}

const jsuglify = function() {
    return gulp.src('./js/*.js', { allowEmpty: true })
        .pipe(uglify())
        .pipe(gulp.dest("./js"));
}

const watch = function(){
    browserSync.init({
        server:{
            basedir: './'
        }
    });
    gulp.watch('./style/*.js', jsuglify).on('change', browserSync.reload)
    gulp.watch('./style/*.css', css).on('change', browserSync.reload)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.css = css;
exports.jsuglify = jsuglify;
exports.watch = watch;