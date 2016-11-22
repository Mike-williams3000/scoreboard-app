var util         = require("util");
var EventEmitter = require("events").EventEmitter;

var GAMEDATA =
{
    jamNum: 0,
    score:
        {
            home: 0,
            away:0
        },
    scoreTrackerHome:{}, //{1:[pass1, pass2...]} accesable by main and home score tracker
    scoreTrackerAway:{},
    lineUpTrackerHome:{}, //{1:[playerNumber1, playerNumber2...]}
    lineUpTrackerAway:{}, //main should be able to select from these for pictures

    
    
    addPoints: function(strTeam, intPoints)
    {
        this.score[strTeam] += intPoints;
        GAMEDATA.dataEvents.emit("scoreUpdate", this.getPoints())
    },
    
    setPoints: function (strTeam, intPoints){
        
        this.score[strTeam] = intPoints;
    },
    
    getPoints: function () {
        
        return this.score;
    },
    
    jamStart: function(){
        this.jamNum ++
        GAMEDATA.dataEvents.emit("jamNumUpdate", this.getJamNum())
    },
        
    jamNumUpDown: function(upDown){
        if (upDown == "up"){
            this.jamNum ++
        };
        if (upDown == "down"){
            this.jamNum --
        };
        GAMEDATA.dataEvents.emit("jamNumUpdate", this.getJamNum())
    },
        
    getJamNum: function(){
        return this.jamNum;
    },
    
    dataEvents: new EventEmitter()
    
    
}



module.exports = GAMEDATA;
// need to split this into data and functions, then write data as JSON to disk every (?) jam
