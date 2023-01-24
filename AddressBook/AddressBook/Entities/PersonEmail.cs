using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("PersonEmail")]
    public class PersonEmail
    {
        [Key]
        public int PersonEmailId { get; set; }
        [Required]
        public string? Email { get; set; }

        // Foreign keys
        public int? PersonId { get; set; }
        [ForeignKey(nameof(PersonId))]
        public Person? Person { get; set; }

        public int? EmailLabelId { get; set; }
        [ForeignKey(nameof(EmailLabelId))]
        public EmailLabel? EmailLabel { get; set; }
    }
}
