'use strict';

angular.module('ComplexityApp')
    .controller('ComplexCtrl', function ($scope, $http) {
        $scope.complex = [];

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
        };

        $scope.RemoveFactoryFromComplex = function ($factory) {
            $factory = $scope.FindFactoryById($factory);
            var complexIndex = $scope.complex.indexOf($factory);
            if ($scope.complex[complexIndex].amount > 1) {
                $scope.complex[complexIndex].amount--;
            } else {
                $scope.complex.splice(complexIndex, 1);
            }
        };

        $scope.CaculateComplexProduct = function () {
            var itemsProduced = [];

            for (var i = 0; i < $scope.complex.length; i++) {
                var item = { 'item': $scope.FindItemById[$scope.complex[i].product], 'amount': $scope.complex[i].amount_produced};
                itemsProduced.push(item);
            }
            return itemsProduced;
        };
        $scope.FindFactoryById = function (id) {
            for (var m = 0; m < $scope.factories.length; m++) {
                if ($scope.factories[m].id == id)

                    return $scope.factories[m];
            }
            return -1;
        };
        $scope.FindItemById = function (id) {
            for (var m = 0; m < $scope.items.length; m++) {
                if ($scope.items[m].id == id)
                    return $scope.items[m];
            }
            return -1;
        };
    });
