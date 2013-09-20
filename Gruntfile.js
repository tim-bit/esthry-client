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
					optimize: 'none',
					out: 'dist/esthry.js'
				}
			}
		},
		uglify: {
			options: {
				compress: true,
				mangle: true,
				report: 'gzip'
			},
			myTarget: {
				files: {
					'dist/esthry.min.js': ['dist/esthry.js']
				}
			}
		}
	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register tasks
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['lint', 'requirejs', 'uglify']);

	// set default task
	grunt.registerTask('default', ['lint']);
};
