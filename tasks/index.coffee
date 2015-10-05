gulp = require 'gulp'

require './build'
require './test'

gulp.task 'default', ['test'], ->
  