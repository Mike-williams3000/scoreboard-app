var timerMod = require('./js/timer-test-module.js');
timerMod.createClocks();
var state = require('./js/game-state-module.js');

//var database = require('./js/database.js');

var server = require('./server.js');




        
    
    
module.exports.state = state;
module.exports.clocks = timerMod;
