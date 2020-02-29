const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    plugins: [
        new NodemonPlugin({
            script: "./index.js"
        }), // Dong
    ]
}