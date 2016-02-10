var Stopwatch = require('timer-stopwatch');
//var state = require('./game-state-module.js');
var CLOCK_MANAGER = {
    objClocks:{},
    clockDefaults:{
        pClock:{
			_strName:"pClock",
			_intDefalutMS: 1800000,
			options:{almostDoneMS:30000}
            

			},
        jClock:{
                _strName:"jClock",
                _intDefalutMS: 120000
                
                
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
                            
									
							CLOCK_MANAGER.objClocks[this.clockDefaults[_clock]._strName] = _objCurrClock;	

						};
            
            
        },
    timeUpDown: function (target, intAmount){
               if (CLOCK_MANAGER.objClocks[target].runTimer == false) {
                   
                        var timeToResetTo = function (){
                        if (CLOCK_MANAGER.objClocks[target].ms + intAmount*1000 >= 0)
                        {
                            return CLOCK_MANAGER.objClocks[target].ms + intAmount*1000; 
                        }
                       else
                       {
                           return 0;
                       };
               }();
                    CLOCK_MANAGER.objClocks[target].reset(timeToResetTo);
           }
        
            
        }
}; 
module.exports = CLOCK_MANAGER;