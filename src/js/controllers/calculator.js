'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('CalculatorCtrl', function ($scope, $filter, blueAPI, $ionicSideMenuDelegate, $ionicLoading, $window) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.moneda = {};
    $scope.calculo = {};
    $scope.dolar = {};
    $scope.calculo.ars = 0;
    $scope.calculo.ext = 1;

    $scope.update_ars = function update_ars(){
        if($scope.dolar.activo.avg && $scope.moneda.selected){
            $scope.calculo.ars =  parseFloat( (($scope.calculo.ext / $scope.moneda.selected.value) * $scope.dolar.activo.avg).toFixed(2));
        }
    };

    $scope.update_ext = function update_ext(){
        if($scope.dolar.activo.avg && $scope.moneda.selected){
            $scope.calculo.ext =  parseFloat( (($scope.calculo.ars / $scope.dolar.activo.avg) * $scope.moneda.selected.value).toFixed(2));
        }

    };

    $scope.dataStatus = '';

    $scope.loadData = function loadData(){

      var selectUSD = function(){
        for(var i = 0; i < $scope.monedas.length; i++){
          if($scope.monedas[i].code === 'USD'){
            $scope.moneda.selected = $scope.monedas[i];
          }
        }
      };

      if($window.localStorage['dolares'] && $window.localStorage['monedas']){
        $scope.dolares = JSON.parse($window.localStorage['dolares']);
        $scope.monedas = JSON.parse($window.localStorage['monedas']);

        $scope.dolar.activo = $scope.dolares[0];
        selectUSD();

        $scope.dataStatus = 'loaded';
        $scope.loadingNew = true;
      }else {
        $scope.dataStatus = 'loading';

        $scope.loadingIndicator = $ionicLoading.show({
          template: 'Cargando datos... <br> <i class="icon ion-loading-a"></i>',
          delay:200
        });
      }


      blueAPI.extended_last_price(function(value){
          $scope.dolares = $filter('filter')(value, function(dolar){
              return (dolar.name === 'oficial' || dolar.name === 'blue' || dolar.name === 'oficial_20' || dolar.name === 'oficial_35');
          }, true);
          $scope.dolar.activo = $scope.dolares[0];

          $window.localStorage['dolares'] = JSON.stringify($scope.dolares);
      }, function(){});


      blueAPI.all_currencies.query({}, function(monedas){
        $scope.monedas = monedas;
          $window.localStorage['monedas'] = JSON.stringify(monedas);
          selectUSD();

          $scope.update_ars();
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
