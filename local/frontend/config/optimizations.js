const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const mode = require('./mode');

module.exports = {
  minimize: mode.isProd,
  minimizer: [
    new TerserPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    })
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'all',
        test: /[\\/]node_modules[\\/]/,
        enforce: true
      }
    }
  }
};
