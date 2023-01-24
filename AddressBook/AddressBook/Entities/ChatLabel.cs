using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ChatLabel")]
    public class ChatLabel
    {
        [Key]
        public int ChatLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }
}
