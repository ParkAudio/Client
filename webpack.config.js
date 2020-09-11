const path = require('path');

module.exports = {
    entry: './app/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};