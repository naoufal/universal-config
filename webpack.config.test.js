var webpack = require('webpack');

module.exports = {
  entry: "./test/webpack.js",

  output: {
    filename: 'webpack-test.js',
    path: ('./test/'),
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
    new webpack.IgnorePlugin(/config\/server/),

    new webpack.NormalModuleReplacementPlugin(/..\/..\/..\/config\/client/, '../test/stubs/config/client')
  ]
};
