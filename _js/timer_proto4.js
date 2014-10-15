function Clock (_strName, _intTime, _booRunPastZero)
{
	this._strClockName = _strName;
	this._intTimeLeft = _intTime;
	this._intRunLength = _intTime;
	this._intInitialTime = null;
	this._booRunPastZero = _booRunPastZero || false;
	this.HTMLElement = document.getElementById(_strName + "OutputL") || false;
}

Clock.prototype.setInt = function (_datNow)
									{

										this._intInitialTime = _datNow + this._intTimeLeft;
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
									 	if (this._intTimeLeft <=0 && this._booRunPastZero != true)
										 	{
										 		this._intTimeLeft = 0;
										 		CLOCK_MANAGER.zeroEvent(this);
										 	};
										 	this.updateHtml();
										 	
									};
Clock.prototype.updateHtml = function ()									
							{
								if (this.HTMLElement != false)
									{
										this.HTMLElement.innerHTML = this._intTimeLeft;
									};
							};



var OBJ_CLOCK_DEFAULTS = {
	pClock:{
			_strName:"pClock",
			_intDefalutMS: 1800000,

			},
	jClock:{
			_strName:"jClock",
			_intDefalutMS: 120000,
			// eventListner pClock >= 30, to do = this.unsubscribe, this.unRender 
			
			},
	lClock:{
			_strName:"pClock",
			_intDefalutMS: 30000,
			// eventListner jclockZero, to do = this.subscribe
			// eventListner pClock >= 30, to do = this.unsubscribe, this.unRender 
			},
	totalGameTime: {
					_strName:"totalGameTime",
					_intDefalutMS:0,
					_booRunPastZero:true
				}
	};
	

//make GAME_MANAGER, include game state:" warmup, running, lineup, halftime, endGame, gameOver"



var CLOCK_MANAGER = {

	_objClocks: {},
	
	ticker:null,

	_objRunningClocks : {},

	handleEvent_subscribe : function (_objToSubscribe)
		{
			this._objRunningClocks[_objToSubscribe._strClockName] = _objToSubscribe;
		},
	handleEvent_unsubscribe : function (_objClockToRemove)
		{
			_objClockToRemove.stopEvent()	
			delete this._objRunningClocks[_objClockToRemove];
		},
	handleEvent_runClocks: function()
		{
			var _datNow = Date.now();
			for (var _clock in this._objRunningClocks)
			 {
				var _intTime = this._objRunningClocks[_clock].getInt() || this._objRunningClocks[_clock].setInt(_datNow);
				var _intDelta =  _intTime - _datNow;
				
				this._objRunningClocks[_clock].setTimeLeft(_intDelta);
				//_clock.HTMLElement.innerHTML = _clock._intTimeLeft
			};
		},

	createClocks: function()
		{
			for(var _clock in OBJ_CLOCK_DEFAULTS)
			{
				var _objCurrClock = new Clock(OBJ_CLOCK_DEFAULTS[_clock]._strName, OBJ_CLOCK_DEFAULTS[_clock]._intDefalutMS, OBJ_CLOCK_DEFAULTS[_clock]._booRunPastZero);
				this._objClocks[OBJ_CLOCK_DEFAULTS[_clock]._strName] = _objCurrClock;	

			};
		},

	init: function()
		{
			this.createClocks();
			this.subscribe(this._objClocks.totalGameTime);
			CLOCK_MANAGER.ticker = setInterval(function(){CLOCK_MANAGER.runClocks()},100);
		},
	
	endGameTime: function()	
		{
			clearInterval(CLOCK_MANAGER.ticker);
		},
	handleEvent_zeroEvent:function(Clock)
		{
			alert(Clock + "Has reached zero");
		}

};
EM.register(CLOCK_MANAGER);