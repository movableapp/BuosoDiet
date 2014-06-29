
var router = require('router');
var layoutEngine = require('layout-engine');

var headerUi = require('header-ui');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.init = function(config) {
    router.on('/logs', function() {
        headerUi.setTitle('Logs');
        layoutEngine.render(template, viewModel());
    });
};
