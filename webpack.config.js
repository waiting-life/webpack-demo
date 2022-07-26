const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 这个插件不是在plugins里面写，而是写在优化相关的optimization中
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin  = require('terser-webpack-plugin')

module.exports = (env) => {
  return  {
    mode: env.production ? 'production' : 'development',
    entry: {
      // 分离代码

      // 1. 多个entry
      // 当两个入口文件引入了相同的库的情况下，会造成打包后的代码重复
      index: './src/index.js',
      another: './src/another-module.js'

      // 2. 抽出公共库
      // index: {
      //   import: './src/index.js',
      //   dependOn: 'shared'
      // }, 
      // another: {
      //   import: './src/another-module.js',
      //   dependOn: 'shared'
      // },
      // // 将依赖的公共库取名为shared
      // shared: 'lodash'

      // 3. 设置 splitChunks: { chunks: 'all' }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].[contenthash].js' ,
      assetModuleFilename: 'images/[contenthash][ext]',  // generator优先级高于assetModuleFilename
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "./public/index.html"),
        // filename: 'app.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        // 自定义打包后的文件路径和名称
        filename: 'styles/[contenthash].css'
      }),
    ],
    optimization: {
      // 这个时候需要把mode改为production
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
      ],
      splitChunks: {
        // chunks: 'all'
        cacheGroups:{
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // js包括我们自己的js和node_modules里面的js， node_modules里面的js我们不需要用babel编译，所以排除
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(css|less)$/,
          // style-loader生成到html的style标签里面
          // use: ['style-loader', 'css-loader']
          // 单独抽出css文件,此时打包后生成的html通过link引入css
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(jpg|jpeg|webp|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[contenthash][ext]'
          }
        },
        {
          test: /\.svg$/,
          type: 'asset/inline'
        },
        {
          test: /\.txt$/,
          type: 'asset/source'
        },
        {
          test: /\.png$/,
          // 通用数据类型
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // 默认 4*1024
              maxSize: 4 * 1024
            }
          }
        }
      ]
    },
   
    performance: {
      hints: false,
    },
    devServer: {
      static: './dist',
      hot: true,
      liveReload: true,
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
    devtool: 'inline-source-map'
  }
}