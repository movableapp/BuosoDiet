
var router = require('router');

var headerViewModel = {
    init: function() {},
    dispose: function() {},
    goHome: function() {
        router.navigate('/');
    },
    goLogs: function() {
        router.navigate('/logs');
    },
    goSettings: function() {
        router.navigate('/settings');
    }
};

module.exports = function() {
    var _ = Object.create(headerViewModel);
    _.init();
    return _;
};
