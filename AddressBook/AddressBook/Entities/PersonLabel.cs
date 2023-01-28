using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonLabel")]
    public class PersonLabel
    {
        [Key]
        public int PersonLabelId { get; set; }
        
        // Foreign keys
        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }
        public int? LabelId { get; set; }
        [ForeignKey(nameof(LabelId))]
        public Label? Label { get; set; }
    }
}
