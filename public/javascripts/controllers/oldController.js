app.controller('oldController', function($scope, $rootScope, $http, $routeParams, userService){
      userService.validateUser().then(function(result){
        var facebook_id = {facebook_id : result.facebook_id}
        $http.post('old', facebook_id).then(function(result){
          $scope.oldParties = result['data']
        })
      })
})
