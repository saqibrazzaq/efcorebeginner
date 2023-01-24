using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class PersonEmailRes
    {
        public int PersonEmailId { get; set; }
        public string? Email { get; set; }

        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }
        public int? EmailLabelId { get; set; }
        public EmailLabelRes? EmailLabel { get; set; }
    }

    public class PersonEmailReqEdit
    {
        [Required]
        public string? Email { get; set; }

        public int? PersonId { get; set; }
        public int? EmailLabelId { get; set; }
    }

    public class PersonEmailReqSearch : PagedReq
    {
        public int? PersonId { get; set; }
    }
}
