app.controller('partyController', function($timeout, $scope, $rootScope, $location, $http, $interval, $routeParams, picService, userService){
    var slides;
    var currentSlide = -1;
    var party_id = $routeParams.id
    $scope.stop = $interval( function() {$scope.getPics(); }, 2000);
    // code to stop $interval for the current party page when user continues through site.
    var dereg1 = $rootScope.$on('$locationChangeSuccess', function(){
        $interval.cancel($scope.stop);
        dereg1();
      });
    $scope.getPics = function(){
        picService.getPics(party_id).then(function(results){
          slides = results
          $scope.pics = results;
        })
      }

      $scope.logout = function(){
        $auth.logout()
        console.log("successfully logged out!");
      }
    $scope.slideShow = function(){
      $scope.showSlides = !$scope.showSlides
    }


    function advanceSlide(){
      ++currentSlide;
      if(currentSlide >= slides.length){
        currentSlide = 0;
      }
      $scope.slide = (slides[currentSlide]['image_url']);


    }

    var intervalID = setInterval(advanceSlide, 3000)




})
