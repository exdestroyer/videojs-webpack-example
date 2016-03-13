var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../webpack.config.js");


// Development build

// modify some webpack config options
var myConfig = Object.create(webpackConfig);
myConfig.devtool = "eval";
myConfig.debug = true;
myConfig.output.pathinfo = true;

var myOtherDevCompiler = webpack(myConfig);

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  new WebpackDevServer(myOtherDevCompiler, {
    contentBase: './html',
    publicPath: "/assets/",
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if (err){ throw new gutil.PluginError("webpack-dev-server", err); }
    gutil.log("[webpack-dev-server]", "http://localhost:8080/");
  });
});
