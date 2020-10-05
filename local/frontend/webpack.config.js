const p = require('./config/path');
const mode = require('./config/mode');
const modules = require('./config/modules');
const plugins = require('./config/plugins');
const optimizations = require('./config/optimizations');

module.exports = {
  mode: mode.name,
  entry: {
    main: `${p.src.root}/main.js`
  },
  output: {
    path: p.dist.root,
    publicPath: p.dist.public,
    filename: `${p.dist.scripts.name}/[name].js`
  },
  resolve: {
    alias: {
      '@': p.src.root
    }
  },
  devServer: {
    contentBase: p.dist.pages.root,
    overlay: {
      warnings: false,
      errors: true
    },
    hot: mode.isDev,
    port: 8081
  },
  devtool: 'eval-cheap-module-source-map',
  stats: {
    colors: true,
    errors: true,
    warnings: true,
    hash: false,
    version: false,
    timings: true,
    builtAt: true,
    assets: true,
    entrypoints: false,
    modules: false,
    children: false
  },
  optimization: optimizations,
  plugins: plugins,
  module: modules
};
