using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactChat")]
    public class ContactChat
    {
        [Key]
        public int ContactChatId { get; set; }
        [Required]
        public string? Chat { get; set; }

        // Foreign keys
        public int ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }

        public int? ChatLabelId { get; set; }
        [ForeignKey(nameof(ChatLabelId))]
        public ChatLabel? ChatLabel { get; set; }
    }
}
