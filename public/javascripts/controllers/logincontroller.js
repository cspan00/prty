app.controller('loginController', function($scope, $rootScope, $location, $auth) {
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

  $rootScope.$on('$locationChangeSuccess', function(){
      if(localStorage.satellizer_token){
        // $scope.logIn = false;
        $scope.user.session = true;
      }
      else{

       $scope.user.session = false;
     }

  })
  console.log("Logged in: " + JSON.stringify($scope.user));


 });
