
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


/**
 * Factory Method
 */

module.exports = function(categoryModel) {
    var instance = Object.create(categoryViewModel);
    instance.init(categoryModel);
    return instance;
};
