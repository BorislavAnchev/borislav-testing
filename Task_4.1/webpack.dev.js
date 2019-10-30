const path = require("path");
const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
  mode: "development",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "build/assets")
  }
});