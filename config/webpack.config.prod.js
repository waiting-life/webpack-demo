// 这个插件不是在plugins里面写，而是写在优化相关的optimization中
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin  = require('terser-webpack-plugin')

// 生产环境不需要devSever
module.exports = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js' ,
    publicpath: 'http://localhost:8080/',
  },
  optimization: {
    // 这个时候需要把mode改为production
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ],
  },
  // 去掉生产环境提示
  performance: {
    hints: false,
  },
}