angular.module('app').directive('tableData', function () {
    'use strict';

    return {
        controller: 'tableDataCtrl',
        replace: true,
        restrict: 'AE',
        templateUrl: '/tmpls/tableData.html'
    };
});
