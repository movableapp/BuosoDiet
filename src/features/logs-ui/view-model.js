
var logs = require('logs');
var foods = require('foods');
var settings = require('settings');

var createLogViewModel = require('./log-view-model');

var logsViewModel = {
    init: function() {
        this.items = ko.observableArray();
        
        initAvailableUnits(this);
        
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

function initAvailableUnits(vm) {
    vm.categories = ko.observableArray();
    foods.getCategoryIds().forEach(function(category) {
        vm[category] = ko.observable({
            id: category,
            label: foods.getCategoryLabel(category),
            units: 0,
            logged: 0,
            available: 0,
            progress: 0,
            usage: 0
        });
    });
    settings.onReady(function() { logs.onReady(function() {
        foods.getCategoryIds().forEach(function(category) {
            var data = vm[category]();
            data.units = settings.getDailyUnitsByCategoryId(category);
            data.logged = logs.getUnitsByCategoryId(category);
            data.available = data.units - data.logged;
            data.progress = data.logged / data.units * 100;
            data.usage = data.logged / data.units * 100;
            
            if (data.progress > 100) {
                data.progress = 0;
            }
            
            data.logged = roundDec(data.logged);
            data.available = roundDec(data.available);
            data.progress = round(data.progress);
            data.usage = round(data.usage);
            
            vm[category](data);
            vm.categories.push(vm[category]);
        });
    }.bind(this));}.bind(this));
}

function round(num) {
    if (isNaN(num)) {
        return 0;
    }
    if (num < 0) {
        return 0;
    }
    return Math.round(num);
}

function roundDec(num) {
    if (isNaN(num)) {
        return 0;
    }
    if (num < 0) {
        return 0;
    }
    return Math.round(num*10)/10;
}

module.exports = function() {
    var instance = Object.create(logsViewModel);
    instance.init();
    return instance;
};
