
var settings = require('settings');
var foods = require('foods');

var settingsViewModel = {
    init: function() {
        var self = this;
        this.categories = ko.observableArray();
        
        settings.onReady(function() {
            foods.onReady(function() {
                foods.getCategoryIds().forEach(function(id) {
                    self.categories.push({
                        id: id,
                        label: foods.getCategoryLabel(id),
                        value: ko.observable(settings.getDailyUnitsByCategoryId(id))
                    });
                });
            });
        });
          
    },
    dispose: function() {},
    save: function() {
        values = {};
        this.categories().forEach(function(category) {
            values[category.id] = category.value();
        });
        settings.set(values);
    }
};

module.exports = function() {
    var _ = Object.create(settingsViewModel);
    _.init();
    return _;
};
