var jsforce = require('jsforce');

module.exports = function(oauth2) {

    jsforce.browser.Client.prototype._getTokens = function() {
        this.connection._refreshDelegate = true;
        return {
            instanceUrl: oauth2.url,
            refreshToken: oauth2.refreshToken
        }
    }

    function getConnection() {
        return new Promise(function(resolve, reject) {
            jsforce.browser.once('connect', function(conn) {
                var createRequestParams = conn.apex._createRequestParams.bind(conn.apex);
                conn.apex._createRequestParams = function(method, path, body) {
                    var params = createRequestParams(method, path, body);
                    params.headers = params.headers || {};
                    params.headers['X-Authorization'] = conn.refreshToken;
                    return params;
                };
                resolve(conn);
            });
            jsforce.browser.init( {proxyUrl: 'https://brick-rest-proxy.herokuapp.com/proxy/'} );
        });
    }

    return {
        getConnection: getConnection
    };
}