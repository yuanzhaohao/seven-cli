module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('postcss-px2viewport')({
      viewportWidth: 750
    })
  ]
}
