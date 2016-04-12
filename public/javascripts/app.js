var app = angular.module("prty", ['ngRoute', 'satellizer', 'angularMoment']);

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
    .when('/mobile/:id', {
      templateUrl: 'partials/mobile.html',
      controller: 'phoneController'
    })
    .when('/prtymain', {
      templateUrl: 'partials/mainview.html',
      controller: 'mainController'
    })
    .when('/newparty', {
      templateUrl: 'partials/url.html',
      controller: 'urlController',
    })
    .when('/current/:id', {
      templateUrl: 'partials/currentparty.html',
      controller: 'partyController'
    })
    .when('/old',{
      templateUrl: 'partials/oldparties.html',
      controller: 'oldController'
    })
    .when('/old/:id', {
      templateUrl: 'partials/oldShow.html',
      controller: 'oldShowController'
    })






  })
