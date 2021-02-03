'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('browser-sync').create();
const del = require('del');

gulp.task('sass', function() {
    return gulp.src("./src/sass/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(server.stream());
});

gulp.task('server', function() {

    server.init({
        server: "./src"
    });

    gulp.watch("src/sass/*.scss", gulp.series('sass'));
    gulp.watch("src/js/*.js");
    gulp.watch("src/*.html").on('change', server.reload);
});


gulp.task("start", gulp.series("sass", "server"));

gulp.task("copy", function () {
    return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
     "src/img/**",
     "src/js/**"
     ], {
       base: "src"
     })
     .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
    });
    gulp.task("build", gulp.series(
    "clean",
    "copy",
    "sass"
));
