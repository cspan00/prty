app.controller('mainController', function($http, $scope, $rootScope, $route, $routeParams, $location, $auth, userService) {




userService.validateUser().then(function(result){
  $scope.user = result
  $http.get('userpics/'+ result.facebook_id).then(function(result){
    $scope.userpics = result['data'];
    console.log(result['data']);
  })
})

$scope.logout = function(){
  $auth.logout()
  console.log("successfully logged out!");
}




})
