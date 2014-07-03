
var foods = require('foods');

var createCategoryModel = require('./category-view-model');

var listViewModel = {
    init: function() {
        this.filter = ko.observable('').extend({rateLimit:1000});
        this.categories = ko.observableArray();
        this.filteredCategories = ko.computed(computedFilteredCategories, this);
        this.filteredCount = ko.computed(computedFilteredCount, this);
        foods.onReady(this.populate.bind(this));
    },
    dispose: function() {
        this.categories().forEach(function(category) {
            category.dispose();
        });
        this.filteredCategories.dispose();
        this.filteredCount.dispose();
    },
    populate: function() {
        var categories = this.categories();
        foods.getCategoryIds().forEach(function(id) {
            var category = createCategoryModel(foods.getCategoryById(id));
            category.populate();
            categories.push(category);
        });
        this.categories.valueHasMutated();
    },
    resetFilter: function() {
        this.filter('');
    }
};

function computedFilteredCategories() {
    var filter = this.filter();
    var categories = this.categories();
    
    // reset filter
    if (!filter.length) {
        categories.forEach(function(category) {
            category.filter('');
        });
        return categories;
    }
    
    // apply filter
    return categories.filter(function(category) {
        category.filter(filter);
        return category.isVisible();
    });
}

function computedFilteredCount() {
    var count = 0;
    this.filteredCategories().forEach(function(category) {
        count += category.filteredCount();
    });
    return count;
}



/**
 * Factory Method
 */

module.exports = function() {
    var instance = Object.create(listViewModel);
    instance.init();
    return instance;
};
