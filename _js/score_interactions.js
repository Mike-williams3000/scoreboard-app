var SCOREINT = {

	selectedTeam:"",
	selectTeam: function(strTeam)
				{
					this.selectedTeam = strTeam;
				},

	addPoints: function(points)
				{
					GAMEDATA.score[this.selectedTeam] += points;
					this.updateScores();
				},
	updateScores: function ()
				{
					HTML_MANAGER.outputs.homeScore.innerHTML = GAMEDATA.score.home;
					HTML_MANAGER.outputs.awayScore.innerHTML = GAMEDATA.score.away;
				},
};

