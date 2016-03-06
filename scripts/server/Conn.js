var jsforce = require('jsforce');
var request = require('request');

module.exports = function(oauth2) {

    var rHeaders =  {
        org_url: oauth2.url,
        refresh_token: oauth2.refreshToken
    };

    var refresh = {
        url: 'https://brick-rest.steelbrick.com/oauth/refresh',
        headers: rHeaders
    };

    var accessToken;
    jsforce.OAuth2.prototype.refreshToken = function(refreshToken, callback) {
        request(refresh, function (error, response, body) {
            accessToken = parse(body).accessToken;
            callback((!accessToken ? {message: error.message || error} : false), {access_token : accessToken, id: '' });
        });
    };

    function getConnection() {
        return new Promise(function(resolve, reject) {
            resolve(new jsforce.Connection({
                instanceUrl: oauth2.url,
                refreshToken: oauth2.refreshToken,
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