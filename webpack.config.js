module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './public/js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /.mustache$/,
      use: 'mustache-loader'
    }]
  }
};
