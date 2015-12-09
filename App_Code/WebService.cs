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

    [WebMethod]
    public string ReturnBook(Book book_to_borrow,int member_id)
    {
        using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            

            var member = tdb.Member.First(i => i.MemberID == member_id);
            member.Book.Add(book_to_borrow);
            tdb.SubmitChanges();
            //Dictionary<int, Member> allBorrowedBooks = new Dictionary<int, Member>();
            var allBorrowedBooks =  tdb.Book.All(i => i.LentToMemberID == member_id);
            
            return JsonConvert.SerializeObject(allBorrowedBooks, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }); ;
        }


    }
    
}
