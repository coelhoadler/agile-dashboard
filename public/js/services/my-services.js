angular.module('agileServices', ['ngResource'])
.factory('resourceUser', function($resource) {
    return $resource('/v1/user/:userId', null, {
        'update' : { 
            method: 'PUT'
        }
    });
})
.factory('cadasterUser', function(resourceUser, $q, $rootScope) {
    let service = {};
    let userBroadcast = "registeredUser";

    service.cadastrar = function (user) {
        // return a promisse
        return $q(function(resolve, reject) {
            if (user._id) {
                resourceUser.update({userId : user._id}, user,
                function() {
                    $rootScope.$broadcast(userBroadcast);
                    resolve({
                        message : 'Usuário ' + user.fullName + ' atualizado com sucesso!',
                        inclusao : false
                    });
                },
                function(error) {
                    reject({
                        message : "Não foi possível alterar os dados do usuário " + user.fullName
                    });
                })
            } else {
                resourceUser.save(user, 
                function() {
                    $rootScope.$broadcast(userBroadcast);                    
                    resolve({
                        message : "Usuário " + user.fullName + ' foi incluído com sucesso!',
                        inclusao : true
                    })
                }, 
                function(error) {
                    reject({
                        message : "Não foi possível incluir o usuário " + user.fullName + "."
                    });
                })
            }
        });
    };
    return service;
})
.factory('ShareData', function() {
    return {
        search : ""
    }
});