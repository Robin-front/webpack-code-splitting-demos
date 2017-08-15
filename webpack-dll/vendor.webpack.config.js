var webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['lodash','react'],
  },
  output: {
    filename: '[name].[chunkhash:4].js',
    path: 'build/',
    library: '[name]_lib',
  },
  plugins: [new webpack.DllPlugin({
    name: '[name]_lib',
    path: './[name]-manifest.json',
  })]
};
