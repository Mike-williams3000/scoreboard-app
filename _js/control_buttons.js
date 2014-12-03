var CONTROLS = {

	startJam:
		{
			strName:"Start Jam",
			strId:"startButtonL",
			strtype:"button",
			strOnClick:"EM.trigger('gameStateChange', 'jamRunning')"
		},

	stopJam:
		{
			strName:"Stop Jam",
			strId:"stopButtonL",
			strtype:"button",
			strOnClick:"EM.trigger('jamEnd')"
		},
	scoreKeysToggle:
		{
			strName:"Skeys",
			strId:"scoreKeysToggleL",
			strtype:"BUTTON",
			strOnClick:"EM.trigger('scoreKeystoggle')"
		},
	timeOut:
		{
			strName:"TimeOut",
			strId:"TimeOut",
			strtype:"button",
			strOnClick:"EM.trigger('Timeout')"
		}


}
var LOADCTRLBUTTONS = function (_objControls)
	{
		var domFragment = document.createDocumentFragment();
		domFragment.id = "controlElementsL";


		for (var _controlElement in _objControls)
			{
				var domNewElement = document.createElement("BUTTON");
				domNewElement.id =_objControls[_controlElement].strId;

				domNewElement.onclick =_objControls[_controlElement].strOnClick;
				//domNewElement.value = _controlElement.strName;
				console.log(domNewElement);
				domFragment.appendChild(domNewElement);


			};
			var domTarget = document.getElementById("controlsHolderL");
			console.log(domFragment);
			domTarget.appendChild(domFragment);
			console.log(domTarget);

	};



