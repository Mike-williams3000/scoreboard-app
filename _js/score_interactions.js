var SCOREINT = {
	domOutputScore1:null,
	domOutputScore2:null,
	selectedTeam: 1,
	getDomOutput:function() {
		var out1 = document.getElementById("scoreOutput1L");
		var out2 = document.getElementById("scoreOutput2L");
		this.domOutputScore1 = out1;
		this.domOutputScore2 = out2;
		},
	selectTeam: function(teamId)
				{
					switch(teamId){
						case 1:
							this.selectedTeam = 1;
							break;
						case 2:
							this.selectedTeam = 2;
							break;
					}
				},
	addPoints: function(points)
				{
					GAMEDATA["score" + this.selectedTeam] += points;
					this.updateScores();
				},
	updateScores: function ()
				{
					this.domOutputScore1.innerHTML = GAMEDATA.score1;
					this.domOutputScore2.innerHTML = GAMEDATA.score2;
				}
};
