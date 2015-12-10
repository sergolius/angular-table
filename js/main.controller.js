angular.module('app').controller('mainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
    'use strict';

    $scope.data = {
        small: null,
        large: null
    };

    Object.keys($scope.data).forEach(function (key) {
        $http.get('/json/' + key + '.json').then(function (response) {
            $scope.data[key] = response.data;
        }, function () {
            $log.error('Error getting data of %s.', key);
        });
    });
}]);
