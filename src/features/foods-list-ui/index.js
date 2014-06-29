// Feature: foods-list-ui

var router = require('router');
var layoutEngine = require('layout-engine');

var headerUi = require('header-ui');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.init = function(config) {
    router.on('/', function() {
        headerUi.reset();
        layoutEngine.render(template, viewModel());
    });
};

