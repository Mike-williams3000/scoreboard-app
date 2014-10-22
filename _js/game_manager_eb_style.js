var GAME_MANAGER = {


	gameState: "preGame", //default start state
	EventBus.addEventListener("gameSetToLineUp", this.lineUp.init)
	handleEvent_gameStateChange: function(newState)
								{
									this.gameState = newState
								},
	preGame:{

			},
	lineUp:
		{
			init:function(previousState)
				{
					EventBus.removeEventListener("clock_zero");
					EventBus.addEventListener("clock_zero", this.clockZero);

				}
			clock_zero: function(_objClock)
				{
					//switch which lock, apply logic.
				}

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