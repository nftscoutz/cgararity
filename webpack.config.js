const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  mode: 'development',
  devtool : 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};