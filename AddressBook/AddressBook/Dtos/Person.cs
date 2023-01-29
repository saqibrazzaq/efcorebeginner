using AddressBook.Common.Paging;
using AddressBook.Entities;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class PersonRes
    {
        public int PersonId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PictureUrl { get; set; }
        public string? Company { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Notes { get; set; }

        // Child tables
        public IEnumerable<PersonLabelRes>? PersonLabels { get; set; }
        public IEnumerable<PersonEmailRes>? PersonEmails { get; set; }
        public IEnumerable<PersonPhoneRes>? PersonPhones { get; set; }
        public IEnumerable<PersonAddressRes>? PersonAddresses { get; set; }
        public IEnumerable<PersonWebsiteRes>? PersonWebsites { get; set; }
        public IEnumerable<PersonChatRes>? PersonChats { get; set; }
    }

    public class PersonReqEdit
    {
        [Required]
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PictureUrl { get; set; }
        public string? Company { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Notes { get; set; }
    }

    public class PersonReqSearch : PagedReq
    {
        public int? PersonLabelId { get; set; }
    }
}
