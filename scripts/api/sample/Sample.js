module.exports = function(opts) {

    var client = require('../../client/Client.js')(opts);

    function read(uid, version) {
        return client.read({reader: 'SampleServiceProvider', uid: uid, version: version});
    }

    return {
        read : read
    };
}