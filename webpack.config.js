//inline-source-map has TO BE DELETED FOR YARN BUILD< DONT KNOW WHY

const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const dev = process.env.NODE_ENV !== "production" && process.argv.indexOf("-p") === -1;

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, "/src/index.html"),
  filename: "index.html",
  inject: "body"
});

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
});

module.exports = {
  devServer: {
    host: "localhost",
    port: "3000",
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    publicPath: "/",
    historyApiFallback: true,

    proxy: {
      "/": "http://localhost:3001"
    }
  },
  entry: ["react-hot-loader/patch", "script-loader!jquery/dist/jquery.min.js", "script-loader!foundation-sites/dist/js/foundation.min.js", path.join(__dirname, "/src/index.jsx")],
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf)$/i,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/build")
  },
  plugins: dev ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()] : [HTMLWebpackPluginConfig, DefinePluginConfig, UglifyJsPluginConfig]
  //THIS HAD TO BE DELETED FOR YARN BUILD< DONT KNOW WHY
  // devtool: "inline-source-map"
};
