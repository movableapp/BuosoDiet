
var subscribable = require('utils/subscribable').mixin;
var uuid = require('utils/uuid');

var logs = require('logs');
var settings = require('settings');

var foodModel = {
    init: function(category, data) {
        var self = this;
        
        this.id = data.id || uuid();
        this.name = data.n;
        this.category = category;
        this.categoryId = this.category.id;
        this.unit = data.u;
        this.amountPerUnit = data.a;
        
        var channel = subscribable({});
        this.subscribe = channel.subscribe.bind(channel);
        
        function verboseUpdate() {
            self.updateUnits();
            channel.publish('update');
        }
        
        this.logsSubscription = logs.subscribe('logged-units-changed:' + this.categoryId, verboseUpdate);
        this.settingsSubscription = settings.subscribe('settings-updated', verboseUpdate);
        
        this.updateUnits();
    },
    updateUnits: function() {
        this.dailyUnits = settings.getDailyUnitsByCategoryId(this.categoryId);
        this.dailyQt = this.dailyUnits * this.amountPerUnit;
        this.availableUnits = getAvailableUnitsByCategoryId(this.categoryId);
        this.availableQt = this.availableUnits * this.amountPerUnit;
    },
    dispose: function() {
        this.logsSubscription.dispose();
        this.settingsSubscription.dispose();
    },
    log: function(qt) {
        logs.add(this, 1);
    }
};

module.exports = function(category, data) {
    var _ = Object.create(foodModel);
    _.init(category, data);
    return _;
};

function getAvailableUnitsByCategoryId(categoryId) {
    var availableUnits = settings.getDailyUnitsByCategoryId(categoryId) - logs.getUnitsByCategoryId(categoryId);
    if (availableUnits > 0) {
        return availableUnits;
    }
    return 
}