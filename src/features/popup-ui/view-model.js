
var mixinSubscribable = require('utils/subscribable').mixin;

var logInputViewModel = {
    init: function(foodModel, callback) {
        this.foodModel = foodModel;
        this.callback = callback;
        
        this.name = this.foodModel.name;
        this.inputQt = ko.observable();
        
        this.unitQt = ko.observable();
        this.dailyQt = ko.observable();
        this.availableQt = ko.observable();
        
        this.afterQt = ko.computed(function() {
            var op1 = this.availableQt() || 0;
            var op2 = parseFloat(this.inputQt()) || 0;
            return round(op1 - op2);
        }, this);
        
        this.inputUnits = ko.computed(function() {
            return round(this.inputQt() / this.unitQt(), true);
        }, this);
        
        this.displayUnitQt = ko.computed(function() {
            return round(this.unitQt()) + this.foodModel.unit;
        }, this);
        
        this.displayDailyQt = ko.computed(function() {
            return round(this.dailyQt()) + this.foodModel.unit;
        }, this);
        
        this.displayAvailableQt = ko.computed(function() {
            return round(this.availableQt()) + this.foodModel.unit;
        }, this);
        
        this.displayAfterQt = ko.computed(function() {
            return round(this.afterQt()) + this.foodModel.unit;
        }, this);
        
        this.update();
        this.foodModelSubscription = this.foodModel.subscribe('update', this.update.bind(this));
    },
    dispose: function() {
        this.foodModelSubscription.dispose();
        this.afterQt.dispose();
        this.inputUnits.dispose();
        this.afterQt.dispose();
        this.inputUnits.dispose();
        this.displayUnitQt.dispose();
        this.displayUnitQt.dispose();
        this.displayDailyQt.dispose();
        this.displayAvailableQt.dispose();
        this.displayAfterQt.dispose();
    },
    update: function() {
        this.unitQt(this.foodModel.amountPerUnit);
        this.dailyQt(this.foodModel.dailyQt);
        this.availableQt(this.foodModel.availableQt);
    },
    save: function() {
        this.callback(this.inputQt());
    },
    cancel: function() {
        this.publish('cancel');
    }
};

mixinSubscribable(logInputViewModel);

module.exports = function(foodModel, callback) {
    var _ = Object.create(logInputViewModel);
    _.init(foodModel, callback);
    return _;
};

function round(num, decimals) {
    if (isNaN(num)) {
        return 0;
    }
    if (decimals === true) {
        return Math.round(num * 100) / 100;
    } else {
        return Math.round(num);
    }
}

