var gulp = require("gulp");
var install = require("gulp-install");
var path = require("path");

coreBase = path.resolve(__dirname, "../web_modules/video.js");
hlsBase = path.resolve(__dirname, "../web_modules/videojs-contrib-hls");
mediaBase = path.resolve(__dirname, "../web_modules/videojs-contrib-media-sources");

gulp.task("videojs:install", function(callback){
  return gulp.src('package.json', {cwd: coreBase})
  .pipe(install({ignoreScripts: true}))
});

gulp.task("videojs-hls:install", function(){
  return gulp.src('package.json', {cwd: hlsBase})
  .pipe(install({ignoreScripts: true}))
});

gulp.task("videojs-media-sources:install", function(){
  return gulp.src('package.json', {cwd: mediaBase})
  .pipe(install({ignoreScripts: true}))
});

gulp.task("videojs:all", ["videojs:install", "videojs-hls:install", "videojs-media-sources:install"]);
