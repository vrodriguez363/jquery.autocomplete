/*jslint node: true */
/*jshint node: true */
'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minifyCss = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon');

gulp.task('libs', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('./js/libs'));
});

gulp.task('js', function () {
    return gulp.src('./autocomplete.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename('autocomplete.min.js'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src('./autocomplete.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(rename('autocomplete.min.css'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        browser: 'google chrome',
        port: 4000
    });

    gulp.watch('autocomplete.html').on('change', reload);
    gulp.watch('autocomplete.js', ['js']).on('change', reload);
    gulp.watch('autocomplete.css', ['css']).on('change', reload);
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('default', ['dist', 'serve']);
gulp.task('dist', ['libs', 'js', 'css']);
