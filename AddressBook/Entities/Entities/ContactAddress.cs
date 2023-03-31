using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactAddress")]
    public class ContactAddress
    {
        [Key]
        public int ContactAddressId { get; set; }
        [Required]
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }
        public string? PostCode { get; set; }

        // Foreign keys
        public int? CityId { get; set; }
        [ForeignKey(nameof(CityId))]
        public City? City { get; set; }

        public int? AddressLabelId { get; set; }
        [ForeignKey(nameof(AddressLabelId))]
        public AddressLabel? AddressLabel { get; set; }

        public int ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }
    }
}
