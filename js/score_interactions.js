var SCOREINT = {

	selectedTeam:"",
	selectTeam: function(strTeam)
				{
					if (this.selectedTeam == strTeam)
                    {
                        this.selectedTeam ="";
                    $('#' + strTeam).toggleClass('red');
                    }
                    else
                    {
                        $('#' + this.selectedTeam).toggleClass('red');
                        this.selectedTeam = strTeam;
                        $('#' + strTeam).toggleClass('red');
                    }
				},

	addPoints: function(intPoints)
				{
                    var json = {};
                    json.selectedTeam = this.selectedTeam;
                    json.points = intPoints;
					$.post("http://localhost:3000/score", json, function(data)
                                                {
                                                    
                                                    $('#homeScore').html(data.home);
                                                    $('#awayScore').html(data.away);
                                                
                                                    
                                                })
				}
}

