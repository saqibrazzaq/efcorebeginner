using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("ContactWebsite")]
    public class ContactWebsite
    {
        [Key]
        public int ContactWebsiteId { get; set; }
        [Required]
        public string? Website { get; set; }

        // Foreign keys
        public int? ContactId { get; set; }
        [ForeignKey(nameof(ContactId))]
        public Contact? Contact { get; set; }

        public int? WebsiteLabelId { get; set; }
        [ForeignKey(nameof(WebsiteLabelId))]
        public WebsiteLabel? WebsiteLabel { get; set; }
    }
}
