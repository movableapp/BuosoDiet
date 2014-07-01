
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
            var op2 = parseInt(this.inputQt()) || 0;
            return op1 - op2;
        }, this);
        
        this.update();
        this.foodModelSubscription = this.foodModel.subscribe('update', this.update.bind(this));
    },
    dispose: function() {
        this.foodModelSubscription.dispose();
        this.afterQt.dispose();
    },
    update: function() {
        this.unitQt(this.foodModel.amountPerUnit);
        this.dailyQt(this.foodModel.dailyQt);
        this.availableQt(this.foodModel.availableQt);
    },
    save: function() {
        this.callback(this.inputQt());
    }
};

module.exports = function(foodModel, callback) {
    var _ = Object.create(logInputViewModel);
    _.init(foodModel, callback);
    return _;
};
