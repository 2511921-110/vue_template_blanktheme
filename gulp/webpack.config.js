const path = require('path');
const webpack = require("webpack");

module.exports = {
  // エントリーポイントの設定
  entry: './js/app.js',
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: '../js/bundle.js',
    // 出力先のパス（v2系以降は絶対パスを指定する必要がある）
    path: path.join(__dirname, 'js')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module:{
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // loader: 'babel',
        query:{
          presets:['es2015','es2016','es2017']
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.css'],
    alias: {
    // vue.js のビルドを指定する
      vue: 'vue/dist/vue.js',
      // slick: 'slick-carousel/slick/',
    }
  },
  devtool: 'inline-source-map'
};