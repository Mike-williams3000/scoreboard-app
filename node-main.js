var timerMod = require('./js/timer-test-module.js');
timerMod.createClocks();
var state = require('./js/game-state-module.js');
module.exports.state = state;
module.exports.clocks = timerMod;
var server = require('./server.js');
