module.exports = function(oauth2) {

    var client = require('../../client/Client.js')(oauth2);

    function read(uid, version) {
        return client.read({reader: 'SampleServiceProvider', uid: uid, version: version});
    }

    function load(uid, context, version) {
        return client.load({loader: 'SampleServiceProvider', uid: uid, context: context, version: version});
    }

    function save(model, version) {
        return client.save({saver: 'SampleServiceProvider', model: model, version: version});
    }

    return {
        read : read,
        load: load,
        save: save
    };
}