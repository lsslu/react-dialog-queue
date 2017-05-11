var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

gulp.task('build', function(){
  gulp.src([
    'src/*.js'
  ])
  .pipe(babel({
    presets: [
      'es2015',
      'react',
      'stage-0'
    ]
  }))
  .pipe(gulp.dest('./dist/'));


  gulp.src([
    'src/queue.less'
  ])
  .pipe(gulp.dest('./dist/'))
  .pipe(less())
  .pipe(gulp.dest('./dist/'));
  
});
