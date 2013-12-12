module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: 'build',
    filename: 'canon-angular',

    jshint: {
      files: [
        'Gruntfile.js',
        'lib/directives/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      dev: {
        singleRun: true,
        browsers: ['Chrome']
      },
      travis: {
        singleRun: true,
        browsers: ['Firefox']
      }
    },

    clean: {
      all: ['build']
    },

    concat: {
      dist: {
        src: ['build/scripts/**/*.js'],
        dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
      },
      release: {
        src: ['build/scripts/**/*.js'],
        dest: '<%= dist %>/<%= filename %>.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          middleware: function (connect) {
            var livereload = require('connect-livereload');

            return [
              livereload(),
              connect.static('examples'),
              connect.static('build'),
              connect.static('bower_components'),
              connect.directory('examples')
            ];
          }
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= connect.server.options.port %>'
      }
    },

    ngmin: {
      dist: {
        expand: true,
        cwd: 'lib/scripts/',
        src: ['**/*.js'],
        dest: '<%= dist %>/scripts'
      }
    },

    uglify: {
      dist:{
        src: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js',
        dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
      },
      release:{
        src: '<%= dist %>/<%= filename %>.js',
        dest:'<%= dist %>/<%= filename %>.min.js'
      }
    },

    watch: {
      html: {
        files: ['examples/**/*.html', 'templates/**/*.html'],
        options: {
          livereload: true
        }
      },
      lib: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'build'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('test', 'Run tests on singleRun karma server', function() {
    if (process.env.TRAVIS) {
      grunt.task.run('karma:travis');
    } else {
      grunt.task.run('karma:dev');
    }
  });

  grunt.registerTask('build', ['clean', 'ngmin:dist', 'concat:dist', 'uglify:dist']);
  grunt.registerTask('default', ['jshint', 'build', 'test']);
  grunt.registerTask('server', ['jshint', 'build', 'connect:server', 'open', 'watch']);
  grunt.registerTask('release', ['clean', 'ngmin:dist', 'concat:release', 'uglify:release']);
};