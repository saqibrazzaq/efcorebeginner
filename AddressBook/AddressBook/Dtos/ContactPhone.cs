using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactPhoneRes
    {
        public int ContactPhoneId { get; set; }
        public string? Phone { get; set; }

        public int? CountryId { get; set; }
        public Country? Country { get; set; }

        public int ContactId { get; set; }
        public ContactRes? Contact { get; set; }

        public int? PhoneLabelId { get; set; }
        public PhoneLabelRes? PhoneLabel { get; set; }
    }

    public class ContactPhoneReqEdit
    {
        [Required]
        public string? Phone { get; set; }
        // Foreign keys
        public int? CountryId { get; set; }
        [Required]
        public int? ContactId { get; set; }
        public int? PhoneLabelId { get; set; }
    }

    public class ContactPhoneReqSearch : PagedReq
    {
        [Required]
        public int? ContactId { get; set; }
    }
}
