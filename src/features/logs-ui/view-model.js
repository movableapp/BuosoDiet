
var logs = require('logs');

var logsViewModel = {
    init: function() {
        this.items = ko.observableArray();
        
        logs.onReady(this.populate.bind(this));
        this.resetSubscription = logs.subscribe('reset', this.populate.bind(this));
    },
    dispose: function() {
        this.resetSubscription.dispose();
    },
    populate: function() {
        var items = this.items();
        logs.getAll().forEach(function(log) {
            items.push(log);
        });
        this.items.valueHasMutated();
    },
    reset: function() {
        this.items.removeAll();
        logs.reset();
    }
};

module.exports = function() {
    var _ = Object.create(logsViewModel);
    _.init();
    return _;
};
