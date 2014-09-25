function Clock (_strName, _intTime)
{
	this._strClockName = _strName;
	this._intTimeLeft = _intTime;
	this._intTargetTime = null;
	this._intInitialTime = null;
	this.HTMLElement = null;
}

Clock.prototype.setInt = function (_datNow)
									{

										this._intInitialTime = _datNow - this._intTimeLeft;
										return (this._intInitialTime);
									};
Clock.prototype.getInt = function ()
								{
									return (this._intInitialTime)
								};

Clock.prototype.getTimeLeft = function ()
									{
										return (this._intTimeLeft)
									};
Clock.prototype.decreaseTime = function (_intElapsedMilli)
									{
										 _intTimeLeft -= _intElapsedMilli;
									};
Clock.prototype.setTimeLeft = function (_intTleft)
									{													
									 	this._intTimeLeft = _intTleft;
									 	if (this._intTimeLeft <=0)
										 	{
										 		this._intTimeLeft = 0;
										 		clockManager.unsubscribe(this);
										 	};
										 	
									};

var _objClockDefaults = {
	pClock:{
			_strName:"pClock",
			_intDefalutMS: 1800000
			},
	jClock:{
			_strName:"jClock",
			_intDefalutMS: 120000
			},
	lClock:{
			_strName:"plClock",
			_intDefalutMS: 30000
			}
	};
	



var TIMEPULSE = {

	_objClocks: {},
	
	ticker:null,

	createClocks: function()
	{
		for(var _clock in _objClockDefaults)
		{
			var _objCurrClock = new Clock(_objClockDefaults[_clock]._strName, _objClockDefaults[_clock]._intDefalutMS)
			this._objClocks[_objClockDefaults[_clock]._strName] = _objCurrClock;	

		};
	},
/*
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
	*/
}

var clockManager = {

	_objRunninClocks : {},

	subscribe : function (_objToSubscribe)
				{
					this._objRunninClocks[_objToSubscribe._strClockName] = _objToSubscribe;
				},
	unsubscribe : function (_objToSubscribe)
				{
					_objRunninClocks[_objToSubscribe[_strClockName]].delete;
				},
	runclocks: function()
				{
					var _datNow = Date.now();
					for (var _clock in this._objRunninClocks)
					 {
						var _intTime = this._objRunninClocks[_clock].getInt() || this._objRunninClocks[_clock].setInt(_datNow);
						var _intDelta = _datNow - _intTime;
						var _Tleft = this._objRunninClocks[_clock].getTimeLeft() - _intDelta;
						this._objRunninClocks[_clock].setTimeLeft(_Tleft);
						//_clock.HTMLElement.innerHTML = _clock._intTimeLeft
					};
				}

}