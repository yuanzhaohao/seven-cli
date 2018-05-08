module.exports = {
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/
      }
    ]
  }
}
