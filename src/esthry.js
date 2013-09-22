/* global define*/
define(['q', 'rest', 'zepto'], function(Q, Rest, $) {
	'use strict';

	var REST = Rest.getClient(),
		$list = $('#resource-list'),
		fade_duration = 300;

	/**
	 * Display a list of items with a given heading
	 *
	 * @param {String} heading
	 * @param {Array} items
	 */
	function displayList(heading, type, items) {

		// empty the list
		$list.find('ul')
			.empty();

		if (items.length) {
			// insert the items into the list
			_.each(items, function(item) {
				$list.find('ul')
					.append($('<li class="list-group-item"><a href="http://kmncz.com:3000/' + type + '/' + item._id + '">' + item.title + '</a></li>'));
			});
		} else {
			$list.find('ul')
				.append($('<li class="list-group-item">No '  + type + 's available</li>'));
		}

		// set the heading
		$list.find('h3')
			.text(heading);

		// show the list
		$list.animate({opacity: 1}, fade_duration);
	}

	/**
	 * Hides the resource list
	 */
	function hideList() {
		$list.animate({opacity: 0}, fade_duration);
	}

	/**
	 * Maps an ID to its expanded object
	 *
	 * @param {String} type
	 * @param {String} id
	 * @return {Promise}
	 */
	function mapIdToResource(type, id) {
		var defer = Q.defer(),
			url = type + '/' + id;

		REST.get(url)
			.then(function(obj) {
				defer.resolve(obj);
			})
			.done();

		return defer.promise;
	}

	// loads and displays collections
	$('#nav-collections')
		.click(function() {
			hideList();
			REST.get('collection/')
				.then(function(ids) {
					return Q.all(_.map(ids, _.partial(mapIdToResource, 'collection')));
				})
				.then(function(collections) {
					displayList('Collections', 'collection', collections);
				})
				.done();
		});

	// loads and displays assets
	$('#nav-assets')
		.click(function() {
			hideList();
			REST.get('asset/')
				.then(function(ids) {
					return Q.all(_.map(ids, _.partial(mapIdToResource, 'asset')));
				})
				.then(function(assets) {
					displayList('Assets', 'asset', assets);
				})
				.done();
		});

	// loads and display tags
	$('#nav-tags')
		.click(function() {
			hideList();
			REST.get('tag/')
				.then(function(ids) {
					return Q.all(_.map(ids, _.partial(mapIdToResource, 'tag')));
				})
				.then(function(tags) {
					displayList('Tags', 'tag', tags);
				})
				.done();
		});
});
