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
    headers: {"Access-Control-Allow-Origin": "*"},
    proxy: {
      '/events*': {
        target: 'http://localhost:8888/',
        secure: false
        // bypass: function (req, res, proxyOptios) {
        //   res.json
        //   return [{"title":"The Mike DiRubbo Quintet","href":"/events/11207-the-mike-dirubbo-quintet/","interval":"1463279400000-1463288400000","youtubeVideoId":"jsFVxTvUQtQ"},{"title":"The Philip Harper Quintet","href":"/events/11248-the-philip-harper-quintet/","interval":"1463288400000-1463299200000","youtubeVideoId":"wFGWU6qonDs"},{"title":"Vocal Masterclass with Marion Cowings","href":"/events/11245-vocal-masterclass-with-marion-cowings/","interval":"1463331600000-1463338800000","youtubeVideoId":"nYRvrONjlUQ"},{"title":"The Ai Murakami Trio feat. Sacha Perry","href":"/events/11258-the-ai-murakami-trio-feat-sacha-perry/","interval":"1463344200000-1463353200000","youtubeVideoId":"hAldOWTGjHo"},{"title":"The Johnny O'Neal Trio","href":"/events/11282-the-johnny-oneal-trio/","interval":"1463355000000-1463364000000","youtubeVideoId":"ue7v6bddlg8"},{"title":"The Dmitry Baevsky Quartet","href":"/events/11257-the-dmitry-baevsky-quartet/","interval":"1463365800000-1463374800000","youtubeVideoId":"BqTfVdnC8rQ"},{"title":"Hillel Salem - \"Afterhours\"","href":"/events/11297-hillel-salem-afterhours/","interval":"1463374800000-1463385600000"}];
        // }

      }
    }
  }
};
