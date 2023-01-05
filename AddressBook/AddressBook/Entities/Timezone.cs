using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Timezone")]
    public class Timezone
    {
        [Key]
        public int TimezoneId { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? CityName { get; set; }
        public int GmtOffset { get; set; }
        public string? GmtOffsetName { get; set; }
        public string? Abbreviation { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }

    }
}
