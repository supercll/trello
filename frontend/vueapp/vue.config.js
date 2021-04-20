const path = require('path');
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'development',
  css: { extract: true },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader'
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, './src/assets/css/common.scss')
          }
        }
      ]
    });
  },

  chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: 'all'
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
