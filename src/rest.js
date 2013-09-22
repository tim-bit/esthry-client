/* global define*/
define(['q', 'zepto', 'lodash'], function(Q, $, _) {
	'use strict';

	// service settings
	var svc = {
		host: 'kmncz.com',
		port: 3000
	};

	/**
	 * Performs an HTTP request
	 *
	 * @param {String} host
	 * @param {Integer} port
	 * @param {String} method
	 * @param {String} path
	 * @param {Mixed} payload
	 * @return {Promise}
	 */
	function makeRequest(host, port, method, path, payload) {
		var defer = Q.defer(),
			url = 'http://' + host + ':' + port + '/' + path;

		console.log('REST request: ' + url);

		// perform the ajax request
		$.ajax({
			type: method,
			url: url,
			data: payload,
			contentType: 'application/json',
			dataType: 'json',
			success: function(data, status, xhr) {
				defer.resolve(data);
			},
			error: function(xhr, status) {
				defer.reject(arguments);
			}
		});

		return defer.promise;
	}

	/**
	 * Returns a REST client
	 *
	 * @return {Object}
	 */
	function getClient() {
		// expose api methods
		return {
			del: _.partial(makeRequest, svc.host, svc.port, 'DELETE'),
			get: _.partial(makeRequest, svc.host, svc.port, 'GET'),
			post: _.partial(makeRequest, svc.host, svc.port, 'POST'),
			put: _.partial(makeRequest, svc.host, svc.port, 'PUT')
		};
	}

	// export methods
	return {
		getClient: getClient
	};
});
