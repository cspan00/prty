app.controller('oldShowController', function($scope, $location, $routeParams, picService){
  picService.getPics($routeParams.id).then(function(result){
    $scope.pics = result;
  })

})
