var demoApp = angular.module('demoApp', []);

angular.module('demoApp').controller('bookstoreCtrl',
function ($scope) {


    $scope.authors = $http
            .post("http://localhost:49893/app/services/WebService.asmx?HelloBooks")
            .then(function (response) { $scope.authors = response.data.records; });
});
    
   
        
   