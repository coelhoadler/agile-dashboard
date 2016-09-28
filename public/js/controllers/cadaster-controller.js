angular.module('agileDash')
.controller('CadasterController', ['$scope', 'cadasterUser', 'resourceUser', '$routeParams', 'ShareData', '$rootScope', '$location',
function($scope, cadasterUser, resourceUser, $routeParams, shareData, $rootScope, $location) {
    
    $rootScope.$broadcast('hideUsersSearch');
    let snackbarContainer = document.querySelector('#toast-messages');

    if ($routeParams.userId) {
        resourceUser.get({userId : $routeParams.userId},
        function(user) {
            if (user._id) {
                let gender = user.gender;
                user.born = new Date(user.born);
                user.gender = gender;
                $scope.user = user;
            } else {
                $location.path('/dashboard/user/list');
            }
        }, function(error) {
            snackbarContainer.MaterialSnackbar.showSnackbar({message: error});
        });
    } else {
        $scope.user = {
            gender : 'male'
        };
    }

    $scope.save = () => {
        if ($scope.userForm.$valid) {
            cadasterUser.cadastrar($scope.user)
            .then(function(retorno) {
                snackbarContainer.MaterialSnackbar.showSnackbar({message: retorno.message});
                if (retorno.inclusao) {
                    $scope.user = {};
                }
                let inpUserName = document.querySelector('#fullName_user');
                inpUserName.focus();
                
            })
            .catch(function(error) {
                snackbarContainer.MaterialSnackbar.showSnackbar({message: error.message});
            });
        }
    }
}]);