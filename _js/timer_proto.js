function CLOCK (_strName)
{
	this._strClockName = _strName;
	this._intTimeLeft = null;
	this._intTargetTime = null;
	this._intInitialTime = null;
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
	



var TIMEPULSE = {

	_arrClocks:[],
	_intTime1:null,
	_intTime2:null,
	_intMiliPassed:null,
	ticker:null,
	createClocks: function(arrClockNames)
	{
		for (i=0; i< arrClockNames.length; i++)
		{
			var x = new CLOCKS(arrClockNames[i])
			this._arrClocks.push(x);	

		};
	}
	init: function(){
		_intTime1 = new Date().getTime();
		for (i=0; i< timers.length; i++)
		{
			timers[i].setInitialTime(_intTime1);

		};

		this.ticker = setInterval(this.runClock,100);
	},
	runClock: function(){
		TIMEPULSE._intTime2 = new Date().getTime();
		_intMiliPassed = TIMEPULSE._intTime2 - TIMEPULSE._intTime1;
		for (i=0; i< timers.length; i++)
		{
			timers[i].decreaseTime(_intMiliPassed);

		};


	},

	stopClock: function(){
		clearInterval(TIMEPULSE.ticker);
	

	}
}