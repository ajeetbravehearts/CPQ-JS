var jsforce = require('jsforce');

module.exports = function(url, refreshToken) {

    function getConnection() {
        return new jsforce.Connection({
            instanceUrl: url,
            refreshToken: refreshToken
        });
    }

    return {
        getConnection: getConnection
    };
}