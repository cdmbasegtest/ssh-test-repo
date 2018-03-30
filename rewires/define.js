const webpack = require('webpack')

const dev = {
  'global.Platform.OS': "'browser'",
  'global.__PORT__': process.env.PORT || 3000,
  'process.env.NODE_ENV': "'development'"
}

const prod = Object.assign({}, dev, {
  'process.env.NODE_ENV': "'production'",
  'global.__BUILD_NUMBER__': process.env.CIRCLE_BUILD_NUM
})

const rewireDefine = (config, env) => {
  const isProd = env === 'production'
  const plugins = config.plugins
  plugins.push(new webpack.DefinePlugin(isProd ? prod : dev))
}

module.exports = rewireDefine
