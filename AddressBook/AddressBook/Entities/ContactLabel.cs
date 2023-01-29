using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactLabel")]
    public class ContactLabel
    {
        [Key]
        public int ContactLabelId { get; set; }
        
        // Foreign keys
        public int? ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }
        public int? LabelId { get; set; }
        [ForeignKey(nameof(LabelId))]
        public Label? Label { get; set; }
    }
}
