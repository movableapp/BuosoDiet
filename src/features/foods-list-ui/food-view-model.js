
var popupUi = require('popup-ui');

var foodViewModel = {
    init: function(foodModel) {
        this.model = foodModel;
        this.name = this.model.name;
        
        this.unitQt = ko.observable();
        this.dailyQt = ko.observable();
        this.availableQt = ko.observable();
        
        this.displayUnitQt = ko.computed(function() {
            return this.unitQt() + this.model.unit;
        }, this);
        
        this.displayDailyQt = ko.computed(function() {
            return this.dailyQt() + this.model.unit;
        }, this);
        
        this.displayAvailableQt = ko.computed(function() {
            return this.availableQt() + this.model.unit;
        }, this);
        
        this.updateUnits();
        this.modelSubscription = this.model.subscribe('update', this.updateUnits.bind(this));
        
    },
    dispose: function() {
        this.displayUnitQt.dispose();
        this.displayDailyQt.dispose();
        this.displayAvailableQt.dispose();
        this.modelSubscription.dispose();
    },
    populate: function() {
        console.log('POPULATE', this.model);
    },
    updateUnits: function() {
        this.unitQt(this.model.amountPerUnit);
        this.dailyQt(this.model.dailyQt);
        this.availableQt(this.model.availableQt);
    },
    addLog: function() {
        var self = this;
        popupUi.show(this.model, function(qt) {
            self.model.log(qt);
            popupUi.hide();
        });
    }
};


module.exports = function(foodModel) {
    var _ = Object.create(foodViewModel);
    _.init(foodModel);
    return _;
};
