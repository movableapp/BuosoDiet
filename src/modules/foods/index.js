/**
 * Business Domain Foods
 */

var mixinOnReady = require('jqb-onready').mixin;

var repository = require('./repository');
var categories = require('./categories');
var db = require('./db');

mixinOnReady(exports);

exports.init = function() {
    db.forEach(function(data) {
        var category = repository.getCategoryById(data.c);
        category.addItem(data);
    });
    this.onReady(true);
};

exports.getCategoryIds = function() {
    return categories.ids;
};

exports.getCategoryById = repository.getCategoryById.bind(repository);

exports.getCategoryLabel = categories.getLabel;
