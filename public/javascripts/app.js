var app = angular.module("prty", ['ngRoute', 'satellizer']);


  app.config(function ($routeProvider, $authProvider){
    $authProvider.facebook({
      clientId: '617834671715742',
      scope: ['email'],
      scopeDelimiter: ',',
      profileFields: ['name', 'id', 'picture.type(large)', 'emails']
    });
    $routeProvider
    .when('/', {
      templateUrl: 'partials/splash.html',
      controller: 'loginController'
    })
    .when('/prtymain', {
      templateUrl: 'partials/mainview.html',
      controller: 'mainController'
    })





  })
