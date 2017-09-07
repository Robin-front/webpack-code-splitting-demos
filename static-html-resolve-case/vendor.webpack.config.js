var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    vendor: [
      './src/js/zepto.js',
      './src/js/touch.js',
      './src/js/transform.js',
      './src/js/swiper.min.js',
      './src/js/finger.js',
      './src/js/to.js',
      './src/js/fastclick.min.js'
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, "dist/"),
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_lib',
      path: './[name]-manifest.json',
    })
  ]
};
