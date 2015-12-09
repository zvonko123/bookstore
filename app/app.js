var demoApp = angular.module('bookstoreApp', ['datatables','ngDraggable']);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http,$filter) {

    //borrowing and availing books, add new book copy method and member box
    $scope.borrowingBook = function (book, evt) {
        console.log("trying to borrow book.., book:", book);
        
        $scope.borrowedMemberBooks = $scope.borrowedMemberBooks.concat(book);
        $scope.borrowedMemberBooks = $http
          .post("http://localhost:49893/app/services/WebService.asmx/BorrowBook")
           .then(function (response) {
               $scope.borrowedMemberBooks = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.borrowedMemberBooks = $scope.authors.slice(76, -9)
               $scope.borrowedMemberBooks = JSON.parse($scope.authors);
               console.log("Borrowed books for active member:", $scope.borrowedMemberBooks);


           });
       
        
    }

    $scope.availingBook = function (book, evt) {
        console.log("trying to free book.., book:", book);
         //change to non mock and add rest
        $scope.borrowedMemberBooks = $scope.borrowedMemberBooks.concat(book);
        $scope.borrowedMemberBooks = $http
          .post("http://localhost:49893/app/services/WebService.asmx/BorrowBook")
           .then(function (response) {
               $scope.borrowedMemberBooks = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.borrowedMemberBooks = $scope.authors.slice(76, -9)
               $scope.borrowedMemberBooks = JSON.parse($scope.authors);
               console.log("Borrowed books for active member:", $scope.borrowedMemberBooks);


           });

        
        

    }

    $scope.allBooks = function () {
        //we need filter droppie here
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
               $scope.members = $scope.members.slice(76, -9)
               $scope.members = JSON.parse($scope.members)
               console.log("memberi s posudjenim knjigama<br>", $scope.members);


           });

    $scope.bookFormShown = false;
    $scope.booksFromAuthorShown = false;
    $scope.draggieDroppie = false;
    $scope.membersTableShow = false;
    $scope.draggieDroppieMember = false

    $scope.showMembers = function () {
        if ($scope.membersTableShow === true) {
            $scope.membersTableShow = false;
        } else {
            $scope.membersTableShow = true;
        }
    };
    //$scope.borrowedAuthorBooks = {{"0": "BookID": "9", "Title": "hitchhiker" },1:{ "BookID": "10", "Title": "ilijada" }};
    
    //$scope.availableAuthorBooks = JSON.parse($scope.availableAuthorBooks);
    //$scope.borrowedAuthorBooks = JSON.parse($scope.borrowedAuthorBooks);

    //mock data, ask for remote db connection
    //$scope.authors = {
       //"0": { "FirstName": "bjarne", "LastName": "strostup" },
       //"1": { "FirstName": "marko", "LastName": "zagar" },
       //"2": { "FirstName": "tin", "LastName": "ujevic" },
    //}
    $scope.showBookBasketforMember = function (id) {
        //window.alert("Your about to view books from author !");

        $scope.findMember(id)
        console.log($scope);
        $scope.availableMemberBooks = [];
        $scope.borrowedMemberBooks = [];
        for (b in $scope.fromMember.Book) {
            console.log("logiram knjige kliknutog membera(basket)", $scope.fromAuthor.Book[b]);
            //fetch all books from author and push them into array if they are borrowed and/or available
            //below add logic if library has more than 1 of the same book
            if ($scope.fromMember.Book[b].LentToMemberID === null) {
                $scope.availableMemberBooks.push($scope.fromAuthor.Book[b])
            }
            else {
                $scope.borrowedMemberrBooks.push($scope.fromAuthor.Book[b])
            }

        }
        if ($scope.draggieDroppieMember === true) {
            $scope.draggieDroppieMember = false;
        } else {
            $scope.draggieDroppieMember = true;
        }
        console.log("available books from Member", $scope.allBooks)
        console.log("borrowed books from Member", $scope.borrowedAuthorBooks)
        //$scope.borrowedAuthorBooks = $scope.formAuthor.Book;
        //$scope.availableAuthorBooks = $scope.formAuthor.Book;

    }

   $scope.showBookBasket = function (id) {
       //window.alert("Your about to view books from author !");
       
       $scope.findAuthor(id)
       console.log($scope);
       $scope.availableAuthorBooks = [];
       $scope.borrowedAuthorBooks = [];
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
       if ($scope.draggieDroppie === true)
       {
           $scope.draggieDroppie = false;
       } else {
           $scope.draggieDroppie = true;
       }
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
   $scope.findMember = function (id) {
       for (a in $scope.authors) {
           //console.log(a);
           if ($scope.members[a].MemberID == id)
               $scope.fromMember = $scope.members[a];
       }

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



   
        
   