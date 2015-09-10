var gulp = require('gulp');
var swig = require('gulp-swig');
var taskListing = require('gulp-task-listing');
var fs = require('fs');
var path = require('path');
var util = require('util');

var ztBaseDir = './zts';

fs.readdirSync(ztBaseDir).map(function(ztName) {
  var ztPath = path.join(ztBaseDir, ztName);
  if (fs.statSync(ztPath).isDirectory()) {
    gulp.task(util.format('%s.templates', ztName), function() {
      var srcPattern = path.join(ztPath, 'templates', '*.html');
      var destDir = ztPath;
      console.log(util.format('Src: %s, Dest: %s', srcPattern, ztPath));

      gulp.src(srcPattern)
      .pipe(swig())
      .pipe(gulp.dest(ztPath));
    })
  }
})

gulp.task('default', taskListing);
