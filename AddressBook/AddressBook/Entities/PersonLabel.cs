using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonLabel")]
    public class PersonLabel
    {
        [Key]
        public int PersonLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }

        // Foreign keys
        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }
    }
}
