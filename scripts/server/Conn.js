var jsforce = require('jsforce');

module.exports = function(opts) {

    function getConnection() {
        return new jsforce.Connection({
            instanceUrl: opts.url,
            refreshToken: opts.refreshToken
        });
    }

    return {
        getConnection: getConnection
    };
}