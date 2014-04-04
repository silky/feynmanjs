module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: {
          
        }
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/feynman.js': ['src/index.js']
        },
        options: {
          'debug'     : true,
          'standalone': 'Feynman'
        }
      },
      test: {
        files: {
          'spec/feynman.spec.js': ['spec/src/**/*.js']
        },
        options: {
          'debug': true
        }
      }
    },
    jasmine: {
      feynman: {
        options: {
          specs: './spec/feynman.spec.js'
        }
      }
    },
    watch: {
      src: {
        files: ['src/**/*.js'],
        tasks: ['default']
      },
      test: {
        files: ['src/**/*.js', 'spec/src/**/*.spec.js'],
        tasks: ['test'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', 'Browserify and uglify', function() {

    grunt.log.writeln('Building...');
    grunt.task.run('browserify:dist');
    grunt.task.run('uglify');
  });

  grunt.registerTask('test', 'Compile specs and run them', function() {

    grunt.log.writeln('Building tests...');
    grunt.task.run('browserify:test');
    grunt.task.run('jasmine:feynman');
  });

};