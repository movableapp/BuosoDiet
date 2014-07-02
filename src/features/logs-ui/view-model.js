
var logs = require('logs');
var createLogViewModel = require('./log-view-model');

var logsViewModel = {
    init: function() {
        this.items = ko.observableArray();
        
        logs.onReady(this.populate.bind(this));
        this.resetSubscription = logs.subscribe('reset', this.populate.bind(this));
    },
    dispose: function() {
        this.resetSubscription.dispose();
        this.items().forEach(function(item) {
            item.dispose();
        });
    },
    populate: function() {
        var items = this.items();
        logs.getAll().forEach(function(log) {
            items.push(createLogViewModel(log));
        });
        this.items.valueHasMutated();
    },
    reset: function() {
        this.items.removeAll();
        logs.reset();
    }
};

module.exports = function() {
    var instance = Object.create(logsViewModel);
    instance.init();
    return instance;
};
