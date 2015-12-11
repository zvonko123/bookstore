var demoApp = angular.module('bookstoreApp', ['datatables','ngDraggable']);

angular.module('bookstoreApp').controller('bookstoreCtrl',
function ($scope,$http,$filter) {

    //borrowing and availing books, add new book copy method and member box
    $scope.borrowingBook = function (book, evt) {
        console.log("trying to borrow book for member..,", $scope.fromMember.MemberID,book);
        var bookAndMemberData = { "book_id": book.BookID, "member_id": $scope.fromMember.MemberID };
        console.log("book and member for post", bookAndMemberData);
       //insert book into borrowed (change book lentTo to user id)
        $http({
            method: 'POST',
            url: 'http://localhost:49893/app/services/WebService.asmx/BorrowBook',
            data: JSON.stringify({ member_id: $scope.fromMember.MemberID, book_id: book.BookID })
        }).then(function (response) {
               
            $scope.helloMember($scope.fromMember.MemberID);
            $scope.allBooks();
            $scope.allMemberBooks();
            console.log("Borrowed books for active member:", $scope.borrowedMemberBooks);
           });
       
        
    }

    $scope.availingBook = function (book, evt) {
        console.log("trying to free book.., book:", book);
         //change book LentTo to null
        
        var bookAndMemberData = { "book_id": book.BookID, "member_id": $scope.fromMember.MemberID };
        console.log("book and member for post", bookAndMemberData);
        //insert book into borrowed (change book lentTo to user id)
        $http({
            method: 'POST',
            url: 'http://localhost:49893/app/services/WebService.asmx/BorrowBook',
            data: JSON.stringify({ member_id: null, book_id: book.BookID })
        }).then(function (response) {

            $scope.helloMember($scope.fromMember.MemberID);
            $scope.allBooks();
            $scope.allMemberBooks();
            console.log("Borrowed books for active member:", $scope.borrowedMemberBooks);
        });

        
        

    }
    
    $scope.allBooks = function () {
        console.log("fetching all non-borrowed.., books:" );
        //change book LentTo to null

        $scope.allAvailableBooks = $http({
            method: 'POST',
            url: 'http://localhost:49893/app/services/WebService.asmx/AllAvailableBooks'
            //,data: JSON.stringify({ member_id: $scope.fromMember.MemberID })
        }).then(function (response) {
               //console.log("avail response looks like", response.data);
               $scope.allAvailableMemberBooks = [];
               $scope.allAvailableBooks = response.data;
               $scope.allAvailableBooks = $scope.allAvailableBooks.slice(76, -9)
               $scope.allAvailableBooks = JSON.parse($scope.allAvailableBooks);
               
               console.log("available(free) books for active member:", $scope.allAvailableBooks);


           });
    }

    $scope.allMemberBooks = function () {
        console.log("fetching all borrowed books...,:");
        //change book LentTo to null

        $http({
            method: 'POST',
            url: 'http://localhost:49893/app/services/WebService.asmx/AllBorrowedBooks',
            data: { member_id: $scope.fromMember.MemberID}
        }).then(function (response) {

            $scope.borrowedMemberBooks = response.data.d;
            $scope.borrowedMemberBooks = JSON.parse(response.data.d);

           
            console.log("borrowed response looks like", $scope.borrowedMemberBooks);
        });
    }


    $scope.data = $http
          .get("http://localhost:49893/app/services/WebService.asmx/HelloBooks")
           .then(function (response) {
               $scope.authors = response.data;
               //$scope.authors = jQuery.xml2json($scope.authors)
               $scope.authors = $scope.authors.slice(76, -9)
               $scope.authors = JSON.parse($scope.authors);
               console.log("authors with relations<br>", $scope.authors);

                
           });

   
    $scope.hello = function () {
        $scope.members = $http
          .get("http://localhost:49893/app/services/WebService.asmx/HelloMembers")
           .then(function (response) {
               $scope.members = response.data;
               $scope.members = $scope.members.slice(76, -9)
               $scope.members = JSON.parse($scope.members)
               console.log("hello members", $scope.members);


           });
    }

    $scope.helloMember = function (id) {
        $scope.findMember(id)
        //console.log($scope);
        $scope.borrowedMemberBooks = [];
        $scope.allAvailableBooks = [];
        
    }


    $scope.hello();
    $scope.filterBookString


    $scope.bookFormShown = false;
    $scope.booksFromAuthorShown = false;
    $scope.authorNewBookShow = false;
    $scope.membersTableShow = false;
    $scope.authorsTableShow = false;
    $scope.draggieDroppieMember = false

    //fix GUI
    $scope.showMembers = function () {
        if ($scope.membersTableShow === true) {
            $scope.membersTableShow = false;
            $scope.draggieDroppieMember = false;
        } else {
            $scope.membersTableShow = true;
            $scope.authorsTableShow = false;
            $scope.authorNewBookShow = false;
            
           

        }
    };

    //fix GUI
    $scope.showAuthors = function () {
        if ($scope.authorsTableShow === true) {
            $scope.authorsTableShow = false;
            $scope.authorNewBookShow = false;
            
        } else {
            $scope.authorsTableShow = true;
            $scope.membersTableShow = false;
            $scope.draggieDroppieMember = false;
            

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

        $scope.helloMember(id);
        $scope.allBooks();
        $scope.allMemberBooks();
        $scope.draggieDroppieMember = true;
          
        
        //$scope.borrowedAuthorBooks = $scope.formAuthor.Book;
        //$scope.availableAuthorBooks = $scope.formAuthor.Book;

    }

   $scope.showNewBookBasket = function (id) {
       //window.alert("Your about to view books from author !");
       
       $scope.findAuthor(id)
       console.log($scope);
       $scope.availableAuthorBooks = [];
       
       for (b in $scope.fromAuthor.Book)
       {
           console.log("logiram knjige kliknutog autora", $scope.fromAuthor.Book[b]);
           //fetch all books from author and push them into array if they are borrowed and/or available
           //below add logic if library has more than 1 of the same book
           if ($scope.fromAuthor.Book[b])
           {
               $scope.availableAuthorBooks.push($scope.fromAuthor.Book[b])
            }
           

       }
       $scope.authorNewBookShow = true;
       //if ($scope.authorNewBookShow === true)
       //{
       //    $scope.authorNewBookShow = false;
       //} else {
       //    $scope.authorNewBookShow = true;
       //}
       console.log("available books from author", $scope.availableAuthorBooks)
       console.log("borrowed books from author", $scope.borrowedAuthorBooks)
       //$scope.borrowedAuthorBooks = $scope.formAuthor.Book;
       //$scope.availableAuthorBooks = $scope.formAuthor.Book;

    }
   
    //we wont need this later
   $scope.showBooksFromAuthor = function (id) {
       window.alert("displayed books from author");
       $scope.booksFromAuthorShown = true;
       $scope.authorNewBookShow = true;
       $scope.findAuthor(id)
       console.log($scope);
       
       

        
   }
   $scope.findMember = function (id) {
       for (a in $scope.members) {
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
   //$scope.findMembersAndAvailableBook = function (bookid) {
   //    for (a in $scope.authors) {
   //        //console.log(a);
   //        if ($scope.members[a].MemberID == id)
   //            $scope.formAuthor = $scope.authors[a];
   //    }

   //}
  
    //new features

   $scope.submitNewBook() = function () {
       //console log authorID,bookTitle,bookDesc
   }


});



   
        
   