function Clock (_strName, _intTime, _booRunPastZero, _intoffSet)
{
	this._strClockName = _strName;
	this._intTimeLeft = _intTime;
	this._intRunLength = _intTime;
	this._intInitialTime = null;
	this._intoffSet = _intoffSet || 0;
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
									 	if (this._intTimeLeft - this._intoffSet <=0 && this._booRunPastZero != true)
										 	{
										 		this._intTimeLeft = 0;
										 		EM.trigger("clockZero", this);
										 	};
										 	//this.updateHtml();
										 	
									};
Clock.prototype.reset = function ()
	{
		this._intTimeLeft = this._intRunLength;
		this._intInitialTime = false;
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
			_intoffSet: 30000

			},
	jClock:{
			_strName:"jClock",
			_intDefalutMS: 120000,
			// eventListner pClock >= 30, to do = this.unsubscribe, this.unRender 
			
			},
	lClock:{
			_strName:"lClock",
			_intDefalutMS: 30000,
			// eventListner jclockZero, to do = this.subscribe
			// eventListner pClock >= 30, to do = this.unsubscribe, this.unRender 
			},
	totalGameTime: {
					_strName:"totalGameTime",
					_intDefalutMS:0,
					_booRunPastZero:true
				},
	genericTimeout: {
					_strName:"genericTimeoutClock",
					_intDefalutMS:0,
					_booRunPastZero:true
				},
	teamTimeout: {
					_strName:"teamTimeoutClock",
					_intDefalutMS:60000,
					_booRunPastZero:false
				}
	};
	

//make GAME_MANAGER, include game state:" warmup, running, lineup, halftime, endGame, gameOver"



var CLOCK_MANAGER = {

	_objClocks: {},
	
	ticker:null,

	_objRunningClocks : {},

	handleEvent_subscribe : function (_strClockName)
		{
			this._objRunningClocks[_strClockName] = CLOCK_MANAGER._objClocks[_strClockName];
		},
	handleEvent_unsubscribe : function (_strClockName)
		{
			//_objClockToRemove.stopEvent()	
			delete this._objRunningClocks[_strClockName];
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
	handleEvent_updateHTML: function ()
			{
				for(var _clock in this._objRunningClocks)
					{
						if(this._objRunningClocks[_clock].HTMLElement)
							{
								var _strClockFace = this.convertMS(this._objRunningClocks[_clock].getTimeLeft());
								this._objRunningClocks[_clock].HTMLElement.innerHTML = _strClockFace;
								localStorage.setItem(this._objRunningClocks[_clock]._strClockName, _strClockFace);
							};

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
		},
	convertMS: function(_intMili)
					{
						var _intSecondsLeft =  Math.abs((_intMili / 1000));
						var minutes = parseInt(_intSecondsLeft / 60);
						var seconds = parseInt(_intSecondsLeft % 60);
						return  (minutes + " : " + seconds);

					}

};
EM.register(CLOCK_MANAGER);