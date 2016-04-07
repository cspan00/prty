app.controller('partyController', function($scope, $rootScope, $location, $http, $interval, $routeParams, picService){
var party_id = $routeParams.id
$scope.stop = $interval( function() {$scope.getPics(); }, 2000);
// code to stop $interval for the current party page when user continues through site.
var dereg1 = $rootScope.$on('$locationChangeSuccess', function(){
  $interval.cancel($scope.stop);
  dereg1();
});
$scope.getPics = function(){
  picService.getPics(party_id).then(function(results){
    console.log(results);
    $scope.pics = results;
  })
}


$scope.toggleMenu = function(){
  $scope.nav = !$scope.nav
  console.log($scope.nav);
}



})
