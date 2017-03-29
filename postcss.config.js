const cssNext       = require('postcss-cssnext');
const fontMagician  = require('postcss-font-magician');
const postcssImport = require('postcss-import');
module.exports = {
  plugins: [
    postcssImport(),
    cssNext(),    
    fontMagician(),
  ]
};