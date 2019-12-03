const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");
const fs = require('fs');


const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    plugins: []
});


module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});