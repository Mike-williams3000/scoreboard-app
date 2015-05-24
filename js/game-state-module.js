var state_machine = require('javascript-state-machine');
var timerMod = require('./timer-test-module.js');
var GM = state_machine.create({
	initial: 'gameReady', //for testing, 
	events: [
	    { name: 'gameStart', from: 'preGame', to: 'gameReady' },
	    { name: 'callOTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,  to: 'officialTimeout'      },
	    { name: 'callTTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,     to: 'teamTimeout'      },
	    { name: 'startJam',from: ['gameReady', 'lineUp', 'teamTimeout', 'officialTimeout'], to: 'jamRunning'    },
	    { name: 'stopJam',from: 'jamRunning', to: 'lineUp'    }
		],
    callbacks: {
        
	    onleavegameReady:  function(event, from, to, msg) {
             
            },
          
	    onjamRunning:  function(event, from, to, msg) { 
                timerMod.objClocks.pClock.start();
                timerMod.objClocks.jClock.reset();
                timerMod.objClocks.jClock.start();
                
            },
	    onleavejamRunning:  function(event, from, to){ 
                timerMod.objClocks.jClock.stop();
            }, // stop jam clock
          
        onlineUp: function(){
                timerMod.objClocks._objClocks.lClock.reset();
                timerMod.objClocks.lClock.start();
            },
        onleavelineUp: function()
            {
                timerMod.objClocks.lClock.stop();
            },
          
          
          
	    onteamTimeout: function(event, from, to){
                timerMod.objClocks.pClock.stop();
                timerMod.objClocks.TTOClock.start();
            },
        onleaveteamTimeout: function(event, from, to){
                timerMod.objClocks.TTOClock.start();
            },
        
	    onofficialtimeout:    function(event, from, to)   {
                timerMod.objClocks.pClock.stop();
                timerMod.objClocks.TTOClock.start();
            },
        onleaveofficialTimeout: function(event, from, to){
                timerMod.objClocks.TTOClock.stop();
            }
  		}

});


GM.onbeforeevent = function(event, from, to, args)
					{
						console.log(event + " " + from  + " " + to + " " + args);
					};
module.exports = GM;

