using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Translation")]
    public class Translation
    {
        [Key]
        public int TranslationId { get; set; }
        [Required]
        public string? Code { get; set; }
        [Required]
        public string? Name { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }
    }
}
