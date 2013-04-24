'use strict';

angular.module('ComplexityApp', ['ui'])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl'})
      .when('/complex', { templateUrl: 'views/complex.html',controller: 'ComplexCtrl'})
      .otherwise({
        redirectTo: '/'
      });
  });