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
    
}
