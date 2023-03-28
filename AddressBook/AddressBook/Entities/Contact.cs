using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("Contact")]
    [Index(nameof(FirstName))]
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PictureUrl { get; set; }
        public string? CloudinaryId { get; set; }
        public string? Company { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Notes { get; set; }

        // Child tables
        public IEnumerable<ContactLabel>? ContactLabels { get; set; }
        public IEnumerable<ContactEmail>? ContactEmails { get; set; }
        public IEnumerable<ContactPhone>? ContactPhones { get; set; }
        public IEnumerable<ContactAddress>? ContactAddresses { get; set; }
        public IEnumerable<ContactWebsite>? ContactWebsites { get; set; }
        public IEnumerable<ContactChat>? ContactChats { get; set; }
    }
}
