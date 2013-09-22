// requirejs configuration
require.config({
	// set base path for modules
	baseUrl: 'src',

	// bootstrap the application with the esthry module
	deps: ['esthry'],

	// override paths for libs
	paths: {
		bootstrap: '../lib/bootstrap/dist/js/bootstrap',
		lodash: '../lib/lodash/dist/lodash',
		q: '../lib/q/q',
		zepto: '../lib/zepto/zepto'
	},

	// shim config
	shim: {
		bootstrap: {
			deps: ['zepto'],
			exports: '$.fn.popover'
		},
		zepto: {
			exports: '$'
		}
	}
});
