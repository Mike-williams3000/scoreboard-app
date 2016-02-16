var timerMod = require('./timer-test-module.js');
var state = require('./game-state-module.js');
var data = require('./data.js');
var GAMEDATA = require('./game_data.js');
var EventEmitter = require("events").EventEmitter;
dataController = new EventEmitter()

var Datastore = require('nedb')
  , db = new Datastore({ filename: './datastore' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

state.emitter.on('update', function(){
    var currentState = state.current;
    var currentTimes = timerMod.getAllTimers();
    var currentPoints = GAMEDATA.getPoints();
    var id = Date.now();
    var dataDoc = {
        id:id,
        currentState:currentState,
        currentTimes:currentTimes,
        currentPoints:currentPoints
    };
    data.push([id, currentState, currentTimes, currentPoints])
    console.log(data);
    
    db.insert(dataDoc, function(err, newDoc){
        if(err)
            {
                console.log(err + "  db error");
            }
        else
            {
                console.log("database write" + newDoc )
            };
    })
});





module.exports = dataController;


