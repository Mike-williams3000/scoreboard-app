var GM = StateMachine.create({
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
                CLOCK_MANAGER.ticker = setInterval(function()
															{
																CLOCK_MANAGER.runClocks();
                                                                app.test();
    
                                                            
																
															},100); //change this to set frequency of updates
            },
          
	    onjamRunning:  function(event, from, to, msg) { 
                CLOCK_MANAGER.subscribe("pClock");
                CLOCK_MANAGER._objClocks.jClock.reset();
                CLOCK_MANAGER.subscribe("jClock");
                
            },
	    onleavejamRunning:  function(event, from, to){ 
                CLOCK_MANAGER.unsubscribe("jClock");
            }, // stop jam clock
          
        onlineUp: function(){
                CLOCK_MANAGER._objClocks.lClock.reset();
                CLOCK_MANAGER.subscribe("lClock");
            },
        onleavelineUp: function()
            {
                CLOCK_MANAGER.unsubscribe("lClock");
            },
          
          
          
	    onteamTimeout: function(event, from, to){
                CLOCK_MANAGER.unsubscribe("pClock");
                CLOCK_MANAGER.subscribe("TTOClock");
            },
        onleaveteamTimeout: function(event, from, to){
                CLOCK_MANAGER.subscribe("TTOClock");
            },
        
	    onofficialtimeout:    function(event, from, to)   {
                CLOCK_MANAGER.unsubscribe("pClock");
                CLOCK_MANAGER.subscribe("TTOClock");
            },
        onleaveofficialTimeout: function(event, from, to){
                CLOCK_MANAGER.unsubscribe("TTOClock");
            },
  		}

});


GM.onbeforeevent = function(event, from, to, args)
					{
						console.log(event + " " + from  + " " + to + " " + args);
					};
CLOCK_MANAGER.createClocks();
