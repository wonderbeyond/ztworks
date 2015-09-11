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
var ztNames = [];

fs.readdirSync(ztBaseDir).map(function(ztName) {
  ztNames.push(ztName);
  var ztPath = path.join(ztBaseDir, ztName);
  if (fs.statSync(ztPath).isDirectory()) {
    gulp.task(util.format('%s.templates', ztName), function() {
      var srcPattern = path.join(ztPath, 'templates', '*.html');
      var destDir = ztPath;
      console.log(util.format('Src: %s, Dest: %s', srcPattern, ztPath));

      gulp.src(srcPattern)
      .pipe(swig(swigOpts))
      .pipe(gulp.dest(ztPath));
    })
  }
})

gulp.task('default', taskListing);

// A task to compile all zt's templates
gulp.task('templates', ztNames.map(function(n) {return util.format('%s.%s', n, 'templates')}));

gulp.task('watch', function(){
  // Do separated watch for every zt
  ztNames.map(function(ztName) {
    var src = [
      path.join(ztBaseDir, ztName, 'templates', '*.html'),
      path.join(ztBaseDir, ztName, 'templates', '**/*.html'),
    ]
    gulp.watch(src, [util.format('%s.templates', ztName)]);
  });
});
