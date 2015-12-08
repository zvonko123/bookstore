var demoApp = angular.module('bookstoreApp', ['datatables']);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http) {



   

    $scope.data = $http
          .get("http://localhost:49893/app/services/WebService.asmx/HelloBooks")
           .then(function (response) {
               $scope.authors = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.authors = $scope.authors.slice(76, -9)
               $scope.authors = JSON.parse($scope.authors);
               console.log($scope.authors);

                
          });
    $scope.bookFormShown = false;
    $scope.booksFromAuthorShown = false;


    //mock data, ask for remote db connection
    //$scope.authors = {
       //"0": { "FirstName": "bjarne", "LastName": "strostup" },
       //"1": { "FirstName": "marko", "LastName": "zagar" },
       //"2": { "FirstName": "tin", "LastName": "ujevic" },
    //}

   $scope.showNewBookForm = function (id) {
       window.alert("Your about to add a new book !");
       $scope.bookFormShown = true;
       $scope.findAuthor(id)
       console.log($scope);
   }

   $scope.showBooksFromAuthor = function (id) {
       window.alert("displayed books from author");
       $scope.booksFromAuthorShown = true;
       $scope.findAuthor(id)
       console.log($scope);

        
   }

   $scope.findAuthor = function (id) {
       for (a in $scope.authors)
       {
           //console.log(a);
           if ($scope.authors[a].AuthorID == id)
               $scope.formAuthor = $scope.authors[a];
                }
       
   }
  

});



   
        
   