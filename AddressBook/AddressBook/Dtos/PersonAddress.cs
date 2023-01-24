using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class PersonAddressRes
    {
        public int PersonAddressId { get; set; }
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }
        public string? PostCode { get; set; }

        // Foreign keys
        public int? CityId { get; set; }
        public CityRes? City { get; set; }

        public int? AddressLabelId { get; set; }
        public AddressLabelRes? AddressLabel { get; set; }

        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }
    }

    public class PersonAddressReqEdit
    {
        [Required]
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }
        public string? PostCode { get; set; }
        public int? CityId { get; set; }
        public int? AddressLabelId { get; set; }
        public int? PersonId { get; set; }
    }

    public class PersonAddressReqSearch : PagedReq
    {
        [Required]
        public int? PersonId { get; set; }
    }
}
