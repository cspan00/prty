app.controller('partyController', function($scope, $rootScope, $location, $http, userService, partyService){

  userService.validateUser().then(function(result){
    var facebook_id = result.facebook_id
    var data = JSON.stringify({facebook_id : facebook_id, new : true})
    $http.post('new', data).then(function(response){
      var id = partyService.makeUrl(facebook_id)
      $scope.url = "go to prty.live/"+ id + "on your phone to join the party"; 

    })
  })


})
