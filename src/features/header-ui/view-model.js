
var router = require('router');

var headerViewModel = {
    init: function() {
        var self = this;
        
        this.isActive = ko.observable(false);
        this.isHidden = ko.observable(false);
        this.title = ko.observable();
        
        this.lbEnabled = ko.observable(false);
        this.lbShow = ko.observable('');
        this.lbUrl = ko.observable('/');
        
        this.rbEnabled = ko.observable(false);
        this.rbShow = ko.observable('');
        this.rbUrl = ko.observable('/');
        
        // iOS fix: fixed header disappear until scroll
        // this will delay the "fixed" property to a custom class
        setTimeout(function() {
            self.isActive(true);
        }, 100);
    },
    dispose: function() {},
    reset: function(options) {
        this.title(options.title || '--');
        this.lbEnabled(false);
        this.rbEnabled(false);
        
        if (options.leftBtn !== false) {
            this.lbEnabled(true);
            this.lbShow(options.leftBtn.show);
            this.lbUrl(options.leftBtn.url);
        }
        
        if (options.rightBtn !== false) {
            this.rbEnabled(true);
            this.rbShow(options.rightBtn.show);
            this.rbUrl(options.rightBtn.url);
        }
    },
    lbClick: function() {
        router.navigate(this.lbUrl());
    },
    rbClick: function() {
        router.navigate(this.rbUrl());
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
