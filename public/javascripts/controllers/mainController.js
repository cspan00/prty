app.controller('mainController', function($scope, $rootScope, $location, $auth, userService) {

userService.validateUser().then(function(result){
  $scope.user = result
})


})
