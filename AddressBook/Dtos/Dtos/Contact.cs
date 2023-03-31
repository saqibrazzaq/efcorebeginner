using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class ContactRes
    {
        public int ContactId { get; set; }
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
        public IEnumerable<ContactLabelRes>? ContactLabels { get; set; }
        public IEnumerable<ContactEmailRes>? ContactEmails { get; set; }
        public IEnumerable<ContactPhoneRes>? ContactPhones { get; set; }
        public IEnumerable<ContactAddressRes>? ContactAddresses { get; set; }
        public IEnumerable<ContactWebsiteRes>? ContactWebsites { get; set; }
        public IEnumerable<ContactChatRes>? ContactChats { get; set; }
    }

    public class ContactReqEdit
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

    public class ContactReqSearch : PagedReq
    {
        public int? LabelId { get; set; }
    }
}
