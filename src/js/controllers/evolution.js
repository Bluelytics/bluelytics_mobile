'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('EvolutionCtrl', function ($scope, blueAPI, $window, $ionicSideMenuDelegate, $ionicLoading) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.initializeWindowSize = function(){
      $scope.windowHeight = $window.innerHeight;
    };

    $scope.initializeWindowSize();

    angular.element($window).bind('resize', function() {
      $scope.initializeWindowSize();
      $scope.$apply();
    });

    $scope.dataStatus = '';

    $scope.loadData = function loadData(){


      $scope.valores = [];

      if($window.localStorage['evolution']){
        $scope.valores = JSON.parse($window.localStorage['evolution']);

        $scope.dataStatus = 'loaded';
        $scope.loadingNew = true;
      }else {
        $scope.dataStatus = 'loading';

        $scope.loadingIndicator = $ionicLoading.show({
          template: 'Cargando datos... <br> <i class="icon ion-loading-a"></i>',
          delay:200
        });
      }

      blueAPI.graph_data.query({}, function(value, headers){
        var grouped = blueAPI.group_graph_data(value);

        var step = 7;
        var amount = 10;

        $scope.valores = [];
        for(var i = 0; i <= amount; i++){
          var offset = (i-amount)*step;
          var val = grouped[grouped.length-1+offset];
          var st = val.date;
          var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
          var dt = new Date(st.replace(pattern,'$3-$2-$1'));
          val.date = dt;
          $scope.valores.push(val);
        }

        $window.localStorage['evolution'] = JSON.stringify($scope.valores);


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
