using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactEmailRes
    {
        public int ContactEmailId { get; set; }
        public string? Email { get; set; }

        public int? ContactId { get; set; }
        public ContactRes? Contact { get; set; }
        public int? EmailLabelId { get; set; }
        public EmailLabelRes? EmailLabel { get; set; }
    }

    public class ContactEmailReqEdit
    {
        [Required]
        public string? Email { get; set; }

        public int? ContactId { get; set; }
        public int? EmailLabelId { get; set; }
    }

    public class ContactEmailReqSearch : PagedReq
    {
        public int? ContactId { get; set; }
    }
}
