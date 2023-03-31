using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("AddressLabel")]
    public class AddressLabel
    {
        [Key]
        public int AddressLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }
}
