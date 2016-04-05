app.controller('urlController', function($scope, $rootScope, $location, $http, userService){

  userService.validateUser().then(function(result){
    var facebook_id = result.facebook_id
    var data = JSON.stringify({facebook_id : facebook_id, new : true})
    $http.post('new', data).then(function(response){
      $http.get('new/'+facebook_id).then(function(response){
        var id = JSON.stringify(response['data'][0]['id']);
        $scope.path = "/#/current/" + id;
        $scope.url ="go to prtylive.herokuapp/#/mobile/"+ id+ " on your phone to join!";

      })


    })
  })


})
