const path = require("path");
const config = require("./webpack.config");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = merge(config, {
  mode: "production",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "bin/assets")
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new JavaScriptObfuscator ({
      rotateUnicodeArray: true
  })
  ]
});