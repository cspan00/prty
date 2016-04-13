app.controller('urlController', function($scope, $rootScope, $location, $http, userService){


  userService.validateUser().then(function(result){
    var facebook_id = result.facebook_id
    var name = result.first_name
    var data = JSON.stringify({facebook_id : facebook_id, new : true})
    $http.post('new', data).then(function(response){
      $http.get('new/'+facebook_id).then(function(response){
        var id = JSON.stringify(response['data'][0]['id']);
        $scope.path = "/#/current/" + id;
        $scope.url = name +" Has invited you to a prty go to:https://prtylive.herokuapp.com/#/mobile/"+ id+" to Join!";
        $scope.display_url = "https://prtylive.herokuapp.com/#/mobile/"+ id
      })


    })
  })
  $scope.toggleTextForm = function() {
  $scope.numbers = !$scope.numbers;
}

 $scope.sendNumbers = function () {
   var numbers = {}
   numbers.url = $scope.url
   numbers.number1 = $scope.number1
   numbers.number2 = $scope.number2
   numbers.number3 = $scope.number3
   $http.post('text', numbers).then(function(result){
     console.log(result);
   })
 }



})
