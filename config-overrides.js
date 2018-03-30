const rewirePostcss = require('./rewires/postCss')
const rewireDefine = require('./rewires/define')
const rewireEslint = require('./rewires/eslint')
const rewireSpriteSvgLoader = require('./rewires/svgLoader')
const rewireSc = require('react-app-rewire-styled-components')

const root = require('./rewires/commons').root

//TODO: Add circular dependency plugin
//TODO: Chunks for vendor dependencies (could be done with CRA default features and without rewire)
module.exports = function override(config, env) {
  config.resolve.modules.push(root)
  rewirePostcss(config, env)
  rewireDefine(config, env)
  rewireEslint(config)
  rewireSpriteSvgLoader(config)
  rewireSc(config, env, {
    displayName: true
    //preprocess: true // this suppose to minify and precompile CSS, but it doesn't work for now
  })
  return config
}
