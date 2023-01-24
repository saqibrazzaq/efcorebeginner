using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonAddress")]
    public class PersonAddress
    {
        [Key]
        public int PersonAddressId { get; set; }
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

        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }
    }
}
