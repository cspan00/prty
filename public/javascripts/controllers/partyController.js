app.controller('partyController', function($scope, $rootScope, $location, $http, $interval, $routeParams, picService){
var party_id = $routeParams.id


$scope.getPics = function(){
  picService.getPics(party_id).then(function(results){
    console.log(results);
    $scope.pics = results;
  })
}



$interval( function() {$scope.getPics(); }, 7000);



})
