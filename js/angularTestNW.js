var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
  
    
    $scope.pClock = gameClocks.pClock.ms;
    $scope.jClock = gameClocks.jClock.ms ||  "00:00";
    $scope.lClock = gameClocks.lClock.ms ||  "00:00";
    $scope.TTOClock = gameClocks.TTOClock.ms ||  "00:00";
    $scope.OTOClock = gameClocks.OTOClock.ms ||  "00:00";
    
    
    });

