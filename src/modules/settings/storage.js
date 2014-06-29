
var webStorage = require('web-storage');

var strategy = 'local';
var key = 'settings';

var defaults = {
    fa: 6,
    pi: 1.5,
    la: 1.5,
    fr: 3,
    ve: 1,
    co: 1
};

exports.save = function(data) {
    webStorage.store(strategy, key, data);
};

exports.load = function(cb) {
    setTimeout(function() {
        var data = webStorage.retrieve(strategy, key) || defaults;
        cb(data);
    }, 0);
};
