(function() {
    var cpq = function (url, refreshToken) {
        return {
            sample: require('./api/Sample.js')(url, refreshToken)
        }
    }

    if (typeof window !== 'undefined')
        window.cpq = cpq;
    else
        module.exports = cpq;
})();