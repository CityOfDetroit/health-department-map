'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });
});

gulp.task('watch', function () {
    gulp.watch('assets/js/**/*.js', browserSync.reload);
    gulp.watch('./*.html', browserSync.reload);
});

gulp.task('default', ['browserSync','watch']);
// required dependencies
// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
// var del = require('del');
// var runSequence = require('run-sequence');
// var babel = require("gulp-babel");
//
//
// gulp.task('images', function(){
//   return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
//   // Caching images that ran through imagemin
//   .pipe(cache(imagemin({
//       interlaced: true
//     })))
//   .pipe(gulp.dest('dist/img'))
// });
//
//
// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// });
//
//
// gulp.task('build', function (callback) {
//   runSequence('clean:dist',
//     ['sass', 'useref', 'images'],
//     callback
//   )
// });
//
// gulp.task('default', function (callback) {
//   runSequence(['sass','browserSync', 'watch'],
//     callback
//   )
// });
