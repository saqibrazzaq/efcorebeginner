using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactAddressRes
    {
        public int ContactAddressId { get; set; }
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }
        public string? PostCode { get; set; }

        // Foreign keys
        public int? CityId { get; set; }
        public CityRes? City { get; set; }

        public int? AddressLabelId { get; set; }
        public AddressLabelRes? AddressLabel { get; set; }

        public int? ContactId { get; set; }
        public ContactRes? Contact { get; set; }
    }

    public class ContactAddressReqEdit
    {
        [Required]
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }
        public string? PostCode { get; set; }
        public int? CityId { get; set; }
        public int? AddressLabelId { get; set; }
        public int? ContactId { get; set; }
    }

    public class ContactAddressReqSearch : PagedReq
    {
        [Required]
        public int? ContactId { get; set; }
    }
}
