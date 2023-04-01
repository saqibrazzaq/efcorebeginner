using AddressBook.Data;
using AddressBook.Entities;
using AddressBook.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Queries.Queries
{
    public class OneTable
    {
        private readonly AppDbContext _db;

        public OneTable(AppDbContext db)
        {
            _db = db;
        }

        public void SelectAll()
        {
            var allCountries = _db.Countries;
            foreach(var country in allCountries)
            {
                Console.WriteLine(country.Name + " - " + country.Capital);
            }
        }

        public void SelectAllSort()
        {
            var allCountries = _db.Countries.ToList();

            allCountries = allCountries.OrderByDescending(x => x.Name).ToList();
            
            foreach (var country in allCountries)
            {
                Console.WriteLine(country.Name + " - " + country.iso2 + " - " + country.Capital);
            }
        }
    }
}
