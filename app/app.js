var demoApp = angular.module('bookstoreApp', []);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http) {



    $scope.bookFormHidden = true;
    $scope.data = $http
            .get("http://localhost:49893/app/services/WebService.asmx/HelloBooks")
            .then(function (response) {
                $scope.authors = response.data;
                //$scope.authors = jQuery.xml2json($scope.authors)
                $scope.authors = $scope.authors.slice(76, -9)
                $scope.authors = JSON.parse($scope.authors);
                console.log($scope.authors);

                
          });



    //mock data, ask for remote db connection
   // $scope.data = {
   //     "1": { "firstname": "bjarne", "lastname": "strostup" },
   //     "2": { "firstname": "marko", "lastname": "zagar" },
   //     "3": { "firstname": "tin", "lastname": "ujevic" },
   // }

   $scope.showNewBookForm = function () {
       window.alert("addnewbookcode");
       $scope.bookFormHidden = false;
   }

  

});



   
        
   