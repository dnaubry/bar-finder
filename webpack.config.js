const path = require('path');

module.exports = {
  entry: {
    App: ['core-js/fn/array/from', 'core-js/fn/string/includes', 'core-js/es6/set', './app/assets/scripts/App.js']
  },
  output: {
    path: path.resolve(__dirname, 'app/temp/scripts'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: 'handlebars-loader',
        test: /\.hbs$/,
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
}
