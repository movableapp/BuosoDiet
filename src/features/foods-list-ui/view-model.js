
var foods = require('foods');

var createCategoryModel = require('./category-view-model');

var listViewModel = {
    init: function() {
        this.categories = ko.observableArray();
        foods.onReady(this.populate.bind(this));
    },
    dispose: function() {
        this.categories().forEach(function(category) {
            category.dispose();
        });
    },
    populate: function() {
        var categories = this.categories();
        foods.getCategoryIds().forEach(function(id) {
            var category = createCategoryModel(foods.getCategoryById(id));
            category.populate();
            categories.push(category);
        });
        this.categories.valueHasMutated();
    }
};

module.exports = function() {
    var _ = Object.create(listViewModel);
    _.init();
    return _;
};
