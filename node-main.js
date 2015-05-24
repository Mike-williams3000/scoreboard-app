var state = require('./js/game-state-module.js');
var timerMod = require('./js/timer-test-module.js');
var server = require('./server.js');
module.exports.state = state;
module.exports.clocks = timerMod;
timerMod.createClocks();