module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Contribs & Interests */\n'
      },
      build: {
        src: 'public/js/app.js',
        dest: 'build/public/js/app.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['public/css']
        },
        files: {
          'public/css/style.css': 'public/less/style.less',
          'public/css/bootstrap.css': 'public/less/bootstrap.less'
        }
      },
      production: {
        options: {
          paths: ['public/css'],
          yuicompress: true
        },
        files: {
          'public/css/style.css': 'public/less/style.less',
          'public/css/bootstrap.css': 'public/less/bootstrap.less'
        }
      }
    },
    watch: {
      files: 'public/less/*',
      tasks: ['less:development']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('heroku:production', 'less:production');
};
