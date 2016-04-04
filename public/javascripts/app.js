var app = angular.module("prty", ['ngRoute', 'satellizer']);

  //DEV CLIENT ID 617834671715742
  //PRODUCTION CLIENT ID 1579059145739333
  app.config(function ($routeProvider, $authProvider){
    $authProvider.facebook({
      clientId: '1579059145739333',
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
    .when('/new', {
      templateUrl: 'partials/party.html',
      controller: 'partyController',
    })





  })
