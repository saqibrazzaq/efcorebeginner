using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PhoneLabel")]
    public class PhoneLabel
    {
        [Key]
        public int PhoneLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }
}
