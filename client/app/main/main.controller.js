'use strict';

angular.module('tgPluginApp')
  .controller('MainCtrl', function($scope, ProductService) {
    var that = this;
    this.products = [];

    this.currentFilter = '';

    this.setFilter = function(filterType){
      that.currentFilter = filterType;
    }

    this.getProductsByCurrentFilter = function(){
      return _.filter(that.products, function(product){
        return product.type === that.currentFilter;
      })
    };

    function init() {
      ProductService.getSimilarProductsByProductId(1).then(function(products){
        that.products = products;
      });

      that.setFilter('pants');

    };

    init();

  });