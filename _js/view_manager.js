var GAME_VIEW = 
	{
		handleEvent_jamRunning: function()
			{
				this.changeClass(HTML_MANAGER.outputs.lClock, "add", "hidden");

				this.changeClass(HTML_MANAGER.buttons.teamTimeout, "add", "hidden");
				this.changeClass(HTML_MANAGER.buttons.officialTimeout, "add", "hidden");

			},
		handleEvent_lineUp: function()
			{
				this.changeClass(HTML_MANAGER.outputs.lClock, "remove", "hidden");
			},
		handleEvent_timeout: function()
			{
				this.changeClass(HTML_MANAGER.buttons.teamTimeout, "remove", "hidden");
				this.changeClass(HTML_MANAGER.buttons.officialTimeout, "remove", "hidden");
			},

	
		 changeClass: function (element, addOrRemove, classToChange)
			{
				if (addOrRemove === "add")
					{
								console.log(element);
								element.classList.add(classToChange);
								console.log(element);
					}
				else 
					{
							element.classList.remove(classToChange);
					};
			}
	};
EM.register(GAME_VIEW);