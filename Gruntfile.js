module.exports = function(grunt) {

	// initialize configuration
	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'src/*']
		},
		requirejs: {
			compile: {
				options: {
					name: 'esthry',
					mainConfigFile: 'config.js',
					out: 'dist/app.js'
				}
			}
		}
	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// register tasks
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['lint', 'requirejs']);

	// set default task
	grunt.registerTask('default', ['lint']);
};
