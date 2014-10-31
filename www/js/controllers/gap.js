'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:GapCtrl
 * @description
 * # GapCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('GapCtrl', function ($scope, blueAPI, $window, $ionicSideMenuDelegate, $ionicLoading) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.loadingIndicator = $ionicLoading.show({
        template: 'Cargando datos...',
        delay:200
    });
    
    /* Gap calculator */

    $scope.valorCompare = 1;

    $scope.valorDolarBlue = 0;
    $scope.valorDolarOficial = 0;
    $scope.valorDolarAhorro = 0;
    $scope.valorDolarTarjeta = 0;

    $scope.gap = function gap(ofi, blue){
        return blue - ofi;
    }

    $scope.percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    }

    $scope.percFormat = function percFormat(value){
      return (value*100).toFixed(2) + "%";
    }

    /* Requests */

    blueAPI.extended_last_price(function(dolares){
                
        for(var i = 0; i < dolares.length; i++){
            var dolar = dolares[i];
            switch(dolar.name){
                case 'oficial':
                    $scope.valorDolarOficial = dolar.avg;
                    break;
                case 'oficial_20':
                    $scope.valorDolarAhorro = dolar.avg;
                    break;
                case 'oficial_35':
                    $scope.valorDolarTarjeta = dolar.avg;
                    break;
                case 'blue':
                    $scope.valorDolarBlue = dolar.avg;
                    break;
            }
        }

        
        $scope.loadingIndicator.hide();
    });

  });
