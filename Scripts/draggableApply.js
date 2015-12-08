
           $("#BorrowedBooksPanel").droppable({
               activeClass: "ui-state-hover",
               hoverClass: "ui-state-active",
               drop: function (event, ui) {
                   ui.draggable.draggable();
                   var id = ui.draggable.attr('alt');
                   $scope.borrowBooks = $http
                   .get("http://localhost:49893/app/services/WebService.asmx/BorrowBook")
                   .then(function (response) {
                       $scope.borrowedBook =
                       console.log("Posudjujem knjigu<br>", $scope.borrowedBook);


                   }
           ).then(function successCallback(response) {
               // this callback will be called asynchronously
               // when the response is available
               console.log("success borrowing book");
           }, function errorCallback(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               console.log("failed borrowing book");
           });
               }
           });

$("#AvailableBooksPanel").droppable({
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function (event, ui) {
        ui.draggable.draggable();
        var id = ui.draggable.attr('alt');
        $scope.books = $http
        .get("http://localhost:49893/app/services/WebService.asmx/FreeBook")
        .then(function (response) {
            $scope.availableBook = response.data;

            console.log("Vracam knjigu<br>", $scope.availableBook);


        }
).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("success availing book");
}, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log("failed availing book");
});
    }
});

