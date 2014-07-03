/**
 * PoliteJS Worspace - Single Page App Builder
 * ===========================================
 * 
 * 
 */

require('jqb-ko-fastclick');

var features = [/*FEATURES*/];


/**
 * Export `require()` to the global namespace
 */
window.require = require;

/**
 * Setup Cogwheels
 */
window.cogwheels = require('cogwheels');
window.cogwheels.features = features;

/**
 * Manual Startup
 */
require('foods').init();
require('settings').init();
require('logs').init();