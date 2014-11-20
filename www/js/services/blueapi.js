'use strict';

/**
 * @ngdoc service
 * @name bluemobile.services.blueAPI
 * @description
 * # blueAPI
 * Service in the bluemobile.services.blueAPI. - API of bluelytics wrapper
 */
angular.module('bluemobile.services', [])
  .service('blueAPI', function blueAPI($resource, $q, _) {
    var valoresBlue = null;

    var backendUrl = 'http://localhost:8000/';

    var percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    }

    var dateFormat = function dateFormat(d) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    };

    var last_price_resource = $resource( backendUrl + 'api/last_price', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var all_currencies_resource = $resource( backendUrl + 'api/all_currencies', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var graph_data_resource = $resource( backendUrl + 'data/graphs/evolution.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });

    var wordcloud_oficialistas_resource = $resource( backendUrl + 'data/words/oficialistas.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var wordcloud_oposicion_resource = $resource( backendUrl + 'data/words/oposicion.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var forecast_dates = $resource( backendUrl + 'data/forecast/json_dates_forecasted.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values = $resource( backendUrl + 'data/forecast/json_forecasted.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });
    var forecast_dates_history = $resource( backendUrl + 'data/forecast/json_dates_history.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values_history = $resource( backendUrl + 'data/forecast/json_history.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });



    return {
        'last_price': last_price_resource,
        'all_currencies': all_currencies_resource,
        'graph_data': graph_data_resource,
        'wordcloud_oficialistas': wordcloud_oficialistas_resource,
        'wordcloud_oposicion': wordcloud_oposicion_resource,

        'extended_last_price': function extended_last_price(callback, err_callback){
            var mycall = callback;
            var errcall = err_callback;
            last_price_resource.query({}, function(value, headers){
                var newDolares = [];

                for(var i = 0; i < value.length;i++){
                    var dolar = value[i];
                    dolar.compra_dif = dolar.compra - dolar.compra_ayer;
                    dolar.venta_dif = dolar.venta - dolar.venta_ayer;
                    dolar.avg = (dolar.compra + dolar.venta) / 2;
                    dolar.avg_ayer = (dolar.compra_ayer + dolar.venta_ayer) / 2;
                    dolar.avg_dif = dolar.avg - dolar.avg_ayer;
                    newDolares.push(dolar);
                }

                mycall(value);
            }, function(response){
                err_callback(response);
            });
        },

        'group_graph_data': function groupGraphData(rawData){
            var allData = [];

            for(var key in rawData){
                if(rawData.hasOwnProperty(key) && key != '$promise' && key != '$resolved'){
                    var appendData = _.chain(rawData[key]).map(function(b){
                      var tmp_date = new Date(b.date);
                      b.epoch = tmp_date.getTime()/1000;
                      b.datepart = dateFormat(tmp_date);
                      b.source = key;
                      return b;
                    }).value();
                    allData = allData.concat(appendData);
                  }
              }


            var dataByDate = _.groupBy(allData, function(a){return a.datepart;});

            var finalGrouped = _.chain(dataByDate).map(function(d){
              var max_oficial = _.max(d, function(val){
                if (val.source == 'Oficial'){return val.value;} else {return 0;}
              }).value;

              var sum_blue = _.reduce(d, function(memo, sum){
                if (sum.source != 'Oficial'){ return memo + sum.value;} else {return memo;}
              }, 0);

              var count_blue = _.chain(d).filter(function(c) {
                return c.source != 'Oficial';
              }).size().value();

              return {'intDate': d[0].epoch,'date': d[0].datepart, 'oficial': max_oficial, 'blue': sum_blue/count_blue}

            }).filter(function(d){
              return (d.oficial > 0 && d.blue > 0 && (d.oficial - d.blue) != 0);
            }).sortBy(function(d){return d.intDate;}).value();

            return finalGrouped;
        },

    };

  });
