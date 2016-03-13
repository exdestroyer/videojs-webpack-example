var gulp = require("gulp");
var modernizr = require("gulp-modernizr");

// Builds modernizr from npm sources
gulp.task("modernizr", function(){
  return gulp.src('./node_modules/modernizr/src/*.js')
  .pipe(modernizr())
  .pipe(gulp.dest("vendor/assets/bundles"));
});
