using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Label")]
    public class Label
    {
        [Key]
        public int LabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Name { get; set; }
    }
}
