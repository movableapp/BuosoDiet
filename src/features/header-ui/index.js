
var layoutEngine = require('layout-engine');

var createViewModel = require('./view-model');
var template = require('./template.html');

var viewModel;

exports.init = function() {
    viewModel = createViewModel();
};

exports.start = function(config) {
    layoutEngine.render(template, viewModel, 'header');
};

exports.reset = function(config) {
    viewModel.reset(config);
};

exports.hide = function() {
    viewModel.isHidden(true);
};

exports.show = function() {
    viewModel.isHidden(false);
};
