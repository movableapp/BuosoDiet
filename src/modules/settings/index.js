
var mixinSubscribable = require('utils/subscribable').mixin;
var mixinOnReady = require('jqb-onready').mixin;

var storage = require('./storage');

var settings = {};

mixinOnReady(exports);
mixinSubscribable(exports);

exports.init = function() {
    var self = this;
    storage.load(function(values) {
        settings = values;
        self.onReady(true);
        self.publish('settings-updated');
    });
};

exports.getDailyUnitsByCategoryId = function(id) {
    return settings[id] || 0;
};

exports.set = function(values) {
    settings = values;
    storage.save(settings);
    this.publish('settings-updated');
};
