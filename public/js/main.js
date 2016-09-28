angular.module('agileDash', ['ngRoute', 'agileServices', 'agileFilters', 'agileDirectives', 'ui.mask'])
.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/dashboard/user/list', {
        templateUrl : 'partials/list.html',
        controller  : 'ListController'        
    });
    
    $routeProvider.when('/dashboard/user/cadaster', {
        templateUrl : 'partials/cadaster.html',
        controller : "CadasterController"
    });    

    $routeProvider.when('/dashboard/user/edit/:userId', {
        templateUrl : 'partials/cadaster.html',
        controller : "CadasterController"
    });    

    $routeProvider.otherwise({redirectTo : '/dashboard/user/list'});

})
.run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
        $timeout(() => {
            componentHandler.upgradeAllRegistered();
        });
    });
});