var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

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
  .pipe(gulp.dest('./lib/'));


  gulp.src([
    'src/queue.less'
  ])
  .pipe(gulp.dest('./lib/'))
  .pipe(less())
  .pipe(gulp.dest('./lib/'));


  browserify({
    entries: 'src/index.js'
  })
  .transform(babelify)
  .bundle()
  .pipe(source('react-dialog-queue.js'))
  .pipe(gulp.dest('./dist/'));
  
});
