
const cssnano = require('cssnano');
const px2rem = require('postcss-px2rem');
// var sprites = require('postcss-sprites');

const isMobile = (process.env.NODE_ENV === 'mobile');
const noop = function (){};

// var opts = {
// 	stylesheetPath: './dist/css',
// 	spritePath: './dist/imgs/sprite/'
// };

module.exports = {
  plugins: [
    (isMobile?px2rem({remUnit: 75}):noop),
    cssnano({
      autoprefixer: { // 添加css浏览器前缀
        add: true,
        remove: true,
        browsers: ['>0.1%']
      },
      discardComments: { // 删除所有css注释
        removeAll: true
      },
      safe: true,
      sourcemap: false
    }),
    // sprites(opts),
  ]
}
