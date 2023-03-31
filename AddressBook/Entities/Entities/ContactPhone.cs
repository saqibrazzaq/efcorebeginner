using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactPhone")]
    public class ContactPhone
    {
        [Key]
        public int ContactPhoneId { get; set; }
        [Required]
        public string? Phone { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }

        public int ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }

        public int? PhoneLabelId { get; set; }
        [ForeignKey(nameof(PhoneLabelId))]
        public PhoneLabel? PhoneLabel { get; set; }
    }
}
