var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
  
    $interval(function(){
    $scope.pClock = gameClocks.pClock.ms;
    $scope.jClock = gameClocks.jClock.ms ||  "00:00";
    $scope.lClock = gameClocks.lClock.ms ||  "00:00";
    $scope.TTOClock = gameClocks.TTOClock.ms ||  "00:00";
    $scope.OTOClock = gameClocks.OTOClock.ms ||  "00:00";}, 100)
    $scope.upDownClick = function (target, intAmount){
               if (gameClocks[target].runTimer == false) {
                   
                        var timeToResetTo = function (){
                        if (gameClocks[target].ms + intAmount*1000 >= 0)
                        {
                            return gameClocks[target].ms + intAmount*1000; 
                        }
                       else
                       {
                           return 0;
                       };
               }();
                    gameClocks[target].reset(timeToResetTo);
           }
        console.log(gameClocks[target].runTimer)
            
        };
    
    
    });




