'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers', [])
  .controller('AboutCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  });
