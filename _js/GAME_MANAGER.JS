var GAME_MANAGER = {


	gameState: "preGame", //default start state
	handleEvent_gameStateChange: function(newState)
								{
									this.gameState = newState;
									console.log("gamestate   " + this.gameState)
									this[newState].init();
								},
	preGame:{
				init: function()
					{
						this.createClocks();
						EM.trigger("subscribe", CLOCK_MANAGER._objClocks.totalGameTime);
						CLOCK_MANAGER.ticker = setInterval(function()
															{
																CLOCK_MANAGER.handleEvent_runClocks();
																CLOCK_MANAGER.handleEvent_updateHTML();


															},100); //change this to set frequency of updates
						
					},

				createClocks: function()
					{
					for(var _clock in OBJ_CLOCK_DEFAULTS)
						{
							var _objCurrClock = new Clock(OBJ_CLOCK_DEFAULTS[_clock]._strName, OBJ_CLOCK_DEFAULTS[_clock]._intDefalutMS, OBJ_CLOCK_DEFAULTS[_clock]._booRunPastZero);
							CLOCK_MANAGER._objClocks[OBJ_CLOCK_DEFAULTS[_clock]._strName] = _objCurrClock;	

						};
					},

			},


	lineUp:
		{
			init:function(_objPreviousState)
				{
					EM.unregister(_objPreviousState);
					EM.register(this.lineUp);


				},

			handleEvent_clockZero: function (_objclock)
				{
					switch (_objclock._strName)
						{
						case "lClock" :
							EM.trigger("gameStateChange", "jamRunning");
							break;
						case "pClock":
							EM.trigger("gameStateChange", "endGame");
							break;
						}
				}
		},

	jamRunning:
		{

			init:function(_objPreviousState)
				{
					EM.unregister(_objPreviousState);
					EM.register(this);
					//reset jam clock
					EM.trigger("runJam");


				},
			handleEvent_runJam: function()
				{
					if (!CLOCK_MANAGER._objRunningClocks.hasOwnProperty("pClock"))
						{
							EM.trigger("subscribe", (CLOCK_MANAGER._objClocks.pClock));
						};

					EM.trigger("subscribe", CLOCK_MANAGER._objClocks.jClock);
				},
			handleEvent_clockZero: function(_objClock)
				{
					switch (_objClock._strName)
						{
						case "jClock" :
							Em.triger("unsubscribe",  CLOCK_MANAGER._objClocks.jClock)
							EM.trigger("gameStateChange", "lineUp");
							break;
						case "pClock":
							EM.trigger("gameStateChange", "endGame");
							break;	
						}
				},
		},

	endGame: 
		{
			init: function()
				{
				EM.unregister(_objPreviousState);
				EM.register(this.endGame);

				},

			handleEvent__clockZero:function()
				{
					switch (_objclock._strName)
						{
						case "jClock" :
							Em.triger("unsubscribe",  CLOCK_MANAGER._objClocks.jClock);
							break;
						case "pClock":
							EM.trigger("gameStateChange", "gameOver");
							break;	
						}
				}
		},

	gameOver: 
		{

			init:function(_objPreviousState)
				{
					EM.unregister(_objPreviousState);
					

				},
			//do nothing until user confirm!!!!!! 
			handleEvent_confirmGameOver:function()
				{
					//set Final Score page, stop clocks, log everything, go to pub. 
				}
		}


				
		

		
};
EM.register(GAME_MANAGER);			