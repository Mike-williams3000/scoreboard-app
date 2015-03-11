var GAME_MANAGER = {


	gameState: "preGame", //default start state
	previousState: null,
	arrTimeOutTypeButtons:document.getElementsByClassName("timeoutType"),

	gamestateLogic:
		{
			timeout:
				{
					init:function(_strPreviousState)
					{
						CLOCK_MANAGER._objClocks.genericTimeOutClock.reset();
						
						
					},
					clocksToUnsubscribe:["pclock", "jclock", "lClock"],
					clocksToSubscribe:["genericTimeoutClock"],
					eventsToFire:[],
					eventsListners:
						{
							clockZero: 
								{
									jclock:
										{
											strName:"jclock",
											eventToFire:EM.trigger("gameStateChange", "lineUp")
										}
								}
						}
			
					stateExitEvents[]
				}
		}
	
	handleEvent_gameStateChange: function(newState)
								{
									GAME_MANAGER.previousState = GAME_MANAGER.gameState;
									GAME_MANAGER.gameState = newState;
									EM.trigger("stateExit")
									console.log("gamestate   " + this.gameState)
									this[newState].init(GAME_MANAGER.previousState);
									EM.trigger(newState);
								},



}