app.service('picService', function($http){
this.getPics = function(id){
  return $http.get('pics/'+id).then(function(response){
    return response.data
  })
}


})
