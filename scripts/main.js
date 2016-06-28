(function() {
    var sample = require('./api/sample/Sample.js');
    var quote = require('./api/quote/Quote.js');
    var product = require('./api/product/Product.js');
    var contract = require('./api/contract/Contract.js');

    var cpq = function (oauth2) {
        return {
            sample: sample(oauth2),
            quote: quote(oauth2),
            product: product(oauth2),
            contract: contract(oauth2),
            query: require('./client/Client.js')(oauth2).query
        };
    };

    if (typeof window !== 'undefined')
        window.cpqjs = cpq;
    else
        module.exports = cpq;
})();