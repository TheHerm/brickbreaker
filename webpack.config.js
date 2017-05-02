'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /.js$/, 
        exclude: /(node_modules|bower_components)/, 
        loader: 'babel'
      },
      { 
        test: /.json$/, 
        loader: 'json-loader'
      }
    ]
  }
};
