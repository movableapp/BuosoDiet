
var createCategoryModel = require('./category-model');

var data = {};

exports.getCategoryById = function(id) {
    var category = data[id] || this.createCategoryById(id);
    return category;
};

exports.createCategoryById = function(id) {
    var category = createCategoryModel(id);
    data[id] = category;
    return category;
};
