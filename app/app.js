var demoApp = angular.module('bookstoreApp', []);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http) {


    $scope.authors = $http
            .get("http://localhost:49893/app/services/WebService.asmx?HelloBooks")
            .then(function (response) { $scope.authors = response.data.records; });
});
    
   
        
   