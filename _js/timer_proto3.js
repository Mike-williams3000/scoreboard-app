function Clock (_strName)
{
	this._strClockName = _strName;
	this._intInitialTime = null;
	this._datLatest = null;
	this._intTimeLeft = null;
	this._running = false;
	
};
Clock.prototype.start = function (_datNow)
									{
										
										_arrListeningClocks.push(this)
										this._running = true;

									};



Clock.prototype.stop = function ()
									{
									// remove event listener

									};

Clock.prototype.getTimeLeft = function ()
									{
										return (_intTimeLeft)
									};
Clock.prototype.setInitialTime = function (_datNow)
									{
										 this._intInitialTime = _datNow ;
									};
Clock.prototype.setTimeLeft = function (_intNewTimeLeft)
									{													
									 	this._intTimeLeft = _intNewTimeLeft;
									};
									 	
var clock_controler = {
	 run: function (_arrListeningClocks)
	 		{
	 			var _datNow = Date.now();
	 			for (i=0; i<_arrListeningClocks.length; i++)
	 			{
	 				var _intInitialTime = _arrListeningClocks[i].getInitialTime();
	 				var _intDelta = _datNow - _intInitialTime;
	 				_arrListeningClocks[i].setTimeLeft(_intDelta);
	 			}
 			},
	start: function(_arrSelectedClocks)
			{
				
			}



};
var _arrListeningClocks = [];