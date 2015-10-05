gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
Testem = require 'testem'

testemConfig = require '../testem.json'
testem = new Testem()

gulp.task 'test', ['test:build'], ->
  testem.startCI testemConfig

gulp.task 'test:build', ['test:clean'], ->
  gulp.src('spec/**/*.spec.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('spec/tmp'))

gulp.task 'test:clean', ->
  # rmraf('spec/tmp')