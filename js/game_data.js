var GAMEDATA =
{
    score:
    {
        home: 0,
        away:0
    },
    
    addPoints: function(strTeam, intPoints)
    {
        this.score[strTeam] += intPoints;
    },
    
    setPoints: function (strTeam, intPoints){
        
        this.score[strTeam] = intPoints;
    },
    
    getPoints: function () {
        
        return this.score;
    }
    
    
}

module.exports = GAMEDATA;