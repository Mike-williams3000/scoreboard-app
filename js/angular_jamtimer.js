var app = angular.module('JTApp', []);
app.controller('timersCtrl', function($scope) {
    var socketLoc =  window.location.href.substring(0, window.location.href.lastIndexOf('/'));
                
      var socket = io(socketLoc);
        socket.on('update', function (objClocks) {
        console.log(objClocks);
            
        
    $scope.pClock = objClocks.pClock;
    $scope.jClock = objClocks.jClock;
    $scope.lClock = objClocks.lClock;
    $scope.TTOClock = objClocks.TTOClock;
    $scope.OTOClock = objClocks.OTOClock;
            $scope.$apply();
    
  });
    
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
            }
                                      
               
               
   });

               
