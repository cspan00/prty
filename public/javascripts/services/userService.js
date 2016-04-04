
app.service('userService', function($http){
  this.validateUser = function(){
    var token = localStorage.getItem('satellizer_token');
    var data = JSON.stringify({token : token})
      return $http.post('user', data).then(function(response){
      return response.data
      })
    }

})
