'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('EvolutionCtrl', function ($scope, blueAPI, $window, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.valores = [];

    blueAPI.graph_data.query({}, function(value, headers){
      var grouped = blueAPI.group_graph_data(value);

      var step = 7;
      var amount = 10;

      $scope.valores = [];
      for(var i = 0; i <= amount; i++){
        var offset = (i-amount)*step;
        $scope.valores.push(grouped[grouped.length-1+offset]);

      }
    });

  });
