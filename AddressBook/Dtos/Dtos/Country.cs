using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class CountryRes
    {
        public int CountryId { get; set; }
        public string? Name { get; set; }
        public string? Iso3 { get; set; }
        public string? iso2 { get; set; }
        public string? NumericCode { get; set; }
        public string? PhoneCode { get; set; }
        public string? Capital { get; set; }
        public string? Currency { get; set; }
        public string? CurrencyName { get; set; }
        public string? CurrencySymbol { get; set; }
        public string? Tld { get; set; }
        public string? Native { get; set; }
        public string? Region { get; set; }
        public string? SubRegion { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? Emoji { get; set; }
        public string? EmojiU { get; set; }


        public IEnumerable<TimezoneRes>? Timezones { get; set; }
        public IEnumerable<TranslationRes>? Translations { get; set; }
        public IEnumerable<StateRes>? States { get; set; }
    }

    public class CountryReqEdit
    {
        [Required]
        public string? Name { get; set; }
        [Required, MaxLength(3)]
        public string? Iso3 { get; set; }
        [Required, MaxLength(2)]
        public string? iso2 { get; set; }
        public string? NumericCode { get; set; }
        public string? PhoneCode { get; set; }
        public string? Capital { get; set; }
        public string? Currency { get; set; }
        public string? CurrencyName { get; set; }
        public string? CurrencySymbol { get; set; }
        public string? Tld { get; set; }
        public string? Native { get; set; }
        public string? Region { get; set; }
        public string? SubRegion { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? Emoji { get; set; }
        public string? EmojiU { get; set; }
    }

    public class CountryReqSearch : PagedReq
    {

    }
}
