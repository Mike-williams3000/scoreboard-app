var Stopwatch = require('timer-stopwatch');
//var state = require('./game-state-module.js');
var CLOCK_MANAGER = {
    objClocks:{},
    clockDefaults:{
        pClock:{
			_strName:"pClock",
			_intDefalutMS: 60000,
			options:{almostDoneMS:30000}
            

			},
        jClock:{
                _strName:"jClock",
                _intDefalutMS: 10000
                
                
                },
        lClock:{
                _strName:"lClock",
                _intDefalutMS: 5000
                
                
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
            
            
        }
}; 
module.exports = CLOCK_MANAGER;