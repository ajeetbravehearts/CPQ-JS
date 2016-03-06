module.exports = function(oauth2) {

    var provider = 'SimpleServiceProvider';
    var client = require('../../client/Client.js')(oauth2);

    function read(uid, version) {
        return client.read({reader: provider, uid: uid, version: version});
    }

    function load(uid, context, version) {
        return client.load({loader: provider, uid: uid, context: context, version: version});
    }

    function save(model, version) {
        return client.save({saver: provider, model: model, version: version});
    }

    return {
        read : read,
        load: load,
        save: save
    };
}