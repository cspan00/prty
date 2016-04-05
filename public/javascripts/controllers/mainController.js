app.controller('mainController', function($scope, $rootScope, $route, $routeParams, $location, $auth, userService) {




userService.validateUser().then(function(result){
  $scope.user = result
})

$scope.logout = function(){
  $auth.logout()
  console.log("successfully logged out!");
}




})
