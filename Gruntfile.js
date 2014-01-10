/*
 * holonomy-website
 * https://github.com/holonomy/website
 * licensed under the AGPLv3 license.
 */

'use strict';

var _ = require('lodash');

var banner = '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';
var lessPaths = [
  'node_modules/semantic/src',
  'node_modules/font-awesome/less',
  'styles',
];
var fontFiles = [
  'node_modules/font-awesome/fonts/*',
  'node_modules/semantic/src/fonts/*',
];

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
        layout: 'templates/layouts/layout.hbs',
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
      develop: {
        files: {
          'build/index.css': 'styles/index.less',
        },
      },
      deploy: {
        options: {
          cleancss: true,
          report: 'min',
          sourceMap: true,
        },
        files: {
          'build/index.css': 'styles/index.less',
        },
      },
    },

    // compile JS
    browserify: {
      develop: {
        files: {
          'build/index.js': 'scripts/index.js',
        },
      },
      deploy: {
        files: {
          'build/index.js': 'scripts/index.js',
        },
        options: {
          transform: ['uglifyify'],
        }
      },
    },

    // before generating any new files,
    // remove any previously-created files.
    clean: {
      build: ['build/**/*']
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'assets',
        src: ['**'],
        dest: 'build/',
      },
      fonts: {
        src: fontFiles,
        dest: 'build/fonts/',
        expand: true,
        flatten: true,
        filter: 'isFile',
      },
    },

    connect: {
      options: {
        port: 5000,
        base: 'build',
      },
      develop: {
        options: {
          livereload: true,
        },
      },
      default: {
        options: {
          keepalive: true,
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
        tasks: ['clean', 'assemble', 'less:develop'],
      },
      less: {
        files: _.map(lessPaths,
          function (p) { return p + '/*.less'; }
        ),
        tasks: ['less:develop'],
      },
      browserify: {
        files: 'scripts/**/*.js',
        tasks: ['browserify:develop'],
      },
      assemble: {
        files: ['README.md', 'templates/**/*.hbs', 'templates/helpers/*.js', 'content/**'],
        tasks: ['assemble'],
      },
    },

    compress: {
      options: {
        mode: 'gzip',
      },
      deploy: {
        files: [
          {
            expand: true,
            cwd: 'build',
            src: '**/*',
            dest: 'build',
            filter: 'isFile',
          },
        ],
      },
    },

    hashres: {
      deploy: {
        src: [
          'build/*.css*',
          'build/*.js*',
        ],
        dest: 'build/**/*.html',
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
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', 'assemble*'],
  });

  // register grunt tasks
  grunt.registerTask('develop', ['clean', 'jshint', 'assemble', 'less:develop', 'browserify:develop', 'copy', 'connect:develop', 'watch']);
  grunt.registerTask('deploy', ['clean', 'jshint', 'assemble', 'less:deploy', 'browserify:deploy', 'copy', /*'compress', */'hashres', 'gh-pages']);

  // default task to be run.
  grunt.registerTask('default', ['clean', 'assemble', 'less:deploy', 'connect:default']);
};
