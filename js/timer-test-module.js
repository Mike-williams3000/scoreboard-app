var Stopwatch = require('timer-stopwatch');
var CLOCK_MANAGER = {
    objClocks:{},
    clockDefaults:{
        pClock:{
			_strName:"pClock",
			_intDefalutMS: 1800000,
			options:{almostDone:30000}
            

			},
        jClock:{
                _strName:"jClock",
                _intDefalutMS: 120000,
                options:{refreshRateMS: 100} 
               
                },
        lClock:{
                _strName:"lClock",
                _intDefalutMS: 30000
                
                },

        totalGameTime:{
                        _strName:"totalGameTime"
                        },
        OTO:{
                _strName:"OTOClock"
            },
        
        TTO:{
                _strName:"TTOClock",
                _intDefalutMS:60000
                    
            }
        },   
   createClocks: function()
        {    
            for(var _clock in this.clockDefaults)
						{
							var _objCurrClock = new Stopwatch(this.clockDefaults[_clock]._intDefalutMS || undefined, this.clockDefaults[_clock].options || undefined)
                           /* _objCurrClock.on('done', function(){
                                    console.log('Timer is complete');
                                    });
                            _objCurrClock.on('time', function(time) {
                                    console.log(time.ms);
                                    });*/
                            _objCurrClock._events = {
                                done:function()
                                                     {
                                                         console.log("timer done");
                                                     }
                                }
									
							CLOCK_MANAGER.objClocks[this.clockDefaults[_clock]._strName] = _objCurrClock;	

						};
            
            
        }
}; 
module.exports = CLOCK_MANAGER;