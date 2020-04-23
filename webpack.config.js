const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
    entry: "./src/gejs.js",
    mode: 'development',
    plugins: [
        new NodemonPlugin({
            script: "./index.js"
        }), // Dong
    ]
}