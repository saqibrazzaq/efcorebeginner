using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("EmailLabel")]
    public class EmailLabel
    {
        [Key]
        public int EmailLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }
}
