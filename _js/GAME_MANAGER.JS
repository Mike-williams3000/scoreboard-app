var GAME_MANAGER = {


	gameState: "preGame", //default start state
	handleEvent_gameStateChange: function(newState)
								{
									this.gameState = newState
								},
	preGame:{

			},
	lineUp:
		{

		},

	

	handleEvent_clockZero: function (clock)
		{
			switch (clock._strName)
				case "jClock" :
					if (this.gameState = "jamRunning")
					EM.trigger("gameStateChange", this.gameState);
					break;
		}
}
					EM.trigger("subscribe", CLOCK_MANAGER._objClocks[lClock]);
					this.gameState = "lineUp";