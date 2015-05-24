var state_machine = require('javascript-state-machine');
var something = require('./timer_test_module.js');
var GM = state_machine.create({
	initial: 'gameReady', //for testing, 
	events: [
	    { name: 'gameStart', from: 'preGame', to: 'gameReady' },
	    { name: 'callOTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,  to: 'officialTimeout'      },
	    { name: 'callTTO', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,     to: 'teamTimeout'      },
	    { name: 'startJam',from: ['gameReady', 'lineUp', 'teamTimeout', 'officialTimeout'], to: 'jamRunning'    },
	    { name: 'stopJam',from: 'jamRunning', to: 'lineUp'    }
		]

});


GM.onbeforeevent = function(event, from, to, args)
					{
						console.log(event + " " + from  + " " + to + " " + args);
					};
//CLOCK_MANAGER.createClocks();
module.exports = GM;
