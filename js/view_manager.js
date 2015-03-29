var GAME_VIEW = 
	{
		objVisibleOutputs:{},
		setVisible:function(output, booVisible)
			{
				if (booVisible == true)
					{
						if (GAME_VIEW.objVisibleOutputs.hasOwnProperty(output) = false)
							{
								
							}
						
					}
				
			},

		handleEvent_jamRunning: function()
			{
				this.changeClass(HTML_MANAGER.outputs.lClock, "add", "hidden");

				/*this.changeClass(HTML_MANAGER.buttons.teamTimeout, "add", "hidden");
				this.changeClass(HTML_MANAGER.buttons.officialTimeout, "add", "hidden");*/

			},
		handleEvent_lineUp: function()
			{
				this.changeClass(HTML_MANAGER.outputs.lClock, "remove", "hidden");
			},
		handleEvent_timeout: function()
			{
				this.changeClass(HTML_MANAGER.buttons.teamTimeout, "add", "red");
				this.changeClass(HTML_MANAGER.buttons.officialTimeout, "add", "red");
			},
		handleEvent_timeoutExit: function()
			{
				this.changeClass(HTML_MANAGER.buttons.teamTimeout, "remove", "red");
				this.changeClass(HTML_MANAGER.buttons.officialTimeout, "remove", "red");
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