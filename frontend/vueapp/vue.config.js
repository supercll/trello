const CompressionWebpackPlugin = require('compression-webpack-plugin');
const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`;
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: /\.js$|\.html$|\.css/,
  minRatio: 0.8,
  deleteOriginalAssets: false
});
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'development',
  css: { extract: true },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@import 'src/assets/css/common.scss';`,
            sassOptions: {
              includePaths: [__dirname]
            }
          }
        }
        // {
        //   loader: 'sass-resources-loader',
        //   options: {
        //     resources: path.resolve(__dirname, './src/assets/css/common.scss')
        //   }
        // }
      ]
    });
    return {
      plugins: [
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //对超过10k的数据进行压缩
          deleteOriginalAssets: false //是否删除原文件
        })
      ]
    };
  },

  chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 3000, // 形成一个新代码块最小的体积
      // maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      // maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 打包分割符
      name: true,
      cacheGroups: {
        vendor: {
          minSize: 0,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/, //打包第三方库
          chunks: 'all',
          priority: 10 // 优先级
        },
        common: {
          // 打包其余的的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'common', // 分离包的名字
          chunks: 'all',
          priority: 5
        }
      }
    });
    config.externals({
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts',
      'element-ui': 'Element-ui'
    });
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9090/api/v1',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
