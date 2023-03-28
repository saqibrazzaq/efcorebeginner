using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Country")]
    [Index(nameof(Name))]
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
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


        // Child tables
        public ICollection<Timezone>? Timezones { get; set; }
        public ICollection<Translation>? Translations { get; set; }
        public ICollection<State>? States { get; set; }
    }
}
