
var router = require('router');
var layoutEngine = require('layout-engine');

var headerUi = require('header-ui');

var viewModel = require('./view-model');
var template = require('./template.html');

exports.init = function(config) {
    router.on('/settings', function() {
        headerUi.reset({
            title: 'Settings',
            leftBtn: {
                show: '&laquo; Back',
                url: '/'
            },
            rightBtn: false
        });
        layoutEngine.render(template, viewModel());
    });
};
