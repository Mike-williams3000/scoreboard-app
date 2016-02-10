var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    app.test = function(){
        $scope.pClock = CLOCK_MANAGER._objClocks.pClock.getTimeLeft();
    $scope.jClock = CLOCK_MANAGER._objClocks.jClock.getTimeLeft();
    $scope.lClock = CLOCK_MANAGER._objClocks.lClock.getTimeLeft();
    $scope.TTOClock = CLOCK_MANAGER._objClocks.TTOClock.getTimeLeft();
    $scope.OTOClock = CLOCK_MANAGER._objClocks.OTOClock.getTimeLeft();
        $scope.$digest();};
    
    $scope.pClock = CLOCK_MANAGER._objClocks.pClock.getTimeLeft();
    $scope.jClock = CLOCK_MANAGER._objClocks.jClock.getTimeLeft() ||  "00:00";
    $scope.lClock = CLOCK_MANAGER._objClocks.lClock.getTimeLeft() ||  "00:00";
    $scope.TTOClock = CLOCK_MANAGER._objClocks.TTOClock.getTimeLeft() ||  "00:00";
    $scope.OTOClock = CLOCK_MANAGER._objClocks.OTOClock.getTimeLeft() ||  "00:00";
    
    });

