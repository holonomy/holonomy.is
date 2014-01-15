// http://docpad.org/docs/config

var _ = require('lodash');

module.exports = {
  templateData: {
    site: {
      title: "holonomy is",
      description: "where the economy is free (as in freedom) and flat (without hierarchy)",
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