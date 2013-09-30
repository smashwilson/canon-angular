module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      package: {
        src: 'package.json'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['directives/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      package: {
        files: '<%= jshint.package.src %>',
        tasks: ['jshint:package'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: true
        }
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib'],
        options: {
          livereload: true
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
 
};