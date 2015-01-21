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

    $scope.dataStatus = '';

    $scope.loadData = function loadData(){

      var convertValues = function(dolares){
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
      };

      if($window.localStorage['dolares']){
        var dolares = JSON.parse($window.localStorage['dolares']);
        convertValues(dolares);
        $scope.dataStatus = 'loaded';
        $scope.loadingNew = true;
      }else {
        $scope.dataStatus = 'loading';

        $scope.loadingIndicator = $ionicLoading.show({
          template: 'Cargando datos... <br> <i class="icon ion-loading-a"></i>',
          delay:200
        });
      }

      blueAPI.extended_last_price(function(dolares){

        $window.localStorage['dolares'] = JSON.stringify(dolares);
        convertValues(dolares);

          $scope.dataStatus = 'loaded';
          $scope.loadingNew = false;
          $ionicLoading.hide();
      }, function(){
        if($scope.loadingNew){
          $scope.loadingNew = false;
        }else{
          $ionicLoading.hide();
          $scope.dataStatus = 'error';
        }
      });

    };

    $scope.loadData();

  });
