using AddressBook.Data;
using AddressBook.Entities;
using AddressBook.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            var allCountries = _db.Countries
                .OrderByDescending(x => x.Name);

            foreach (var country in allCountries)
            {
                Console.WriteLine(country.Name + " - " + country.iso2 + " - " + country.Capital);
            }
        }

        public void SelectSpecificColumn()
        {
            var countries = _db.Countries
                .Select(x => new
                {
                    Name = x.Name,
                    Desc = "Its Code is " + x.iso2 + ", its Capital is " + x.Capital
                });

            foreach(var country in countries)
            {
                Console.WriteLine(country.Name + " - " + country.Desc);
            }
        }

        public void SelectSpecificColumnInClass()
        {
            var countries = _db.Countries
                .Select(x => new CountryDropdownRes
                {
                    CountryId = x.CountryId,
                    Name = x.Name,
                });

            foreach(var country in countries)
            {
                Console.WriteLine(country.CountryId + " - " + country.Name);
            }
        }

        public void SelectWithWhereCondition(string searchText)
        {
            searchText = searchText.ToLower().Trim();

            var countries = _db.Countries.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchText))
            {
                countries = countries.Where(
                    x => x.Name.ToLower().Contains(searchText) ||
                    x.iso2.ToLower() == searchText ||
                    x.Iso3.ToLower() == searchText);
            }
            foreach (var country in countries)
            {
                Console.WriteLine(country.CountryId + " - " + country.Name);
            }
        }

        public void SelectOne()
        {
            var country = _db.Countries
                .Where(x => x.CountryId == 1)
                .Single();
            Console.WriteLine(country.Name);
        }

        public void Search(string searchText, double minLatitude, double minLongitude)
        {
            searchText = searchText.ToLower().Trim();

            var countries = _db.Countries
                .OrderBy(x => x.Name)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace (searchText))
            {
                countries = countries.Where(
                    x => x.Name.ToLower().Contains(searchText)
                    || x.iso2.ToLower() == searchText
                    || x.Iso3.ToLower() == searchText
                    );
            }

            if (minLatitude > 0)
            {
                countries = countries.Where(
                    x => x.Latitude > minLatitude);
            }

            if (minLongitude > 0)
            {
                countries = countries.Where(
                    x => x.Longitude > minLongitude);
            }

            var countriesRes = countries.Select(x => new CountrySearchRes
            {
                CountryId = x.CountryId,
                Name = x.Name,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
            });

            foreach (var country in countriesRes) 
            {
                Console.WriteLine(country.CountryId + " - " + country.Name);
            }
        }
    }

    public class CountrySearchRes
    {
        public int CountryId { get; set; }
        public string? Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class CountryDropdownRes
    {
        public int CountryId { get; set; }
        public string? Name { get; set; }
    }
}
