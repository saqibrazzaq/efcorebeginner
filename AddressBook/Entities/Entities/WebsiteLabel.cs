using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("WebsiteLabel")]
    public class WebsiteLabel
    {
        [Key]
        public int WebsiteLabelId { get; set; }
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }
}
