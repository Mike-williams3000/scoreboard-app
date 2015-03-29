var timer =
{
	strObjId : "timerInteractions",
	strObjDescription : "controls the countdown",
	
	intMins:0,
	intSeconds:0,
	intEndTime:0,
	domClockFace:"",
	holdSeconds:0,
	holdMins:0,
	pTimer: null,
	
	start: function ()
	{
	var intPeriodLength = this.holdMins*60000 + this.holdSeconds*1000;
	var timeNow = new Date();
	var intStartTime = parseInt(timeNow.getTime());
	 this.intEndTime = intStartTime + intPeriodLength;

	this.pTimer = setInterval(this.runClock,100);
	
	},
	
	set: function ()
	{
	this.domClockFace= document.getElementById("timerOutputL");	
  	this.holdMins = document.getElementById("pMins").value;
 	this.holdSeconds = document.getElementById("pSeconds").value;
 	timer.domClockFace.innerHTML = this.holdMins + " : " + this.holdSeconds;
 	

	},
	
	stop: function ()
	{
	clearInterval(timer.pTimer);
	var domHoldValueMins = document.getElementById("pMins");
	var domHoldValueSeconds = document.getElementById("pSeconds");
	domHoldValueMins.value = this.holdMins;
	domHoldValueSeconds.value = this.holdSeconds;
	},
	
	increaseTime: function ()
	{
	},
	
	decreaseTime: function ()
	{
	},
	
	runClock: function ()
	{
		
		
		
			// find the amount of "seconds" between now and target 
			var current_date = new Date().getTime();
			var seconds_left = (timer.intEndTime - current_date) / 1000 
			var minutes = parseInt(seconds_left / 60);
			var seconds = parseInt(seconds_left % 60);
			timer.domClockFace.innerHTML = minutes + " : " + seconds;
			timer.holdMins = minutes;
			timer.holdSeconds = seconds;
			
	},
	

	
};
	
	
	
	
