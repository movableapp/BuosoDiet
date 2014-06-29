
var layoutEngine = require('layout-engine');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.start = function(config) {
    layoutEngine.render(template, viewModel(), 'footer');
};
