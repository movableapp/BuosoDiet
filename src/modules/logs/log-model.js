
var logModel = {
    init: function(data) {
        this.name = data.name;
        this.category = data.category;
        this.units = data.units;
        this.qt = data.qt;
        this.unit = data.unit;
    },
    dispose: function() {},
    getCategoryName: function() {
        return this.category;
    },
    getData: function() {
        return {
            name: this.name,
            category: this.category,
            units: this.units,
            qt: this.qt,
            unit: this.unit
        };
    }
};

exports.createFromModel = function(food, units, qt) {
    var instance = Object.create(logModel);
    instance.init({
        name: food.name, 
        category: food.categoryId, 
        units: units, 
        qt: qt,
        unit: food.unit
    });
    return instance;
};

exports.createFromData = function(data) {
    var instance = Object.create(logModel);
    instance.init(data);
    return instance;
};
