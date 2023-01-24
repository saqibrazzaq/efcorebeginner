using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Person")]
    public class Person
    {
        [Key]
        public int PersonId { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PictureUrl { get; set; }
        public string? Company { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string? Notes { get; set; }

        // Child tables
        public IEnumerable<PersonLabel>? PersonLabels { get; set; }
        public IEnumerable<PersonEmail>? PersonEmails { get; set; }
        public IEnumerable<PersonPhone>? PersonPhones { get; set; }
        public IEnumerable<PersonAddress>? PersonAddresses { get; set; }
        public IEnumerable<PersonWebsite>? PersonWebsites { get; set; }
        public IEnumerable<PersonChat>? PersonChats { get; set; }
    }
}
