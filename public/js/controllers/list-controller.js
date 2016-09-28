angular.module('agileDash')
.controller('ListController', ['$scope', 'resourceUser', 'ShareData', '$rootScope',
function($scope, resourceUser, shareData, $rootScope) {
    
    $scope.myData2 = shareData;
    $rootScope.$broadcast('showUsersSearch');
    $scope.noReg = false;
    let snackbarContainer = document.querySelector('#toast-messages');

    let _listUsers = () => {
        resourceUser.query(function(users) {
            $scope.users = users;
            if (whatsTheSizeOfUsers() == 0) {
                $scope.noReg = true;
            } else {
                $scope.noReg = false;
            }
        },
        function(error) {
            snackbarContainer.MaterialSnackbar.showSnackbar({error});
        });
    }

    // Event to remove an user
    $scope.remove = (user) => {
        var userName = user.fullName;
        if (confirm("Excluir o usuário " + userName  + "?")) {
            resourceUser.delete({userId : user._id},
            () => {
                var iUser = $scope.users.indexOf(user);
                $scope.users.splice(iUser, 1);
                snackbarContainer.MaterialSnackbar.showSnackbar({message: "O Usuário " + userName + " foi removido com sucesso."});
                if (whatsTheSizeOfUsers() == 0) {
                    $scope.noReg = true;
                }
            },
            (error) => {
                snackbarContainer.MaterialSnackbar.showSnackbar({message: "Não foi possível remover o usuário "+ userName + "."});
            });            
        }
    };

    // Count the size of regs into $scope.users
    let whatsTheSizeOfUsers = () => {
        let len = 0;
        if ($scope.users) {
            return $scope.users.length;
        }
        return len;
    }

    _listUsers();
}]);