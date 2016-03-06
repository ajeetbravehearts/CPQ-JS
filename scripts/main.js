(function() {
    var sample = require('./api/sample/Sample.js');

    var cpq = function (opts) {
        return {
           sample: sample(opts)
        }
    }

    if (typeof window !== 'undefined')
        window.cpqjs = cpq;
    else
        module.exports = cpq;
})();