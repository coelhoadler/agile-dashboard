angular.module('agileDirectives', [])
.directive('focus', function() {
    var ddo = {};

    ddo.restrict = "A";

    ddo.link = function($scope, element) {
        element[0].focus();
    }

    return ddo;
});
