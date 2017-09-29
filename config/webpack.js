// external imports
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// local imports
var projectPaths = require('./projectPaths')

// default to prod dev configuration
var devtool = ''
// exclude React in prod build
var externals = {}
// entry differs based on env
var entry = []
// initial set of plugins
var plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV || 'dev',
  })
]

// if we are in a production environment
if (process.env.NODE_ENV === 'production') {
  // entry
  entry.push(projectPaths.entry)
  // use production configuration instead
  devtool = ''
  // do not include react in build
  externals = {'react': 'react'}
  // optmize the build for production
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      }
    })
  )
} else {
  // example entry
  entry.push(projectPaths.exampleEntry)

  plugins.push(
    new HtmlWebpackPlugin({
      template: './example/index.html'
    })
  )
}

// export webpack configuration object
module.exports = {
  entry: entry,
  output: {
    path: projectPaths.buildDir,
    filename: 'index.js',
    library: 'react-tooltip',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use:[{loader: 'eslint-loader', options: {
            configFile: projectPaths.eslintConfig
         }}]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /\.test?$/,
        include: [
          projectPaths.sourceDir,
          projectPaths.exampleDir,
        ],
        query: {
          extends: projectPaths.babelConfig,
        },
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(png|jpg|ttf)$/,
        loader: 'url-loader',
        query: {limit: 10000000},
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      'node_modules',
    ]
  },
  externals: externals,
  plugins: plugins,
  devtool: devtool
}
