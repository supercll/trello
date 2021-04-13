const loader = require('sass-loader');

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader'
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
