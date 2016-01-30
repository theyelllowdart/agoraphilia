var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'app': './src/app.ts',
    'vendor': [
      './src/vendor.ts',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/lodash/index.js',
      './node_modules/moment/moment.js'
    ]
  },
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],

  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },

  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ],
    noParse: [path.join(__dirname, 'node_modules', 'angular2', 'bundles')]
  },

  devServer: {
    historyApiFallback: true,
    headers: {"Access-Control-Allow-Origin": "*"}
  }
};
