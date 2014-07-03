
var layoutEngine = require('layout-engine');

var viewModel = require('./view-model');
var template = require('./template.html');
var regionHandler = require('./region-handler');

exports.init = function() {
    layoutEngine.registerHandler('popup', regionHandler);
    layoutEngine.configureRegion('popup', 'popup');
};

exports.show = function(foodModel, callback) {
    var vm = viewModel(foodModel, callback);
    layoutEngine.render(template, vm, 'popup');
    
    vm.subscribe('cancel', this.hide.bind(this));
};

exports.hide = function() {
    layoutEngine.getRegionHandler('popup').clearRegion();
};

// FAKE

//setTimeout(function() {
//    var foods = require('foods');
//    var food = foods.getCategoryById('fa').items[0];
//    exports.show(food, function() {
//        
//    });
//}, 10);

