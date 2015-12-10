angular.module('app', ['ui.bootstrap']);

angular.module('app').filter('startFrom', function () {
    'use strict';

    return function (input, start) {
        if (input) {
            return input.slice(parseInt(start, 10));
        }
        return [];
    }
});
