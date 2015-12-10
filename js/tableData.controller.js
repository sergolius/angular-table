angular.module('app').controller('tableDataCtrl', ['$scope', '$log', function ($scope, $log) {
    'use strict';

    $scope.sorting = {
        asc: [1, -1],
        desc: [-1, 1],
        lastSorted: '',
        sort: false
    };
    $scope.search = '';
    $scope.forRender = {
        setName: null
    };
    $scope.iScope = { // for object ref
        data: null,
        dataTableHead: null,
        dataTableBody: null
    };
    $scope.keys = [];

    $scope.itemsPerPageValues = [10, 25, 50];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

    $scope.$watch('iScope.data', function (newValue, oldValue, scope) {
        if (newValue && typeof newValue !== 'object') {
            try {
                $scope.iScope.data = JSON.parse(newValue);
                $scope.useData();
            } catch (err) {
                $scope.iScope.data = null;
                alert('Wrong data\'s format! Use *.json.');
                $log.error(err);
            }
        }
    });

    $scope.sort = function (key) {
        var index = $scope.keys.indexOf(key);

        if (index === -1) {
            return;
        }

        var sort = ($scope.sorting.lastSorted === key && $scope.sorting.sort) ? 'desc' : 'asc';
        $scope.sorting.sort = !$scope.sorting.sort;
        $scope.sorting.lastSorted = key;

        $scope.iScope.dataTableBody.sort(function (a, b) {
            if (a[index] === b[index]) {
                return 0;
            }

            return a[index] > b[index] ? $scope.sorting[sort][0] : $scope.sorting[sort][1];
        });

        $log.log($scope.iScope.dataTableBody[0]);
    };

    $scope.useData = function (key) {
        if (key) {
            $scope.iScope.data = $scope.data[key];
        }

        if ($scope.iScope.data) {
            try {
                $scope.iScope.dataTableHead = $scope.iScope.data[0];
                $scope.iScope.dataTableBody = $scope.iScope.data.slice(1);
                $scope.keys = Object.keys($scope.iScope.dataTableHead);

                $log.warn($scope.iScope.dataTableBody.length);
                $scope.currentPage = 1;
            } catch (err) {
                alert('Wrong json\'s format!');
                $log.error(err);
                $scope.iScope.data = $scope.iScope.dataTableHead = $scope.iScope.dataTableBody = null;
            }
        }
    };

    $scope.pageChanged = function () {
        $log.log('Page changed to: %s', $scope.currentPage);
    };
}]);
