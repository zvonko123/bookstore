using Bookstore.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;



/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {

    public WebService () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloBooks() {
       using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            var sviAutori = tdb.Author.ToList();
            Dictionary<int,Author> sviAutoriLista = new Dictionary<int,Author>();
            foreach (var a in sviAutori)
            {
                int i = sviAutori.IndexOf(a);
               sviAutoriLista.Add(i,a);
            }
            
           
           
            return JsonConvert.SerializeObject(sviAutoriLista,new JsonSerializerSettings()
                        { 
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }); ;
        }

        
    }

    [WebMethod]
    public string HelloMembers()
    {
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            var sviMemberi = tdb.Member.ToList();
            Dictionary<int, Member> sviMemberiLista = new Dictionary<int, Member>();
            int i = sviMemberiLista.Count;
            foreach (var a in sviMemberi)
            {
                i--;
                sviMemberiLista.Add(i,a);
            }



            return JsonConvert.SerializeObject(sviMemberiLista, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }); ;
        }


    }


    public class Book2 { }

    [WebMethod]
    public string AllAvailableBooks()
    {   //todo we only need books here, pitchfork
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {   
            //Select(i => new {BookID=i.BookID,Title = i.Title, })
            var allAvailableBooks = tdb.Book.ToList();
            Dictionary<int, Book> allAvailableBooksFiltered = new Dictionary<int, Book>();
            int index = 0;
            foreach (var a in allAvailableBooks)
            {
                index++;
                if (a.LentToMemberID == null)
                allAvailableBooksFiltered.Add(index, a);
            }



            return JsonConvert.SerializeObject(allAvailableBooksFiltered, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }); ;
        }


    }

    [WebMethod]
    public string AllBorrowedBooks(string member_id)
    {   //todo we only need books here, pitchfork
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            //Select(i => new {BookID=i.BookID,Title = i.Title, })
            var allBorrowedBooks = tdb.Book.ToList();
            Dictionary<int, Book> allBorrowedBooksFiltered = new Dictionary<int, Book>();
            int index = 0;
            foreach (var a in allBorrowedBooks)
            {
                index++;
                if (a.LentToMemberID == int.Parse(member_id))
                {
                    allBorrowedBooksFiltered.Add(a.BookID, a);
                }
            }



            return JsonConvert.SerializeObject(allBorrowedBooksFiltered, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }); ;
        }

    }


    public class statusOK:Object
    {
        public string msg
        {
            get { 
                return "1:success borrowing book"; }
        }
    }

    public class statusFAIL:Object
    {
        public string msg
        {
            get { 
                return "-1:failed with book operation. contact the devs"; }
        }
    }

    [WebMethod]
    public string BorrowBook(string member_id,string book_id)
    {
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            Console.Write("member and book"+member_id + book_id);
            //string query = "UPDATE Book set LentToMemberID='" + member_id + "' where BookID ='" + book_id + "'";
            //tdb.ExecuteQuery<Book>(query);

            //borrowing and availing in one service (null member means freeing book)
            if (member_id == null)
            {
                var bookToBorrow = tdb.Book.First(i => i.BookID == int.Parse(book_id));
                bookToBorrow.LentToMemberID = null;
                tdb.SubmitChanges();
            }
            else
            {
                var bookToBorrow = tdb.Book.First(i => i.BookID == int.Parse(book_id));
                bookToBorrow.LentToMemberID = int.Parse(member_id);
                tdb.SubmitChanges();
            
            }
            
        }

        return JsonConvert.SerializeObject(new statusOK());
    }

   [WebMethod]
    public string NewBook(string author, string title, string description)
    {
        var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;");

        var books = tdb.Book;
        var newBook = new Book(){
        CoverTypeID=1,GenreID=1, ISBN="ISBN2",Title = title,Summary = description,AuthorID=int.Parse(author),InsertDate= DateTime.Now
        };
        tdb.Book.InsertOnSubmit(newBook);
        tdb.SubmitChanges();

       return JsonConvert.SerializeObject(new statusOK());
       
    }
    
}
