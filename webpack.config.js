const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const StatsPlugin = require('stats-webpack-plugin');
const autoprefixer = require('autoprefixer');

const sassLoaders = [
  "css-loader",
  "postcss-loader",
  "sass-loader" ,
];

const config = {
  node: {
    console: true
  },
  context: path.resolve(__dirname, "./app/webpack"),
  entry: {
    main: "javascripts/main.js"
  },
  output: {
    path: __dirname + "/app/assets/bundles",
    filename: "[name].bundle.js",
    publicPath: "http://localhost:8080/assets/",
    chunkFilename: "[id].bundle.js"
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./app/webpack")
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }) ],
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        loader: "coffee",
        exclude: /node_modules/
      },
      // use babel-loader for all js files
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
             presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!"))
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css")
      },
     {
        test: /\.(png|woff|eot|ttf|swf)/, loader: 'url-loader?limit=1'
      },
      {
        test: /\.svg/, loader: 'file-loader'
      },
      // {
      //   test: require.resolve("./app/webpack/javascripts/auth/google.coffee"),
      //   loader: "expose?gpAsyncInit!coffee"
      // },
      // {
      //   test: require.resolve("./app/webpack/javascripts/auth/facebook.coffee"),
      //   loader: "expose?fbAsyncInit!coffee"
      // }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    // Used by webpack-rails
    new StatsPlugin('webpack.manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),
  ],
  resolve: {
    extensions: ["", ".js", ".sass", ".scss", ".coffee"],
    root: [
      path.resolve(__dirname, "app/webpack"),
    ],
    alias: {
      "video.js": "video.js/src/js/video.js",
      "videojs-contrib-hls": path.resolve(__dirname, "web_modules/videojs-contrib-hls/src/videojs-contrib-hls.js"),
      "videojs": path.resolve(__dirname, "web_modules/video.js"),
      "videojs-contrib-media-sources": path.resolve(__dirname, "web_modules/videojs-contrib-media-sources/src/videojs-contrib-media-sources.js")
    }
  }
}
module.exports = config;
