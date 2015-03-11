var GAME_MANAGER = {


	gameState: "preGame", //default start state
	previousState: null,
	arrTimeOutTypeButtons:document.getElementsByClassName("timeoutType"),
	handleEvent_gameStateChange: function(args)
								{
									GAME_MANAGER.previousState = GAME_MANAGER.gameState;
									GAME_MANAGER.gameState = args[0];
									EM.trigger("stateExit")
									console.log("gamestate   " + this.gameState)
									this[args[0]].init(GAME_MANAGER.previousState, args[1]);
									EM.trigger(args[0]);
								},
	preGame:{
				init: function()
					{
						this.createClocks();
						//LOADCTRLBUTTONS(CONTROLS);
						EM.trigger("subscribe", ["totalGameTime"]);
						localStorage.setItem("homeScore", "0")
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
							var _objCurrClock = new Clock(
									OBJ_CLOCK_DEFAULTS[_clock]._strName,
									OBJ_CLOCK_DEFAULTS[_clock]._intDefalutMS,
									OBJ_CLOCK_DEFAULTS[_clock]._booRunPastZero
								);
							CLOCK_MANAGER._objClocks[OBJ_CLOCK_DEFAULTS[_clock]._strName] = _objCurrClock;	

						};
					},

				handleEvent_stateExit: function()
				{

				}

			},


	lineUp:
		{
			init:function(_strPreviousState)
				{
					CLOCK_MANAGER._objClocks.lClock.reset();
					EM.unregister(GAME_MANAGER[_strPreviousState]);
					EM.register(this);
					EM.trigger("subscribe", ["lClock"]);



				},

			handleEvent_clockZero: function (_objClock)
				{
					switch (_objClock._strClockName)
						{
						case "lClock" :
							EM.trigger("gameStateChange", ["jamRunning"]);
							break;
						case "pClock":
							EM.trigger("gameStateChange", ["endGame"]);
							break;
						default :
							break;
						}
				},
			hadnleEvent_stateExit: function ()
				{

				}
		},

	jamRunning:
		{

			init:function(_strPreviousState)
				{
					CLOCK_MANAGER._objClocks.jClock.reset();
					EM.unregister(GAME_MANAGER[_strPreviousState]);
					EM.register(this);
					//reset jam clock
					EM.trigger("runJam");



				},
			handleEvent_runJam: function()
				{
					if (!CLOCK_MANAGER._objRunningClocks.hasOwnProperty("pClock"))
						{
							EM.trigger("subscribe", ["pClock"]);
						};

					if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("lClock"))
						{
							EM.trigger("unsubscribe", ["lClock"]);
						};

					EM.trigger("subscribe", ["jClock"]);
				},
			handleEvent_clockZero: function(_objClock)
				{
					switch (_objClock._strClockName)
						{
						case "jClock" :
							EM.trigger("unsubscribe", ["jClock"])
							EM.trigger("gameStateChange", ["lineUp"]);
							break;
						case "pClock":
							EM.trigger("gameStateChange", ["endGame"]);
							break;	
						}
				},
			


			handleEvent_jamEnd: function()
				{
					EM.trigger("unsubscribe", ["jClock"]);
					// display last jam totals?
					EM.trigger("gameStateChange", ["lineUp"]);
				},

			hadnleEvent_stateExit: function ()
				{

				}
		},

	officialTimeout:
		{
			timeoutState:null,

			init:function(_strPreviousState)
				{
					if (GAME_MANAGER.gamestate != "officialTimeout")
					{
						CLOCK_MANAGER._objClocks.genericTimeoutClock.reset();
						EM.unregister(GAME_MANAGER[_strPreviousState]);
						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("pClock"))
							{
								EM.trigger("unsubscribe", ["pClock"]);
							};

						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("lClock"))
							{
								EM.trigger("unsubscribe", ["lClock"]);
							};
						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("jClock"))
							{
								EM.trigger("unsubscribe", ["jClock"]);
							};
						if (!CLOCK_MANAGER._objRunningClocks.hasOwnProperty("genericTimeoutClock"))
							{
								EM.trigger("subscribe", ["genericTimeoutClock"]);
							};
						EM.register(this);
					}
					



				},
			handleEvent_stateExit: function ()
				{
					EM.trigger("timeoutExit");
					if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("genericTimeoutClock"))
							{
								EM.trigger("unsubscribe", ["genericTimeoutClock"]);
							}
				}
		},

		teamTimeout: 
			{
				teamName:null,
				init:function(_strPreviousState, arrArgs)
					{
						this.teamName= arrArgs[1];
						
						CLOCK_MANAGER._objClocks.teamTimeoutClock.reset();
						EM.unregister(GAME_MANAGER[_strPreviousState]);
						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("pClock"))
							{
								EM.trigger("unsubscribe", ["pClock"]);
							};

						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("lClock"))
							{
								EM.trigger("unsubscribe", ["lClock"]);
							};
						if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty("jClock"))
							{
								EM.trigger("unsubscribe", ["jClock"]);
							};
						if (!CLOCK_MANAGER._objRunningClocks.hasOwnProperty("teamTimeoutClock"))
							{
								EM.trigger("subscribe", ["teamTimeoutClock"]);
							};
						EM.register(this);
					},

				handleEvent__clockZero: function(_objclock)
					{
						if (_objclock = "teamTimeoutClock")
							{
								EM.trigger("gameStateChange", ["lineUp"])
							};
					},
				handleEvent_stateExit: function()
					{
						EM.trigger("unsubscribe", ["teamTimeoutClock"])
					}

					

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
							EM.trigger("gameStateChange", ["gameOver"]);
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
		},

	toggleHotKeys:function()
		{
			if (!document.onkeydown)	
				{
					document.addEventListener("keydown", function(e) {KEYMAP.keyEvent(e)});
				}
			else
				{
					document.removeEventListener("keydown", function(e) {KEYMAP.keyEvent(e)});
				};
		}


				
		

		
};
EM.register(GAME_MANAGER);

function ClockType(_strWhatClockType)
{
	this.strClockType = _strWhatClockType;
}