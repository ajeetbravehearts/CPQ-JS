module.exports = function(url, refreshToken) {

    var endpoint = '/SBQQ/ServiceRouter';
    var conn = typeof window !== 'undefined' ? require('../browser/Conn.js')(url, refreshToken) : require('../server/Conn.js')(url, refreshToken);

    function read(reader, uid) {
        return new Promise(function(resolve, reject) {
            conn.getConnection().then(function(connection) {
                connection.apex.get(endpoint + '?reader=' + reader + '&uid=' + uid).then(function(result) {
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