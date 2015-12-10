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
            int i = 0;
            foreach (var a in allAvailableBooks)
            {
                i++;
                if (a.LentToMemberID == null)
                allAvailableBooksFiltered.Add(i, a);
            }



            return JsonConvert.SerializeObject(allAvailableBooksFiltered, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }); ;
        }


    }

    [WebMethod]
    public string BorrowBook(Book book,Member member,int member_id)
    {
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            

        }

        return 1;
    }
    
}
