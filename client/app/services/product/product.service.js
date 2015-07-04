'use strict';

angular.module('tgPluginApp')
  .service('ProductService', function ($http, appConfig, $q) {

    
    this.getSimilarProductsByProductId = function(productId){
      var defer = $q.defer();
      var url = _.template('${apiUrl}extremeli.trendi.guru/api/images', {
        apiUrl: appConfig.apiUrl
      });

      $http.get(url).then(function(response){
        // defer.resolve(response.data);
        defer.resolve(window.products);
      });
      return defer.promise;
    };
  });



