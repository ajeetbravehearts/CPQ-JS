module.exports = function(oauth2) {

	var provider = 'QuoteAPI';
	var client = require('../../client/Client.js')(oauth2);

	function read(quoteId, version) {
		return client.read( { reader: provider + '.QuoteReader', uid: quoteId, version: version } );
	}

	function save(quote, version) {
		return client.save( { saver: provider + '.QuoteSaver', model: quote, version: version } );
	}

	function calculate(quote, version) {
		var context = { quote: quote };
		return load('QuoteCalculator', context, version);
	}

	function addProducts(quote, groupKey, products, ignoreCalculate, version) {
		var context = { quote: quote, groupKey: groupKey, products: products, ignoreCalculate: ignoreCalculate };
		return load('QuoteProductAdder', context, version);
	}

	function load(loader, context, version) {
		return client.load( { loader: provider + '.' + loader,  uid: null, context: context, version: version } );
	}

	return {
		read: read,
		save: save,
		calculate: calculate,
		addProducts: addProducts
	};
};