module.exports = function(grunt) {

	// initialize configuration
	grunt.initConfig({
		concat: {
			bootstrap: {
				files: {
					'dist/bootstrap.css': ['lib/bootstrap/dist/css/bootstrap.min.css', 'lib/bootstrap/dist/css/bootstrap-theme.min.css']
				}
			},
			css: {
				files: {
					'dist/esthry.css': ['dist/bootstrap.css']
				}
			}
		},
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register tasks
	grunt.registerTask('css', ['css:bootstrap', 'concat:css']);
	grunt.registerTask('css:bootstrap', ['concat:bootstrap']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['lint', 'css', 'requirejs', 'uglify']);

	// set default task
	grunt.registerTask('default', ['lint']);
};
