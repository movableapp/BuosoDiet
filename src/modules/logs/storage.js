
var webStorage = require('web-storage');

var strategy = 'local';
var key = 'logs';

exports.save = function(data) {
    webStorage.store(strategy, key, data);
};

exports.load = function(cb) {
    setTimeout(function() {
        var data = webStorage.retrieve(strategy, key) || [];
        cb(data);
    }, 0);
};
