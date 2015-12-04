using Bookstore.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;



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
        //we need a connection here secured by the server

        // Northwnd inherits from System.Data.Linq.DataContext.

// or, if you are not using SQL Server Express
// Northwnd nw = new Northwnd("Database=Northwind;Server=server_name;Integrated Security=SSPI");

   // var baza = new L

    
    //from author in baza.Author
    //where author.City == "London"
    //select *

        //foreach (var customer in baza)
        //{
        //    Console.WriteLine(customer);
        //}

       using (var tdb = new Database("server=DATA;database=STIMAC_BOOKSTORE;user id=stimac_user; password=stimac_user;"))
        {
            var sviAutori = tdb.Author.ToList();
            List<Author> sviAutoriLista = new List<Author>();
            foreach (var a in sviAutori)
            {
                sviAutoriLista.Add(a);
            }
            return sviAutoriLista.ToString();
        }

        
    }
    
}
