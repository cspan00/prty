app.service('partyService', function($http){
    this.makeUrl = function(facebook_id){
      return $http.get('new/'+facebook_id).then(function(response){
        var id = JSON.stringify(response['data'][0]['id']);
        console.log(typeof id);
        return id
      })
    }
})
