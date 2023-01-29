using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactEmail")]
    public class ContactEmail
    {
        [Key]
        public int ContactEmailId { get; set; }
        [Required]
        public string? Email { get; set; }

        // Foreign keys
        public int? ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }

        public int? EmailLabelId { get; set; }
        [ForeignKey(nameof(EmailLabelId))]
        public EmailLabel? EmailLabel { get; set; }
    }
}
