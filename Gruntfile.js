module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'style.css' : 'sass/style.scss',
				}
			}
		},
		watch: {
			css: {
				files: 'sass/**/*.scss',
				tasks: ['sass']
			}
		},
		connect: {
		  client: {
		    options: {
		      // The server's port, and the folder to serve from:
		      // Ex: 'localhost:9000' would serve up 'index.html'
		      port: 9000,
		      base:''
		      // Custom middleware for the HTTP server:
		      // The injected JavaScript reloads the page.
		      //middleware: livereloadMiddleware
		    }
		  }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default',['connect','sass','watch']);
}
