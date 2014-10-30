'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('CalculatorCtrl', function ($scope, $filter, blueAPI, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.moneda = {};
    $scope.calculo = {};
    $scope.dolar = {};
    $scope.calculo.ars = 0;
    $scope.calculo.ext = 0;

    $scope.update_ars = function update_ars(){
        if($scope.dolar.activo.avg && $scope.moneda.selected){
            $scope.calculo.ars =  parseFloat( (($scope.calculo.ext / $scope.moneda.selected.value) * $scope.dolar.activo.avg).toFixed(2));
        }
    };

    $scope.update_ext = function update_ext(){
        if($scope.dolar.activo.avg && $scope.moneda.selected){
            $scope.calculo.ext =  parseFloat( (($scope.calculo.ars / $scope.dolar.activo.avg) * $scope.moneda.selected.value).toFixed(2));
            
            console.log($scope.calculo.ars + "/" + $scope.dolar.activo.avg);
        }

    };

    blueAPI.extended_last_price(function(value){
        $scope.dolares = $filter('filter')(value, function(dolar){
            return (dolar.name === 'oficial' || dolar.name === 'blue' || dolar.name === 'oficial_20' || dolar.name === 'oficial_35');
        }, true);
        $scope.dolar.activo = $scope.dolares[0];
        $scope.update_ext();
    });


    $scope.monedas = blueAPI.all_currencies.query({}, function(){
        for(var i = 0; i < $scope.monedas.length; i++){
            if($scope.monedas[i].code === 'USD'){
                $scope.moneda.selected = $scope.monedas[i];
            }
            
        }
    });
    


  });
