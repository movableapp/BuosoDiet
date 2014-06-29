
var foodViewModel = require('./food-view-model');

var categoryViewModel = {
    init: function(categoryModel) {
        this.model = categoryModel;
        this.label = this.model.label;
        this.foods = ko.observableArray();
    },
    dispose: function() {
        this.foods().forEach(function(food) {
            food.dispose();
        });
    },
    populate: function() {
        var foods = this.foods();
        this.model.items.forEach(function(foodModel) {
            foods.push(foodViewModel(foodModel));
        });
        this.foods.valueHasMutated();
    }
};

module.exports = function(categoryModel) {
    var _ = Object.create(categoryViewModel);
    _.init(categoryModel);
    return _;
};
