angular.module('agileDash')
.controller('AppController', ['$scope','ShareData',
function($scope, shareData) {

    $scope.userName = "Adler Coelho Santos";

    $scope.inpTextSearchUser = shareData;
    $scope.title = "Agile Dashboard";
    $scope.showUsersSearch = false;

    $scope.$on('showUsersSearch', function() {
        $scope.showUsersSearch = true;
        $scope.currentPage = "Usuários Cadastrados";
    });

    $scope.$on('hideUsersSearch', function() {
        $scope.showUsersSearch = false;
            $scope.currentPage = "Novo Usuário";
    });    

}]);