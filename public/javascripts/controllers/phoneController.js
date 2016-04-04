app.controller('phoneController', function($scope, $rootScope, $http, $routeParams){
      console.log("this is the phone controller");
      var id = $routeParams.id;
      $scope.id = id; 

})
