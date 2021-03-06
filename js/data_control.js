var timerMod = require('./timer-test-module.js');
var state = require('./game-state-module.js');
var data = require('./data.js');
var GAMEDATA = require('./game_data.js');
var EventEmitter = require("events").EventEmitter;
var dataController = new EventEmitter()

var Datastore = require('nedb')
  , db = new Datastore({ filename: './datastore' });
db.loadDatabase(function (err) {    // Callback is optional
  console.log("db loaded");
});

state.emitter.on('update', function(){
    var currentState = state.current;
    var currentTimes = timerMod.getAllTimers();
    var currentPoints = GAMEDATA.getPoints();
    var currentJamNum = GAMEDATA.getJamNum();
    var id = Date.now();
    var dataDoc = {
        id:id,
        currentState:currentState,
        currentTimes:currentTimes,
        currentPoints:currentPoints,
        currentJamNum:currentJamNum
    };
    data.push([id, currentState, currentTimes, currentPoints, currentJamNum])
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

dataController.loadValuesFromDB = function (N){
    N = N ? N : 1;
    db.find().sort({_id:1}).limit(1).exec(function(err, docs){
                    
        console.log(docs[0].currentTimes);
        for (var i in docs[0].currentTimes){
            if (timerMod.objClocks.hasOwnProperty(i)){
                timerMod.objClocks[i].ms = docs[0].currentTimes[i]; //not clock.reset() as this sets the time to reset to
            };
        for (var j in docs[0].currentPoints ){
            if (GAMEDATA.score.hasOwnProperty(j)){
                GAMEDATA.score[j] = docs[0].currentPoints[j];
            };
        }
        if (docs[0].hasOwnProperty("currentJamNumber")){
            GAMEDATA.jamNum = docs[0].currentJamNum;
        };
    
        };
    });
    dataController.emit('DBValuesLoaded');
};




module.exports = dataController;
console.log(dataController);


