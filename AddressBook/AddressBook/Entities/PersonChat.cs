using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonChat")]
    public class PersonChat
    {
        [Key]
        public int PersonChatId { get; set; }
        [Required]
        public string? Chat { get; set; }

        // Foreign keys
        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }

        public int? ChatLabelId { get; set; }
        [ForeignKey(nameof(ChatLabelId))]
        public ChatLabel? ChatLabel { get; set; }
    }
}
