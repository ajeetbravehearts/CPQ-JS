module.exports = function(opts) {

    var version = '25.0.0';
    var endpoint = '/SBQQ/ServiceRouter';
    var conn = typeof window !== 'undefined' ? require('../browser/Conn.js')(opts) : require('../server/Conn.js')(opts);

    function read(args) {
        return new Promise(function(resolve, reject) {
            var v = args.version || version;
            conn.getConnection().then(function(connection) {
                var url = endpoint + '?reader=' + args.reader + '&uid=' + args.uid + '&version=' + v;
                connection.apex.get(url).then(function(result) {
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
        read: read
    };
}