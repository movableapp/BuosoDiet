
var layoutEngine = require('layout-engine');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.show = function(foodModel, callback) {
    layoutEngine.render(template, viewModel(foodModel, callback), 'popup');
};

exports.hide = function() {
    layoutEngine.getRegionHandler('popup').clearRegion();
};
