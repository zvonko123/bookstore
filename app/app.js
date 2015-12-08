var demoApp = angular.module('bookstoreApp', ['datatables','ngDraggable']);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http,$filter) {

    //borrowing and availing books, add new book copy method and member box
    $scope.borrowingBook = function (book, evt) {
        console.log("trying to borrow book.., book:", book);
        //$scope.borrowedAuthorBooks.push(book);
        
        
        $scope.borrowedAuthorBooks = $scope.borrowedAuthorBooks.concat(book);
        angular.forEach($scope.availableAuthorBooks, function (value, key) {
            if (value.BookID == book.BookID) {
                delete $scope.availableAuthorBooks[key];
            }

        });
        //$scope.borrowedAuthorBooks.push({ "BookID": book.BookID, "Title": book.Title });
        
    }

    $scope.availingBook = function (book, evt) {
        console.log("trying to free book.., book:", book);
        //$scope.availableAuthorBooks.push(book);
        //change to non mock and add rest
        $scope.availableAuthorBooks = $scope.availableAuthorBooks.concat(book);

        angular.forEach($scope.borrowedAuthorBooks, function (value, key) {
            if (value.BookID == book.BookID) {
                delete $scope.borrowedAuthorBooks[key];
            }

        });
        //$scope.availableAuthorBooks.push({ "BookID": book.BookID, "Title": book.Title });

    }

    
    $scope.data = $http
          .get("http://localhost:49893/app/services/WebService.asmx/HelloBooks")
           .then(function (response) {
               $scope.authors = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.authors = $scope.authors.slice(76, -9)
               $scope.authors = JSON.parse($scope.authors);
               console.log("autori s knjigama<br>", $scope.authors);

                
           });


    $scope.members = $http
          .get("http://localhost:49893/app/services/WebService.asmx/HelloMembers")
           .then(function (response) {
               $scope.members = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.members = $scope.members.slice(76, -9)
               $scope.members = JSON.parse($scope.members)
               console.log("memberi s posudjenim knjigama<br>", $scope.members);


           });

    $scope.bookFormShown = false;
    $scope.booksFromAuthorShown = false;
    $scope.draggieDroppie = false;

    $scope.borrowedAuthorBooks = [];
    $scope.borrowedAuthorBooks = {{"0": "BookID": "9", "Title": "hitchhiker" },1:{ "BookID": "10", "Title": "ilijada" }};
    $scope.availableAuthorBooks = [];
    //$scope.availableAuthorBooks = JSON.parse($scope.availableAuthorBooks);
    //$scope.borrowedAuthorBooks = JSON.parse($scope.borrowedAuthorBooks);

    //mock data, ask for remote db connection
    //$scope.authors = {
       //"0": { "FirstName": "bjarne", "LastName": "strostup" },
       //"1": { "FirstName": "marko", "LastName": "zagar" },
       //"2": { "FirstName": "tin", "LastName": "ujevic" },
    //}

   $scope.showBookBasket = function (id) {
       window.alert("Your about to view books from author !");
       
       $scope.findAuthor(id)
       console.log($scope);

       for (b in $scope.fromAuthor.Book)
       {
           console.log("logiram knjige kliknutog autora", $scope.fromAuthor.Book[b]);
           //fetch all books from author and push them into array if they are borrowed and/or available
           //below add logic if library has more than 1 of the same book
           if ($scope.fromAuthor.Book[b].LentToMemberID === null)
           {
               $scope.availableAuthorBooks.push($scope.fromAuthor.Book[b])
            }
           else {
               $scope.borrowedAuthorBooks.push($scope.fromAuthor.Book[b])
           }

       }
       $scope.draggieDroppie = true;
       console.log("available books from author", $scope.availableAuthorBooks)
       console.log("borrowed books from author", $scope.borrowedAuthorBooks)
       //$scope.borrowedAuthorBooks = $scope.formAuthor.Book;
       //$scope.availableAuthorBooks = $scope.formAuthor.Book;

    }
   
    //we wont need this later
   $scope.showBooksFromAuthor = function (id) {
       window.alert("displayed books from author");
       $scope.booksFromAuthorShown = true;
       $scope.draggieDroppie = true;
       $scope.findAuthor(id)
       console.log($scope);
       
       

        
   }

   $scope.findAuthor = function (id) {
       for (a in $scope.authors)
       {
           //console.log(a);
           if ($scope.authors[a].AuthorID == id)
               $scope.fromAuthor = $scope.authors[a];
                }
       
   }
    //T0d0 add logic for finding available books for lending
   $scope.findMembersAndAvailableBook = function (bookid) {
       for (a in $scope.authors) {
           //console.log(a);
           if ($scope.members[a].MemberID == id)
               $scope.formAuthor = $scope.authors[a];
       }

   }
  

});



   
        
   