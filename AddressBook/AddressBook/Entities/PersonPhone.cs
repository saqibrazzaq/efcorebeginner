using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonPhone")]
    public class PersonPhone
    {
        [Key]
        public int PersonPhoneId { get; set; }
        [Required]
        public string? Phone { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }

        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }

        public int? PhoneLabelId { get; set; }
        [ForeignKey(nameof(PhoneLabelId))]
        public PhoneLabel? PhoneLabel { get; set; }
    }
}
