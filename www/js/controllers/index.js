'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the bluemobile.controllers
 */
 angular.module('bluemobile.controllers')
  .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.anyDolarActive = function () {
        return $location.path().slice(0, 7) == '/dolar/' || $location.path() == '/';
    };

}]);