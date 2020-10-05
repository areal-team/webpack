const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssEasyImportPlugin = require('postcss-easy-import');
const PostCssPresentEnvPlugin = require('postcss-preset-env');
const PostCssFlexBugsFixesPlugin = require('postcss-flexbugs-fixes');
const CssMqPackerPlugin = require('css-mqpacker');
const path = require('path');
const mode = require('./mode');
const p = require('./path');

module.exports = {
  rules: [
    {
      test: /\.js$/i,
      exclude: /[\\/]node_modules[\\/]/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      ]
    },
    {
      test: /\.css$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: p.dist.styles.public,
            hmr: mode.isDev,
            reloadAll: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: mode.isDev
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: mode.isDev,
            plugins: [
              PostCssEasyImportPlugin({
                extensions: [
                  '.css',
                  '.sass',
                  '.scss'
                ]
              }),
              CssMqPackerPlugin(),
              PostCssFlexBugsFixesPlugin(),
              PostCssPresentEnvPlugin()
            ]
          }
        }
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: p.dist.styles.public,
            hmr: mode.isDev,
            reloadAll: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: mode.isDev
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: mode.isDev,
            plugins: [
              PostCssEasyImportPlugin({
                extensions: [
                  '.css',
                  '.sass',
                  '.scss'
                ]
              }),
              CssMqPackerPlugin(),
              PostCssFlexBugsFixesPlugin(),
              PostCssPresentEnvPlugin()
            ]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: mode.isDev,
            sassOptions: {
              indentWidth: 2
            }
          }
        }
      ]
    },
    {
      test: /.(png|jpe?g|gif|svg)(\?.*)?$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: (resourcePath) => path.relative(p.src.images.root, resourcePath),
            publicPath: p.dist.images.public,
            outputPath: p.dist.images.name
          }
        }
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?.*)?$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: (resourcePath) => path.relative(p.src.fonts.root, resourcePath),
            publicPath: p.dist.fonts.public,
            outputPath: p.dist.fonts.name
          }
        }
      ]
    }
  ]
};
