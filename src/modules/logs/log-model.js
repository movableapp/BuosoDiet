
var logModel = {
    init: function(foodName, categoryId, qt) {
        this.name = foodName;
        this.category = categoryId;
        this.qt = qt;
    },
    dispose: function() {},
    getCategoryName: function() {
        return this.category;
    },
    getData: function() {
        return {
            n: this.name,
            c: this.category,
            q: this.qt
        };
    }
};

exports.createFromModel = function(food, qt) {
    var _ = Object.create(logModel);
    _.init(food.name, food.categoryId, qt);
    return _;
};

exports.createFromData = function(data) {
    var _ = Object.create(logModel);
    _.init(data.n, data.c, data.q);
    return _;
};
