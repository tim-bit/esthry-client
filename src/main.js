/* main.js */

import http from 'jan';
import q from 'q';

class Esthry {
	constructor(opts) {
		this.opts = opts;

		this.host = this.opts.host;
		this.port = this.opts.port || '3000';
		this.protocol = this.opts.protocol || 'http:';
	}

	// builds a url to the api
	getUrl(path) {
		return `${this.protocol}//${this.host}:${this.port}/${path}`;
	}

	// returns a list of asset IDs
	getAssets() {
		var defer = q.defer();

		http.get(this.getUrl('asset'), (err, res, data) => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve(data);
			}
		});

		return defer.promise;
	}

	// returns a specific asset
	getAsset(id) {
		var defer = q.defer();

		http.get(this.getUrl(`asset/${id}/`), (err, res, data) => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve(data);
			}
		});

		return defer.promise;
	}

	// creates an asset according to `opts`
	createAsset(opts) {
		var defer = q.defer();


		http.post({
			url: this.getUrl(`asset`),
			body: JSON.stringify(opts)
		}, (err, res, data) => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve(data);
			}
		});

		return defer.promise;
	}

	// updates the asset specified in `opts`
	updateAsset(opts) {
		var defer = q.defer(),
			id = opts.id;

		delete opts.id;

		http({
			method: 'PUT',
			url: this.getUrl(`asset/${id}`),
			body: JSON.stringify(opts)
		}, (err, res) => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve(res);
			}
		});

		return defer.promise;
	}

	// deletes the given asset
	deleteAsset(id) {
		var defer = q.defer();

		http({
			method: 'DELETE',
			url: this.getUrl(`asset/${id}/`)
		}, (err, res) => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve(res);
			}
		});

		return defer.promise;
	}
}

export default Esthry;