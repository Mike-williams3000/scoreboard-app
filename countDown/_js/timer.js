var timer =
{
	strObjId : "timerInteractions",
	strObjDescription : "controls the countdown",
	
	intMins:0,
	intSeconds:0,
	intEndTime:0,
	domClockFace:"",
	
	handleEvent_start: function ()
	{
	var intPeriodLength = this.intMins*60000 + this.intSeconds*1000;
	var timeNow = new Date();
	var intStartTime = parseInt(timeNow.getTime());
	 this.intEndTime = intStartTime + intPeriodLength;
	this.domClockFace= document.getElementById("timerOutputL");
	var pTimer = setInterval(this.runClock,1000);
	
	},
	
	handleEvent_set: function ()
	{
		
		  this.intMins = document.getElementById("pMins").value
		  this.intSeconds = document.getElementById("pSeconds").value
	},
	
	handleEvent_stop: function ()
	{
	this.runClock
	},
	
	handleEvent_increaseTime: function ()
	{
	},
	
	handleEvent_decreaseTime: function ()
	{
	},
	
	runClock:function ()
	{
		
		
		
			// find the amount of "seconds" between now and target 
			var current_date = new Date().getTime();
			var seconds_left = (timer.intEndTime - current_date) / 1000 
			var minutes = parseInt(seconds_left / 60);
			var seconds = parseInt(seconds_left % 60);
			timer.domClockFace.innerHTML = minutes + " : " + seconds;
			
	},
	
	
	booTerminal:true
	
}
EM.register(timer);
	
	
	
	
