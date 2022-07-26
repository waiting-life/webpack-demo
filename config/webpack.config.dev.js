// 开发环境没必要用contenthash,publicPath,开发环境没必要压缩
module.exports = {
    mode: 'development',
    output: {
      filename: 'js/[name].[bundle].js' ,
    },
    // 开发环境需要调试代码
    devtool: 'inline-source-map',
    devServer: {
      static: '../dist',
      hot: true,
      // liveReload: true,
      // compress: true,
      port: 3000,
      // header: {

      // },
      // 设置代理
      proxy: {
        '/api' : 'http://localhost:9000'
      },
      // https: true
      // http2: true, // http2自带https，
      // host: '0.0.0.0'
    },
    
  }