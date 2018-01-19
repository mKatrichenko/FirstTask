'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const stylus = require('stylus');
const autoprefixer = require('gulp-autoprefixer');

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}
/*
gulp.task('hello', function() {
  console.log('hello')
})


gulp.task('sass', function () {
  gulp.src('frontend/assets/css/main.scss')
   	.pipe(sass({includePaths: ['scss']}))
    .pipe(gulp.dest('frontend/assets/css'));
});
*/
lazyRequireTask('styles', './tasks/styles', {
  src: 'frontend/scss/*.scss'
});

lazyRequireTask('clean', './tasks/clean', {
  dst: 'public'
});


lazyRequireTask('assets', './tasks/assets', {
  src: 'frontend/assets/**/*.*',
  dst: 'public'
});


gulp.task('build', gulp.series(
    'clean','styles', 'assets')
);

gulp.task('watch', function() {
  gulp.watch('frontend/scss/*.scss', gulp.series('styles'));

  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));

  //gulp.watch('frontend/assets/**/*.*', gulp.series('sass'));
});

lazyRequireTask('serve', './tasks/serve', {
  src: 'public'
});


gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

lazyRequireTask('lint', './tasks/lint', {
  cacheFilePath: process.cwd() + '/tmp/lintCache.json',
  src: 'frontend/**/*.js'
});