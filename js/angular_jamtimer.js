var app = angular.module('JTApp', []);
app.controller('timersCtrl', function($scope, $http) {
    var socketLoc =  window.location.href.substring(0, window.location.href.lastIndexOf('/'));
                
      var socket = io(socketLoc + "/getTime");
        socket.on('update', function (objClocks) {
        //console.log(objClocks);
            
        
    $scope.pClock = objClocks.pClock;
    $scope.jClock = objClocks.jClock;
    $scope.lClock = objClocks.lClock;
    $scope.TTOClock = objClocks.TTOClock;
    $scope.OTOClock = objClocks.OTOClock;
            $scope.$apply();
    
  });
    $scope.upDownClick =function(target, intAmount)
				{
                    var json = {};
                    json.target = target;
                    json.intAmount = intAmount;
					$http.post("http://localhost:3000/timeChange", json).success( function(data)
                                                {
                                                    console.log("time updated " + data);
                                                    
                                                    
                                                }).
                                                error(function(data, status, headers, config) {
                                                    console.log(data, status, headers, config)
    
                                                });
				}
    
});
     
    

app.controller('buttonsCtrl', function($scope, $http) {
               
            $scope.click = function(strButton){
                            console.log(strButton);
                            $http.get('/'+strButton).
                                success(function(data, status, headers, config) {
                                    console.log(data + "success")
                                }).
                                error(function(data, status, headers, config) {
                                    console.log(data, status, headers, config)
    
                                });
            };
    
                                      
               
               
   });

app.controller('scores', function($scope, $http) {
    
    var socketLoc =  window.location.href.substring(0, window.location.href.lastIndexOf('/'));
                
      var socket = io(socketLoc + "/getScore");
        socket.on('update', function (score) {
        console.log(score);
        $scope.homeScore = score.home;
        $scope.awayScore = score.away;
        $scope.$apply
        });
            
});
               
