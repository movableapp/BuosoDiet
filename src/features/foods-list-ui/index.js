// Feature: foods-list-ui

var router = require('router');
var layoutEngine = require('layout-engine');

var headerUi = require('header-ui');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.init = function(config) {
    router.on('/', function() {
        headerUi.reset({
            title: 'BuosoDiet',
            leftBtn: {
                show: '<small>Settings</small>',
                url: '/settings'
            },
            rightBtn: {
                show: 'Logs',
                url: '/logs'
            }
        });
        layoutEngine.render(template, viewModel());
    });
};
