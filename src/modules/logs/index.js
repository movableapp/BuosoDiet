
var mixinSubscribable = require('utils/subscribable').mixin;
var mixinOnReady = require('jqb-onready').mixin;

var repository = require('./repository');
var storage = require('./storage');
var logModel = require('./log-model');





// cache table of logged amounts
var categories = {};

mixinSubscribable(exports);
mixinOnReady(exports);

exports.init = function() {
    var self = this;
    storage.load(function(data) {
        data.forEach(function(logData) {
            pushLog(self, logModel.createFromData(logData));
        });
        self.publish('logs-data-ready');
        self.onReady(true);
    });
};

exports.getAll = repository.getLogs.bind(repository);

exports.add = function(food, units, qt) {
    pushLog(this, logModel.createFromModel(food, units, qt));
    storage.save(repository.serialize());
};

exports.reset = function() {
    var self = this;
    repository.reset();
    Object.keys(categories).forEach(function(categoryId) {
        var categoryLoggedQt = updateCategoryById(categoryId);
        self.publish('logged-units-changed:' + categoryId, categoryLoggedQt);
    });
    self.publish('reset');
    
    storage.save(repository.serialize());
};

exports.getUnitsByCategoryId = function(id) {
    if (categories[id] !== undefined) {
        return categories[id];
    } else {
        return updateCategoryById(id);
    }
};

/**
 * Update the internal cache table for a single category.
 */
function updateCategoryById(categoryId) {
    categories[categoryId] = 0;
    var amounts = repository.getLogs().filter(function(log) {
        return log.getCategoryName() === categoryId;
    }).forEach(function(log) {
        categories[categoryId] += log.units;
    });
    return categories[categoryId];
};


function pushLog(self, log) {
    repository.add(log);
    self.publish('logged-units-changed:' + log.category, updateCategoryById(log.category));
    self.publish('log-added', log);
}
