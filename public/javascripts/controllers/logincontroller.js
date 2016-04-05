app.controller('loginController', function($scope, $http, $interval, $rootScope, $location, $auth) {
  var images = [];
  $scope.images = images;
   $scope.login = function() {
     $auth.login($scope.user)
       .then(function() {
         console.log('You have successfully signed in!');
         $location.path('/');
       })
       .catch(function(error) {
         console.log(error.data.message, error.status);
       });
   };
   $scope.authenticate = function(provider) {
     $auth.authenticate(provider)
       .then(function(response) {
         console.log('You have successfully signed in with ' + provider + '!');
         $location.path('/prtymain')
       })
       .catch(function(error) {
         if (error.error) {
           // Popup error - invalid redirect_uri, pressed cancel button, etc.
           console.log(error.error);
         } else if (error.data) {
           // HTTP response error from server
         console.log(error.data.message, error.status);
         } else {
           console.log(error);
         }
       });
   };
   $scope.logout = function(){
     $auth.logout()
     console.log("successfully logged out!");
   }

  $scope.logout = function(){
    $auth.logout()
    console.log("successfully logged out!");
  }

  $scope.getRandomPics = function(){
    $http.get('random').then(function(result){
      images.push({url : result["data"]["results"][0]["user"]["picture"]["medium"] });
      console.log(images);
    })
  }
$interval( function() {$scope.getRandomPics(); }, 3000);






 });
