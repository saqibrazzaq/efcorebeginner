using AddressBook.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Queries
{
    public class MyApplication
    {
        private readonly AppDbContext _db;

        public MyApplication(AppDbContext db)
        {
            _db = db;
        }

        internal async Task Run()
        {
            Console.WriteLine("Total Contacts: " + _db.Contacts?.Count());
        }
    }
}
