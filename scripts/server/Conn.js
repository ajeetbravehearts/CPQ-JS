var jsforce = require('jsforce');
var request = require('request');

module.exports = function(opts) {

    var accessToken;

    var rHeaders =  {
        org_url: opts.url,
        refresh_token: opts.refreshToken
    };

    var refresh = {
        url: 'https://brick-rest-test.herokuapp.com/oauth/refresh',
        headers: rHeaders
    };

    jsforce.OAuth2.prototype.refreshToken = function(refreshToken, callback) {
        request(refresh, function (error, response, body) {
            accessToken = parse(body).accessToken;
            callback((!accessToken ? {message: error.message || error} : false), {access_token : accessToken, id: '' });
        });
    };

    function getConnection() {
        return new Promise(function(resolve, reject) {
            resolve(new jsforce.Connection({
                instanceUrl: opts.url,
                refreshToken: opts.refreshToken,
                accessToken: accessToken,
                clientId: true,
                clientSecret: true
            }));
        });
    }

    function parse(obj) {
        try {
            return JSON.parse(obj);
        } catch (e) {
            return obj;
        }
    }


    return {
        getConnection: getConnection
    };
}