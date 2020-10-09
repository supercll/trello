module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9090',
                pathRewrite: {
                    '^/api': '/api/v1'
                }
            }
        }
    }
}