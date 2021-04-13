const path = require('path');
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'development',
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
