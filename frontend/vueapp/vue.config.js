module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:9090/api/v1",
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
