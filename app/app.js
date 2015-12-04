(
function () {
    'use strict';
    

    angular.module("bookstoreApp",[])
    .controller('bookstoreCtrl', function ($scope, $http) {
        $http
            .get("http://localhost:49893/app/services/WebService.asmx?HelloBooks")
            .then(function (response) { $scope.names = response.data.records; });
       
    }
        
    )});