// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('bluemobile', [
  'ionic',
  'bluemobile.controllers',
  'bluemobile.services',
  'ngResource',
  'underscore'
  ])

.run(function($ionicPlatform, $ionicSideMenuDelegate) {
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
    if(window.cordova){
      var deleg = $ionicSideMenuDelegate;
      var onMenu = function onMenu(){
        deleg.toggleLeft();
      }
      document.addEventListener("menubutton", onMenu, false);

      navigator.splashscreen.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
      url: "/tab",
      templateUrl: "templates/tabs.html"
    })

    .state('tab.rates', {
      url: "/rates",
      views: {
        'tab-rates': {
          templateUrl: "templates/main.html",
          controller: 'MainCtrl'
        }
      }
    })

    .state('tab.calc', {
      url: "/calc",
      views: {
        'tab-calc': {
          templateUrl: "templates/calculator.html",
          controller: 'CalculatorCtrl'
        }
      }
    })

    .state('tab.evolution', {
      url: "/evolution",
      views: {
        'tab-evolution': {
          templateUrl: "templates/evolution.html",
          controller: 'EvolutionCtrl'
        }
      }
    })

    .state('tab.gap', {
      url: "/gap",
      views: {
        'tab-gap': {
          templateUrl: "templates/gap.html",
          controller: 'GapCtrl'
        }
      }
    })

    .state('tab.about', {
      url: "/about",
      views: {
        'tab-about': {
          templateUrl: "templates/about.html",
          controller: 'AboutCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/rates');
});
