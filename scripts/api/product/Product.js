module.exports = function(oauth2) {

	var provider = 'ProductAPI';
	var client = require('../../client/Client.js')(oauth2);

	function read(productId, pricebookId, currencyCode, version) {
		var context = { pricebookId: pricebookId, currencyCode: currencyCode };
		return load('ProductLoader', productId, context, version);
	}

	function search(searchFilters, format, quote, recordsPerPage, pageNumber, version) {
		var context = { filters: searchFilters, format: format,  quote: quote, recordsPerPage: recordsPerPage, pageNumber: pageNumber };
		return load('ProductSearcher', null, context, version);
	}

	function suggest(quoteProcess, format, quote, recordsPerPage, pageNumber, version) {
		var context = { process: quoteProcess, format: format,  quote: quote, recordsPerPage: recordsPerPage, pageNumber: pageNumber };
		return load('ProductSuggester', null, context, version);
	}

	function load(loader, uid, context, version) {
		return client.load( { loader: provider + '.' + loader,  uid: uid, context: context, version: version } );
	}

	return {
		read: read,
		search: search,
		suggest: suggest
	};
};