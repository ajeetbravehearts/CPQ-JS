module.exports = function(oauth2) {

    var version = '25.0.0';
    var route = '/SBQQ/ServiceRouter';
    var conn = typeof window !== 'undefined' ? require('../browser/Conn.js')(oauth2) : require('../server/Conn.js')(oauth2);

    function read(args) {
        var endpoint = route + '?reader=' + args.reader + '&uid=' + args.uid + '&version=' + (args.version || version);
        return new Promise(function(resolve, reject) {
            conn.getConnection().then(function(connection) {
                connection.apex.get(endpoint).then(function(result) {
                    resolve(parse(result.proxy ? result.proxy.response : result));
                }, function(err) {
                    reject(err);
                });
            }, function(err) {
                reject(err);
            });
        });
    }

    function load(args) {
        var endpoint = route + '?loader=' + args.loader + '&uid=' + args.uid + '&version=' + (args.version || version);
        var body = {context: JSON.stringify(args.context)};
        return new Promise(function(resolve, reject) {
            conn.getConnection().then(function(connection) {
                connection.apex.patch(endpoint, body).then(function(result) {
                    resolve(parse(result.proxy ? result.proxy.response : result));
                }, function(err) {
                    reject(err);
                });
            }, function(err) {
                reject(err);
            });
        });
    }

    function save(args) {
        var endpoint = route + '?version=' + (args.version || version);
        var body = {saver: args.saver, model: JSON.stringify(args.model)};
        return new Promise(function(resolve, reject) {
            conn.getConnection().then(function(connection) {
                connection.apex.post(endpoint, body).then(function(result) {
                    resolve(parse(result.proxy ? result.proxy.response : result));
                }, function(err) {
                    reject(err);
                });
            }, function(err) {
                reject(err);
            });
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
        read: read,
        load: load,
        save: save
    };
}