const path = require('path');
const merge = require('webpack-merge');

const source = `${__dirname}/..`;

const relative = (form, to) => {
  const rel = path.relative(form, to);
  return rel.search(/([.]{1,2}|\/)/) === 0
    ? rel
    : rel
      ? `./${rel}`
      : '.';
};

let p = {
  root: path.resolve(source, '../..')
};

p = merge(
  p,
  {
    rel: relative(source, p.root),
    public: '/',
    src: {
      name: 'local/frontend/assets',
      root: path.resolve(p.root, 'local/frontend/assets')
    },
    dist: {
      name: 'local/templates/.default/assets',
      root: path.resolve(p.root, 'local/templates/.default/assets')
    }
  }
);

p = merge(
  p,
  {
    src: {
      rel: relative(source, p.src.root),
      public: `${p.public === '/' ? '' : p.public}/${p.src.name}/`,
      scripts: {
        name: 'scripts',
        root: path.resolve(p.src.root, 'scripts')
      },
      styles: {
        name: 'styles',
        root: path.resolve(p.src.root, 'styles')
      },
      images: {
        name: 'images',
        root: path.resolve(p.src.root, 'images')
      },
      fonts: {
        name: 'fonts',
        root: path.resolve(p.src.root, 'fonts')
      },
      pages: {
        name: 'pages',
        root: path.resolve(p.src.root, 'pages')
      },
      static: {
        name: 'static',
        root: path.resolve(p.src.root, 'static')
      }
    },
    dist: {
      rel: relative(source, p.dist.root),
      public: `${p.public === '/' ? '' : p.public}/${p.dist.name}/`,
      scripts: {
        name: 'js',
        root: path.resolve(p.dist.root, 'js')
      },
      styles: {
        name: 'css',
        root: path.resolve(p.dist.root, 'css')
      },
      images: {
        name: 'img',
        root: path.resolve(p.dist.root, 'img')
      },
      fonts: {
        name: 'fonts',
        root: path.resolve(p.dist.root, 'fonts')
      },
      pages: {
        name: 'pages',
        root: path.resolve(p.dist.root, 'pages')
      },
      static: {
        name: p.dist.name,
        root: p.dist.root
      }
    }
  }
);

p = merge(
  p,
  {
    src: {
      scripts: {
        rel: relative(source, p.src.scripts.root),
        public: `${p.src.public}${p.src.scripts.name}/`
      },
      styles: {
        rel: relative(source, p.src.styles.root),
        public: `${p.src.public}${p.src.styles.name}/`
      },
      images: {
        rel: relative(source, p.src.images.root),
        public: `${p.src.public}${p.src.images.name}/`
      },
      fonts: {
        rel: relative(source, p.src.fonts.root),
        public: `${p.src.public}${p.src.fonts.name}/`
      },
      pages: {
        rel: relative(source, p.src.pages.root),
        public: `${p.src.public}${p.src.pages.name}/`
      },
      static: {
        rel: relative(source, p.src.static.root),
        public: `${p.src.public}${p.src.static.name}/`
      }
    },
    dist: {
      scripts: {
        rel: relative(source, p.dist.scripts.root),
        public: `${p.dist.public}${p.dist.scripts.name}/`
      },
      styles: {
        rel: relative(source, p.dist.styles.root),
        public: `${p.dist.public}${p.dist.styles.name}/`
      },
      images: {
        rel: relative(source, p.dist.images.root),
        public: `${p.dist.public}${p.dist.images.name}/`
      },
      fonts: {
        rel: relative(source, p.dist.fonts.root),
        public: `${p.dist.public}${p.dist.fonts.name}/`
      },
      pages: {
        rel: relative(source, p.dist.pages.root),
        public: `${p.dist.public}${p.dist.pages.name}/`
      },
      static: {
        rel: p.dist.rel,
        public: p.dist.public
      }
    }
  }
);

module.exports = p;
