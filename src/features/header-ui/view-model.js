
var router = require('router');

var headerViewModel = {
    init: function() {
        this.title = ko.observable();
        this.backUrl = ko.observable();
        this.goBackEnabled = ko.computed(function() {
            return this.backUrl() !== false;
        }, this);
        this.reset();
    },
    dispose: function() {
        this.goBackEnabled.dispose();
    },
    reset: function() {
        this.title('BuosoDiet');
        this.backUrl(false);
    },
    goBack: function() {
        var url = this.backUrl();
        if (url === false) {
            return;
        }
        router.navigate(url);
    }
};

module.exports = function() {
    var _ = Object.create(headerViewModel);
    _.init();
    return _;
};
