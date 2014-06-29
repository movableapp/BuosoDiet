
var layoutEngine = require('layout-engine');

var viewModel = require('./view-model')();
var template = require('./template.html');

exports.start = function(config) {
    layoutEngine.render(template, viewModel, 'header');
};

exports.setTitle = function(title) {
    viewModel.title(title);
    viewModel.backUrl('/');
};

exports.reset = function() {
    viewModel.reset();
};
