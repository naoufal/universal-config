var webpack = require('webpack');

module.exports = {
  entry: "./app/client",

  output: {
    filename: 'main.js',
    path: ('./app/dist'),
    publicPath: '/js/'
  },

  plugins: [
    // Add process.env support in clients
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    }),

    // Exclude server config requires from clients
    new webpack.IgnorePlugin(/config\/server/)
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?optional[]=runtime&stage=0'
      }
    ]
  }
};
