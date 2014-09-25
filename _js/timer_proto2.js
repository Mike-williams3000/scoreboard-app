function Clock (_strName)
{
	this._strClockName = _strName;
	this._intTimeLeft = null;
	this._intTargetTime = null;
	this._intInitialTime = null;
	this.HTMLElement = null;
}

CLOCK.prototype.setInitialTime = function (_intStartTIme)
									{
										this._intTargetTime = this._intInitialTime + _intTimeLeft;
									};
CLOCK.prototype.getTimeLeft = function ()
									{
										return (_intTimeLeft)
									};
CLOCK.prototype.decreaseTime = function (_intElapsedMilli)
									{
										 _intTimeLeft -= _intElapsedMilli;
									};
CLOCK.prototype.setTimeLeft = function (_intElapsedMilli)
									{													
									 	if (this._intTimeLeft >=0)
										 	{
											 	this._intTimeLeft -= _intElapsedMilli;
										 	}
										 	else
										 	{
										 		this._intTimeLeft = 0;
										 	}
									};

var _arrClockNames = [pClock, jClock, LClock];
	



var TIMEPULSE = {

	_objClocks: {},
	_intTime1:null,
	_intTime2:null,
	_intMiliPassed:null,
	ticker:null,

	createClocks: function(_arrClockNames)
	{
		for (i=0; i< _arrClockNames.length; i++)
		{
			var _objCurrClock = new Clock(_arrClockNames[i])
			this._objClocks[_arrClockNames[i]] = _objCurrClock;	

		};
	},

	init: function(){
		_intTime1 = Date.now();

		this.ticker = setInterval(this.runClock,100);
	},
	
	runClock: function(){
		TIMEPULSE._intTime2 = Date.now();
		_intMiliPassed = TIMEPULSE._intTime2 - TIMEPULSE._intTime1;
		// time passed event
	},

	stopClock: function(){
		clearInterval(TIMEPULSE.ticker);
	}
}

var clockManager = {

	_objRunninClocks : {};

	subscribe : function (_objCurrClock)
				{
					_objRunninClocks[_objToSubscribe[_strClockName]] = _objToSubscribe;
				},
	unsubscribe : function (_objCurrClock)
				{
					_objRunninClocks[_objToSubscribe[_strClockName]].delete;
				},
	runclocks: function(_intDelta)
				{
					this._objRunninClocks.forEach(function(_clock) {
						_clock._intTimeLeft -= _intDelta;
						_clock.HTMLElement.innerHTML = _clock._intTimeLeft
					})
				}

}