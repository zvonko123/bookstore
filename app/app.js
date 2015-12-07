var demoApp = angular.module('bookstoreApp', []);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http) {




    //$scope.authors = $http
    //        .get("http://localhost:49893/app/services/WebService.asmx?HelloBooks")
    //        .then(function (response) { $scope.authors = response.data.records; });
    //mock data, ask for remote db connection
    $scope.data = {
        "1": { "firstname": "bjarne", "lastname": "strostup" },
        "2": { "firstname": "marko", "lastname": "zagar" },
        "3": { "firstname": "tin", "lastname": "ujevic" },
    }

   
});
    
   
        
   