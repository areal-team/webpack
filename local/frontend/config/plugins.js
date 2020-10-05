const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {default: ImageMinPlugin} = require('imagemin-webpack-plugin');
const ImageMinGMPlugin = require('imagemin-gm');
const ImageMinMozJpegPlugin = require('imagemin-mozjpeg');
const ImageMinJpegReCompressPlugin = require('imagemin-jpeg-recompress');
const ImageMinAdvPngPlugin = require('imagemin-advpng');
const ImageMinGifsiclePlugin = require('imagemin-gifsicle');
const ImageMinSvgoPlugin = require('imagemin-svgo');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const u = require('./utils');
const p = require('./path');
const mode = require('./mode');

const plugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: [
      /vendor\.(js|css)$/
    ]
  }),
  new MiniCssExtractPlugin({
    filename: `${p.dist.styles.name}/[name].css`
  }),
  new HtmlPlugin({
    template: `${p.src.pages.root}/index.html`,
    filename: `${p.dist.pages.name}/index.html`
  })
];

if (mode.isProd) {
  const prodPlugins = [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        `!${p.src.root}*`
      ]
    })
  ];

  const patterns = [];
  if (u.hasFiles(p.src.images.root)) {
    patterns.push({
      from: p.src.images.root,
      to: p.dist.images.root
    });
  }
  if (u.hasFiles(p.src.fonts.root)) {
    patterns.push({
      from: p.src.fonts.root,
      to: p.dist.fonts.root
    });
  }
  if (u.hasFiles(p.src.static.root)) {
    patterns.push({
      from: p.src.static.root,
      to: p.dist.static.root
    });
  }
  if (patterns.length) {
    prodPlugins.push(new CopyPlugin({
      patterns
    }));
    prodPlugins.push(new ImageMinPlugin({
      test: /.jpe?g$/i,
      plugins: [
        ImageMinMozJpegPlugin({
          quality: 84,
          progressive: true
        }),
        ImageMinJpegReCompressPlugin({
          accurate: true,
          quality: 'high',
          min: 60,
          max: 84,
          progressive: true
        }),
        (new ImageMinGMPlugin()).resize({
          width: 1920
        })
      ]
    }));
    prodPlugins.push(new ImageMinPlugin({
      test: /.png$/i,
      plugins: [
        (new ImageMinGMPlugin()).resize({
          width: 1920
        }),
        ImageMinAdvPngPlugin({
          optimizationLevel: 4
        })
      ]
    }));
    prodPlugins.push(new ImageMinPlugin({
      test: /.gif$/i,
      plugins: [
        ImageMinGifsiclePlugin({
          interlaced: true,
          optimizationLevel: 3
        })
      ]
    }));
    prodPlugins.push(new ImageMinPlugin({
      test: /.svg$/i,
      plugins: [
        ImageMinSvgoPlugin()
      ]
    }));
  }

  prodPlugins.forEach(value => plugins.push(value));
}

module.exports = plugins;
