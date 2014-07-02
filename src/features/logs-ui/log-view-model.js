
var logViewModel = {
    init: function(logModel) {
        this.model = logModel;
        this.name = this.model.name;
        this.units = round(this.model.units, true);
        this.qt = round(this.model.qt) + this.model.unit.toString();
    },
    dispose: function() {}
};

module.exports = function(logModel) {
    var instance = Object.create(logViewModel);
    instance.init(logModel);
    return instance;
};

function round(num, decimals) {
    if (isNaN(num)) {
        return 0;
    }
    if (decimals === true) {
        return Math.round(num * 100) / 100;
    } else {
        return Math.round(num);
    }
}
