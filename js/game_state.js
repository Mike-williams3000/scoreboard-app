var GM = StateMachine.create({
	initial: 'preGame',
	events: [
	    { name: 'gameStart', from: 'preGame', to: 'gameReady' },
	    { name: 'callOfficialTimeout', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,  to: 'officialTimeout'      },
	    { name: 'callTeamTimeout', from: ['lineUp', 'teamTimeout', 'officialTimeout'] ,     to: 'TeamTimeout'      },
	    { name: 'startJam',from: ['gameReady', 'lineUp', 'teamTimeout', 'officialTimeout'], to: 'jamRuning'    },
	    { name: 'stopJam',from: 'jamRnning', to: 'lineUp'    }
		],
	  callbacks: {
	    ongameStart:  function(event, from, to, msg) {},// change display to normal scoreboard
	    onstartJam:  function(event, from, to, msg) {  },// check pivot clock is running/start, reset jam clock start jam clock
	    onstopJam:  function(event, from, to)      {   }, // stop jam clock
	    oncallTeamTimeout: function(event, from, to)      {},
	    oncallOfficialtimeout:    function(event, from, to)   {} 
  		}

});
GM.onbeforeevent = function(event, from, to, args)
					{
						console.log(event + from + to + args);
					}