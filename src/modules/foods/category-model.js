
var mixinSubscribable = require('utils/subscribable').mixin;
var createFoodModel = require('./food-model');
var categories = require('./categories');

var categoryModel = {
    init: function(id) {
        this.id = id;
        this.label = categories.getLabel(this.id);
        this.items = [];
        mixinSubscribable(this);
    },
    dispose: function() {},
    addItem: function(data) {
        var item = createFoodModel(this, data);
        this.items.push(item);
        this.publish('added-item', item);
    }
};

module.exports = function(id) {
    var _ = Object.create(categoryModel);
    _.init(id);
    return _;
};
