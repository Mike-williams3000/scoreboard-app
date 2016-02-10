var state_machine = require('javascript-state-machine');
var timerMod = require('./timer-test-module.js');
var GM = state_machine.create({
	initial: 'gameReady', //for testing, 
	events: [
	    { name: 'gameStart', from: 'preGame', to: 'gameReady' },
	    { name: 'callOTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,  to: 'officialTimeout'      },
	    { name: 'callTTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,     to: 'teamTimeout'      },
	    { name: 'startJam',from: ['gameReady', 'lineUp', 'teamTimeout', 'officialTimeout'], to: 'jamRunning'    },
	    { name: 'stopJam',from: 'jamRunning', to: 'lineUp'    },
        { name: 'startLineUp', from:'*', to: 'lineUp' }
		],
    callbacks: {
        
	    onleavegameReady:  function(event, from, to, msg) {
             
            },
          
	    onjamRunning:  function(event, from, to, msg) { 
               if (timerMod.objClocks.pClock.runTimer == false) 
                   {
                       timerMod.objClocks.pClock.start();
                   };
                timerMod.objClocks.jClock.reset();
                timerMod.objClocks.jClock.start();
                
            },
	    onleavejamRunning:  function(event, from, to){ 
                timerMod.objClocks.jClock.stop();
            }, // stop jam clock
          
        onlineUp: function(){
                timerMod.objClocks.lClock.reset();
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
        
	    onofficialTimeout:    function(event, from, to)   {
                timerMod.objClocks.pClock.stop();
                timerMod.objClocks.OTOClock.start();
            },
        onleaveofficialTimeout: function(event, from, to){
                timerMod.objClocks.TTOClock.stop();
            }
  		}

});
timerMod.objClocks.lClock.on('done', function()
                            {
                                console.log('line up clock done')
                                if (GM.automate == true)
                                {
                                    GM.startJam();
                                };
                            }
                            );

timerMod.objClocks.jClock.on('done', function()
                            {
                                console.log('Jam clock done')
                                if (GM.automate == true)
                                {
                                    GM.stopJam();
                                };
                            }
                            );
timerMod.objClocks.pClock.on('almostdone', function()
                            {
                                console.log('last 30 seconds')
                                GM.automate = false;
                            }
                            );
timerMod.objClocks.TTOClock.on('done', function()
                            {
                                console.log('TTO clock done')
                                if (GM.automate == true)
                                {
                                    GM.startLineUp();
                                };
                            }
                            );
GM.automate = true;
GM.onbeforeevent = function(event, from, to, args)
					{
						console.log(event + " " + from  + " " + to + " " + args);
                       // return false; canceles the event
					};
module.exports = GM;

