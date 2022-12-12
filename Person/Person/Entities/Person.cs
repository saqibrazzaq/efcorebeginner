using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Person.Entities
{
    [Table("Person")]
    public class Person
    {
        [Key]
        public int PersonId { get; set; }
        [Required, MaxLength(100)]
        public string? FirstName { get; set; }
        [Required, MaxLength(100)]
        public string? LastName { get; set; }
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = "";
        [MaxLength(1)]
        public string Gender { get; set; } = "";
    }
}
