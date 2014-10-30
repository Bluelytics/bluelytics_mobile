// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bluemobile', [
  'ionic',
  'bluemobile.controllers',
  'bluemobile.services',
  'ngResource',
  'underscore'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('index', {
      url: "/",
      templateUrl: "templates/main.html",
      controller: 'MainCtrl'
    })

    .state('calculator', {
      url: "/calc",
      templateUrl: "templates/calculator.html",
      controller: 'CalculatorCtrl'
    })

    .state('evolution', {
      url: "/evolution",
      templateUrl: "templates/evolution.html",
      controller: 'EvolutionCtrl'
    })

    .state('gap', {
      url: "/gap",
      templateUrl: "templates/gap.html",
      controller: 'GapCtrl'
    })

    .state('about', {
      url: "/about",
      templateUrl: "templates/about.html",
      controller: 'AboutCtrl'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});

