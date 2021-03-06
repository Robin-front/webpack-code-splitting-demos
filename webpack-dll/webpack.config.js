var webpack = require('webpack');
module.exports = {
  entry: {
    app: ['./app'],
  },
  output: {
    filename: '[name].[chunkhash:4].js',
    path: 'build/',
  },
  plugins: [new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./vendor-manifest.json'),
  })]
};
