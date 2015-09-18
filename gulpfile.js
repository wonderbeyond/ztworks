var gulp = require('gulp');
var swig = require('gulp-swig');
var taskListing = require('gulp-task-listing');
var fs = require('fs');
var path = require('path');
var util = require('util');

var swigOpts = {
  defaults: { cache: false },
}

var ztBaseDir = './zts';
var ztNames = fs.readdirSync(ztBaseDir);

var templatesTasks = [];
var watchTasks = [];

ztNames.forEach(function(ztName) {
  var ztPath = path.join(ztBaseDir, ztName);
  if (fs.statSync(ztPath).isDirectory()) {
    var templatesTask = util.format('%s.templates', ztName);
    var watchTask = util.format('%s.watch', ztName);

    templatesTasks.push(templatesTask);
    watchTasks.push(watchTask);

    gulp.task(templatesTask, function() {
      var srcPattern = path.join(ztPath, 'templates', '*.html');
      var destDir = ztPath;

      gulp.src(srcPattern)
      .pipe(swig(swigOpts))
      .pipe(gulp.dest(ztPath));
      console.info(util.format('Compile %s to %s', srcPattern, ztPath));
    });

    gulp.task(watchTask, function() {
      var src = [
        path.join(ztBaseDir, ztName, 'templates', '*.html'),
        path.join(ztBaseDir, ztName, 'templates', '**/*.html'),
      ]
      gulp.watch(src, [util.format('%s.templates', ztName)]);
      console.info(util.format('Watch on %s', src));
    });
  }
})

gulp.task('default', taskListing);

// All tasks of all zts
gulp.task('templates', templatesTasks);
gulp.task('watch', watchTasks);
