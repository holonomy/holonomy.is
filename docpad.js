// http://docpad.org/docs/config

require('longjohn');

var _ = require('lodash');

module.exports = {
  templateData: {
    site: {
      title: "holonomy is",
      //many parts collectively owning a whole consciousness
      tagline: "the hive mind economy",
      description: "holonomy is the living economy controlled by our collective consciousness. " +
        "as most of our consciousness is unaware of ourselves, the economic infrastructure in " +
        "place is structured against us. in order to create a better holonomy, we must ourselves " +
        " become aware, spread new ideas of life worth living, and use our skills to implement " +
        "infrastructure that empowers our collective consciousness."
    },
  },
  detectEncoding: true,
  plugins: {
    handlebars: {
      helpers: {
        partial: function (content, options) {
          return this.partial(content, options);
        },
        block: function (blockName) {
          return this.getBlock(blockName).toHTML();
        },
        marked: function (options) {
          return require('marked')(options.fn(this));
        },
        unmarked: function (options) {
          var marked = require('marked')(options.fn(this));
          // http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
          return marked.replace(/<(?:.|\n)*?>/gm, '');
        },
      },
    },
    browserifybundler: {
      inFiles: "/scripts/index.js",
      outFile: "/scripts/bundle.js",
    },
    raw: {
      'font-awesome': {
        command: ['rsync', '-r', 'node_modules/font-awesome/fonts/', 'out/fonts'],
      },
      semantic: {
        command: ['rsync', '-r', 'node_modules/semantic/src/fonts/', 'out/fonts'],
      },
    },
    ghpages: {
      deployRemote: 'target',
      deployBranch: 'master',
    },
  },
  environments: {
    development: {
      port: 5000,
    },
  },
};