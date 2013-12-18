/*
 * holonomy-website
 * https://github.com/ahdinosaur/holonomy-website
 * licensed under the AGPLv3 license.
 */

'use strict';

var _ = require('lodash');

var lessPaths = [
  'node_modules/bootstrap/less',
  'styles',
];
var banner = '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // build HTML from templates and data
    assemble: {
      options: {
        pkg: '<%= pkg %>',
        flatten: true,
        assets: 'static/assets',
        partials: ['templates/includes/*.hbs'],
        helpers: ['templates/helpers/*.js'],
        layout: 'templates/layouts/index.hbs',
        data: ['data/*.{json,yml}'],
      },
      build: {
        files: {'build/': ['templates/*.hbs']},
      },
    },

    // compile LESS to CSS
    less: {
      options: {
        banner: banner,
        paths: lessPaths,
      },
      all: {
        files: {
          'build/index.css': 'styles/index.less',
        },
      },
      develop: {
        compress: false,
      },
      deploy: {
        compress: true,
      },
    },

    // before generating any new files,
    // remove any previously-created files.
    clean: {
      build: ['build/*.html']
    },

    connect: {
      server: {
        options: {
          port: 5000,
          base: 'build',
          livereload: true,
        },
      },
    },

    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: ['build/**/*'],
      },
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint'],
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['build'],
      },
      less: {
        files: _.map(lessPaths, function (p) { return p + '/*.less'; }),
        tasks: ['less'],
      },
      assemble: {
        files: ['templates/**/*.hbs', 'templates/helpers/*.js'],
        tasks: ['assemble'],
      },
    },

    hashres: {
      deploy: {
        src: [
          'build/index.css',
        ],
        dest: 'build/index.html',
      },
    },

    'gh-pages': {
      deploy: {
        options: {
          base: 'build',
          repo: 'git@github.com:holonomy/holonomy.github.io',
          branch: 'master',
          message: banner,
        },
        src: ['**/*'],
      },
    },
  });

  // load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('assemble');

  // register grunt tasks
  grunt.registerTask('build', ['clean', 'jshint', 'assemble', 'less', 'readme']);
  grunt.registerTask('server', ['connect']);
  grunt.registerTask('develop', ['build', 'server', 'watch']);
  grunt.registerTask('deploy', ['build', 'hashres', 'gh-pages']);

  // default task to be run.
  grunt.registerTask('default', ['build', 'server']);
};
