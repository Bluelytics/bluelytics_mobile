'use strict';

/**
 * @ngdoc function
 * @name bluemobile.controllers.controller:WordcloudCtrl
 * @description
 * # WordcloudCtrl
 * Controller of the bluemobile.controllers
 */
angular.module('bluemobile.controllers')
  .controller('WordcloudCtrl', function ($scope, blueAPI) {

    var opts = function (list){
      return {
              list: list,
              fontFamily: 'sans',
              backgroundColor: '#eee'
            };
    }

    var convertResources = function(orig){
      var newArr = orig.splice(0,orig.length);
      var finalArr = [];
      for(var i = 0; i < newArr.length; i++){
        finalArr.push([newArr[i][0], newArr[i][1]]);
      }
      return finalArr;
    };

    $scope.wordsOficialistas = blueAPI.wordcloud_oficialistas.query({}, function(value){
      var canvas = $('div#cloud_oficialista > canvas');
      WordCloud(canvas[0], opts(convertResources(value)) );
    });

    $scope.wordsOposicion = blueAPI.wordcloud_oposicion.query({}, function(value){
      var canvas = $('div#cloud_oposicion > canvas');
      WordCloud(canvas[0], opts(convertResources(value)) );
    });
  });
