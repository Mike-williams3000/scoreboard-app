var HTML_MANAGER = 
{
	arrTimeOutTypeButtons:null,
	outputs:{},
	init:function()
		{
			this.collectDomElementsByTag("div", "OutputL", this.outputs);
			this.arrTimeOutTypeButtons = document.getElementsByClassName("timeoutType");
		},
	collectDomElementsByTag:function(tagName, strToMatch, objStore)
		{
			var arrTags = document.getElementsByTagName(tagName);
			for (var i=0; i< arrTags.length; i++)
				{
					var intIndex = arrTags[i].id.indexOf(strToMatch)
					if (intIndex != -1)
						{
							var strId = arrTags[i].id.slice(0, intIndex);
							objStore[strId] = arrTags[i];
						}
				}


		},
	toggleShowTimeOutButtons:function()
		{
			for (var i=0; i< this.arrTimeOutTypeButtons.length; i++)
			{
				if (this.arrTimeOutTypeButtons[i].className.indexOf("hidden") != -1)
				{
					this.arrTimeOutTypeButtons[i].className -= "hidden";
				}
				else 
				{
					this.arrTimeOutTypeButtons[i].className += "hidden";
				}
			}
		},

	HTMLToUpdate:null

}
