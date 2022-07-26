const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports =  {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: 'images/[contenthash][ext]',  // generator优先级高于assetModuleFilename
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public/index.html"),
        // filename: 'app.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        // 自定义打包后的文件路径和名称
        filename: 'styles/[contenthash].css'
      }),
    ],
    optimization: {
      splitChunks: {
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
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
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
  }