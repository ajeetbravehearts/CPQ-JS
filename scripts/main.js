(function() {
    var sample = require('./api/sample/Sample.js');

    var cpq = function (oauth2) {
        return {
           sample: sample(oauth2)
        }
    }

    if (typeof window !== 'undefined')
        window.cpqjs = cpq;
    else
        module.exports = cpq;
})();