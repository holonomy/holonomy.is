// http://docpad.org/docs/config

require('longjohn');

var _ = require('lodash');

module.exports = {
  templateData: {
    site: {
      title: "holonomy is",
      tagline: "the hive mind economy",
      description: "holonomy is the economy represented by the collective action of [holon](http://en.wikipedia.org/wiki/Holon_%28philosophy%29) beings. in order to create a better holonomy, we must strip away the infrastructure that causes us to act against each other, and reconstruct our economy as [peer-to-peer](http://en.wikipedia.org/wiki/Peer-to-peer) cooperative markets of self-organizing and replicating [holons](http://en.wikipedia.org/wiki/Holon_%28philosophy%29).",
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
