'use strict';

angular.module('ComplexityApp')
    .controller('ComplexCtrl', function ($scope, $http) {
        $scope.complex = [];
        $scope.complexProduct = [];

        $scope.GetComplexProduct = function () {
            return this.complexProduct;
        };
        //Load the factory data
        $http.get('scripts/data/factories.json').success(function (data) {
            $scope.factories = data;
        });

        //Load the factory data
        $http.get('scripts/data/items.json').success(function (data) {
            $scope.items = data;
        });

        $scope.AddFactoryToComplex = function ($factory) {
            $factory = $scope.FindFactoryById($factory);
            var complexIndex = $scope.complex.indexOf($factory);
            if (complexIndex === -1) {
                $scope.complex.push($factory);
            } else {
                $scope.complex[complexIndex].amount++;
            }
            $scope.CalculateComplexProduct();
        };

        $scope.RemoveFactoryFromComplex = function ($factory) {
            $factory = $scope.FindFactoryById($factory);
            var complexIndex = $scope.complex.indexOf($factory);
            if ($scope.complex[complexIndex].amount > 1) {
                $scope.complex[complexIndex].amount--;
            } else {
                $scope.complex.splice(complexIndex, 1);
            }
            $scope.CalculateComplexProduct();
        };
        /**
         * @return {number}
         */
        $scope.CheckForMatchingItem = function ($array, $item) {
            for (var i = 0; i < $array.length; i++) {
                if ($array[i].item === $item) {
                    return i;
                }
            }
            return -1;
        };
        $scope.CalculateComplexProduct = function () {
            var itemsProduced = [];
            for (var i = 0; i < $scope.complex.length; i++) {
                var item = this.FindItemById($scope.complex[i].product);
                var index = this.CheckForMatchingItem(itemsProduced, item);

                if (index === -1) {
                    itemsProduced.push({
                        "item": item,
                        "amount": ($scope.complex[i].amount_produced * $scope.complex[i].amount)});
                } else {
                    itemsProduced[index].amount += ($scope.complex[i].amount_produced * $scope.complex[i].amount)
                }
            }
            $scope.complexProduct = itemsProduced;
        };
        /**
         * @return {number}
         */
        $scope.FindFactoryById = function (id) {
            for (var m = 0; m < $scope.factories.length; m++) {
                if ($scope.factories[m].id == id)

                    return $scope.factories[m];
            }
            return -1;
        };
        /**
         * @return {number}
         */
        $scope.FindItemById = function (id) {
            for (var m = 0; m < $scope.items.length; m++) {
                if ($scope.items[m].id == id) {
                    return $scope.items[m];
                }
            }
            return -1;
        };
    });
