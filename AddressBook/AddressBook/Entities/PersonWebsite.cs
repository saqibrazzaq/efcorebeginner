using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonWebsite")]
    public class PersonWebsite
    {
        [Key]
        public int PersonWebsiteId { get; set; }
        [Required]
        public string? Website { get; set; }

        // Foreign keys
        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }

        public int? WebsiteLabelId { get; set; }
        [ForeignKey(nameof(WebsiteLabelId))]
        public WebsiteLabel? WebsiteLabel { get; set; }
    }
}
