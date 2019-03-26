// node imports
var path = require('path')

// project root directory
var root = path.join(__dirname, '..')
// source directory
var sourceDir = path.join(root, 'src')
// build directory
var buildDir = path.join(root, 'lib')
// configuration directory
var configDir = path.join(root, 'config')
// example directory
var exampleDir = path.join(root, 'example')

// export the project paths|globs object
module.exports = {
  // directories
  rootDir: root,
  sourceDir: sourceDir,
  buildDir: buildDir,
  // entry points
  entry: path.join(sourceDir, 'index.js'),
  // configuration files
  webpackConfig: path.join(configDir, 'webpack.js')
}
