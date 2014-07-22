
var logs = require('logs');
var foods = require('foods');
var settings = require('settings');

var foodViewModel = require('./food-view-model');

var categoryViewModel = {
    init: function(categoryModel) {
        this.model = categoryModel;
        this.label = this.model.label;
        this.filter = ko.observable('');
        this.foods = ko.observableArray();
        this.filteredFoods = ko.computed(computedFilteredFoods, this);
        this.filteredCount = ko.computed(computedFilteredCount, this);
        this.isVisible = ko.computed(computedIsVisible, this);
        
        initAvailableUnits(this);
    },
    dispose: function() {
        this.foods().forEach(function(food) {
            food.dispose();
        });
        this.filteredFoods.dispose();
        this.filteredCount.dispose();
        this.isVisible.dispose();
    },
    populate: function() {
        var foods = this.foods();
        this.model.items.forEach(function(foodModel) {
            foods.push(foodViewModel(foodModel));
        });
        this.foods.valueHasMutated();
    }
};

function computedFilteredFoods() {
    var filter = this.filter();
    var foods = this.foods();
    
    // reset filter
    if (!filter.length) {
        return foods;
    }
    
    // apply filter
    return foods.filter(function(food) {
        return food.name.toLowerCase().match(filter.toLowerCase()) !== null;
    });
}

function computedFilteredCount() {
    return this.filteredFoods().length;
};

function computedIsVisible() {
    return this.filteredCount() > 0;
}


function initAvailableUnits(vm) {
    vm.units = ko.observable('-');
    vm.logged = ko.observable('-');
    vm.available = ko.observable('-');
    vm.progress = ko.observable('%');
    vm.usage = ko.observable('%');
    
    settings.onReady(function() { logs.onReady(function() {
        updateAvailableUnits(vm);
        logs.subscribe('log-added', function() {
            updateAvailableUnits(vm);
        });
    }.bind(this));}.bind(this));
};

function updateAvailableUnits(vm) {
    vm.units(settings.getDailyUnitsByCategoryId(vm.model.id));
    vm.logged(logs.getUnitsByCategoryId(vm.model.id));
    vm.available(vm.units() - vm.logged());
    vm.progress(vm.logged() / vm.units() * 100);
    vm.usage(vm.logged() / vm.units() * 100);
    
    if (vm.progress() > 100) {
        vm.progress(100);
    }

    vm.logged(roundDec(vm.logged()));
    vm.available(roundDec(vm.available()));
    vm.progress(round(vm.progress()));
    vm.usage(round(vm.usage()));
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

/**
 * Factory Method
 */

module.exports = function(categoryModel) {
    var instance = Object.create(categoryViewModel);
    instance.init(categoryModel);
    return instance;
};
