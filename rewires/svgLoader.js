const rewireSpriteSvg = config => {
  const rules = config.module.rules
  const fileLoader = rules.find(
    rule => rule.loader && rule.loader.indexOf('file-loader') > 0
  )
  fileLoader.exclude.push(/\.svg$/)
  rules.push({
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    options: {
      name: '[path][name].[ext]'
    }
  })
}

module.exports = rewireSpriteSvg
