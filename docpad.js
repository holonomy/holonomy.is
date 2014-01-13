// http://docpad.org/docs/config

module.exports = {
  templateData: {
    site: {
      title: "holonomy is",
      description: "technology for self-organized collective infrastructure",
    },
  },
  plugins: {
    handlebars: {
      helpers: {
        partial: function (content, options) {
          return this.partial(content, options);
        },
        block: function (blockName) {
          return this.getBlock(blockName).toHTML();
        },
      },
    },
    browserifybundler: {
      inFiles: "/scripts/index.js",
      outFile: "index.js",
    },
  },
  environments: {
    development: {
      port: 5000,
    },
  },
};