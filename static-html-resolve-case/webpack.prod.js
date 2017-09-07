const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const configs = require('./webpack.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

configs.entry = {
  'index': "./src/js/index.js"
};

configs.module.rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
  }, { // 从js 提取分离 css
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: [
        {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: configs.postcssConfigs
        }
      ]
    })
  }, {
    test: /\.s(a|c)ss/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: [
        {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: configs.postcssConfigs
        }, {
          loader: 'sass-loader'
        }
      ]
    })
  }, {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          outputPath: 'imgs/'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 7
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // Specifying webp here will create a WEBP version of your JPG/PNG images
          webp: {
            quality: 75
          }
        }
      }
    ]
  }
];

module.exports = merge(configs, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/imgs',
        to: 'imgs'
      }, {
        from: 'src/js/flexible.min.js',
        to: 'js'
      }
    ], {
      ignore: [],
      copyUnmodified: true
    }),
    new ExtractTextPlugin({filename: 'css/style.css', allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  ]
})
