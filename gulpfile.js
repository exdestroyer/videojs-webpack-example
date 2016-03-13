var requireDir = require('require-dir');
requireDir('./gulp-tasks');
var gulp = require("gulp");
var runSequence = require('run-sequence');

gulp.task("deps", ["videojs:install-all"]);

gulp.task("default", function(callback){
  runSequence("deps", "webpack-dev-server", callback);
});
