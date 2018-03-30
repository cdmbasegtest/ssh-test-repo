const root = require('./commons').root
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//COPY PASTE FROM CRA CONFIG TO KEEP THEIR LOGIC AND STILL ADD OURS
const paths = require('react-scripts/config/paths')
const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'
const cssFilename = 'static/css/[name].[contenthash:8].css'
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}
//COPYPASTE END

const postCssOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-initial'),
    require('postcss-import')({
      path: root
    }),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-custom-media'),
    require('postcss-css-variables'),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    })
  ]
}

const rewirePostcss = (config, env) => {
  const isProd = env === 'production'
  const rules = config.module.rules
  const cssLoader = rules.find(
    rule => rule.test && rule.test.toString() === /\.css$/.toString()
  )
  rules.splice(rules.indexOf(cssLoader), 1) // remove existent CRA loader
  rules.push(
    isProd
      ? {
          // PRODUCTION
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            Object.assign(
              {
                fallback: require.resolve('style-loader'),
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: true
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions
                  }
                ]
              },
              extractTextPluginOptions
            )
          ),
          include: [root]
        }
      : {
          //DEVELOPMENT
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: postCssOptions
            }
          ],
          include: [root]
        }
  )
}

module.exports = rewirePostcss
