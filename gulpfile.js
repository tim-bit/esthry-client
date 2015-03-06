var gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	babel = require('gulp-babel'),
	amdBuilder = require('gulp-amd-builder'),
	jshint = require('gulp-jshint'),
	q = require('q');

// lint files
gulp.task('jshint', function() {
	return gulp.src(['src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

// transpile es6 -> es5
gulp.task('es6', ['jshint'], function() {
	var cond = function(file) {
		return (file.relative !== 'bootstrap.js')
	};

	return gulp.src(['src/**/*.js'], {base: 'src'})
		.pipe(gulpIf(cond, babel({
			modules: 'amd'
		})))
		.on('error', function(err) { throw err; })
		.pipe(gulp.dest('build'));
});

// flatten and wrap source code
gulp.task('wrap', ['es6'], function() {
	amdBuilder({
		srcDir: 'build',
		moduleName: 'esthry'
	});
});

// default task
gulp.task('default', ['wrap']);