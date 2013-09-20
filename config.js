// requirejs configuration
require.config({
	// set base path for modules
	baseUrl: 'src',

	// bootstrap the application with the esthry module
	deps: ['esthry'],

	// override paths for libs
	paths: {
		'zepto-ajax': 'lib/zepto-ajax/zepto.js'
	}
});
