var app = angular.module('mainControls', []);
app.controller('timersCtrl', function($scope, $http) {
    var socketLoc =  window.location.href.substring(0, window.location.href.lastIndexOf('/'));
                
      var socket = io(socketLoc + "/getTime");
        socket.on('update', function (objClocks) {
        //console.log(objClocks);
            
        
    $scope.pClock = objClocks.pClock;
    $scope.jClock = Math.ceil(objClocks.jClock / 1000) * 1000;
    $scope.lClock = Math.ceil(objClocks.lClock / 1000) * 1000;
    $scope.TTOClock = Math.ceil(objClocks.TTOClock / 1000) * 1000;
    $scope.OTOClock = Math.ceil(objClocks.OTOClock / 1000) * 1000;
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
    
    socket.on('jamNumUpdate', function(jamNum){
         $scope.jamNumber = jamNum;
    })
    
            
});
               
