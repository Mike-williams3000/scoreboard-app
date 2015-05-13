function Clock (_strName, _intTime, _booRunPastZero, _zeroEvents )
{
	this._strClockName = _strName;
	this._intTimeLeft = _intTime;
	this._intRunLength = _intTime;
	this._intInitialTime = null;
	this._booRunPastZero = _booRunPastZero || false;
	this.HTMLElement = document.getElementById(_strName + "OutputL") || false;
    this._zeroEvents = _zeroEvents || false;
    
         
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
										 		CLOCK_MANAGER.unsubscribe(this._strClockName);
										 		this._intTimeLeft = 0;
                                                if (this._zeroEvents != false)
                                                    { 
                                                        this._zeroEvents();
                                                    };
                                            
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
			_booRunPastZero:false
            

			},
	jClock:{
			_strName:"jClock",
			_intDefalutMS: 120000,
            _booRunPastZero:false,
			_zeroEvents:function(){GM.stopJam()}
			
			},
	lClock:{
			_strName:"lClock",
			_intDefalutMS: 30000,
            _booRunPastZero:false,
			_zeroEvents: function(){GM.startJam()}
    },
        
	totalGameTime: {
					_strName:"totalGameTime",
					_intDefalutMS:0,
					_booRunPastZero:true
				},
	OTO: {
					_strName:"OTOClock",
					_intDefalutMS:0,
					_booRunPastZero:true
				},
	TTO: {
					_strName:"TTOClock",
					_intDefalutMS:60000,
					_booRunPastZero:false
				}
	};
	




var CLOCK_MANAGER = {

	_objClocks: {},
	
	ticker:null,

	_objRunningClocks : {},

	subscribe : function (_strClockName)
		{
            if (!CLOCK_MANAGER._objRunningClocks.hasOwnProperty(_strClockName))
                {
                    this._objRunningClocks[_strClockName] = CLOCK_MANAGER._objClocks[_strClockName];
                }
        },
	unsubscribe : function (_strClockName)
		{
			if (CLOCK_MANAGER._objRunningClocks.hasOwnProperty(_strClockName))
                {
                    delete this._objRunningClocks[_strClockName];
                };
		},
	runClocks: function()
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
							var _objCurrClock = new Clock(
									OBJ_CLOCK_DEFAULTS[_clock]._strName,
									OBJ_CLOCK_DEFAULTS[_clock]._intDefalutMS,
									OBJ_CLOCK_DEFAULTS[_clock]._booRunPastZero,
                                    OBJ_CLOCK_DEFAULTS[_clock]._events
								);
							CLOCK_MANAGER._objClocks[OBJ_CLOCK_DEFAULTS[_clock]._strName] = _objCurrClock;	

						};
					},
	

	convertMS: function(_intMili)
					{
						var _intSecondsLeft =  Math.abs((_intMili / 1000));
						var minutes = parseInt(_intSecondsLeft / 60);
						var seconds = parseInt(_intSecondsLeft % 60);
						return  (minutes + " : " + seconds);

					}

};
