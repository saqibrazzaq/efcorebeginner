namespace AddressBook.Dtos
{
    public class CountryImport
    {
        public int id { get; set; }
        public string name { get; set; }
        public string iso3 { get; set; }
        public string iso2 { get; set; }
        public string numeric_code { get; set; }
        public string phone_code { get; set; }
        public string capital { get; set; }
        public string currency { get; set; }
        public string currency_name { get; set; }
        public string currency_symbol { get; set; }
        public string tld { get; set; }
        public string native { get; set; }
        public string region { get; set; }
        public string subregion { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string emoji { get; set; }
        public string emojiU { get; set; }
        public IEnumerable<StateImport> states { get; set; }
        public IEnumerable<TimezoneImport> timezones { get; set; }
    }

    public class StateImport
    {
        public int id { get; set; }
        public string name { get; set; }
        public string state_code { get; set; }
        public IEnumerable<CityImport> cities { get; set; }
    }

    public class CityImport
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class TimezoneImport
    {
        public string zoneName { get; set; }
        public int gmtOffset { get; set; }
        public string gmtOffsetName { get; set; }
        public string abbreviation { get; set; }
        public string tzName { get; set; }
    }
}
