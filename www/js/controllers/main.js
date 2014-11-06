'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('MainCtrl', function ($scope, $location, blueAPI, $ionicSideMenuDelegate, $ionicLoading) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.dataStatus = '';

    $scope.loadData = function loadData(){
      $scope.dataStatus = 'loading';

      $scope.loadingIndicator = $ionicLoading.show({
          template: 'Cargando datos... <br> <i class="icon ion-loading-a"></i>',
          delay:200
      });

      blueAPI.extended_last_price(function(value){
          $scope.dolares = value;
          $ionicLoading.hide();
          $scope.dataStatus = 'loaded';
      },function(response){
        $ionicLoading.hide();
        $scope.dataStatus = 'error';
      });
    }

    $scope.loadData();




  	$scope.dolar_activo = 'blue';

    $scope.cambiarDolar = function (dolar){
      $scope.dolar_activo = dolar;
    };

    $scope.esOficial = function(dolar){
      if (dolar.name.indexOf('oficial') > -1) {
        return true;
      }else{
        return false;
      }
    }
    $scope.esBlue = function(dolar){
      return !$scope.esOficial(dolar);
    }


  });
