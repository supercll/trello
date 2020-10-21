const loaderUtils = require("loader-utils");
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    const callback = this.async();
    let timer = setTimeout(() => {
        clearTimeout(timer);
        const res = source.replace("LC", options.name);
        callback(null, res);
    }, 2000);
};