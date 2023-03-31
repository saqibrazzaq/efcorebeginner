using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactWebsiteRes
    {
        public int ContactWebsiteId { get; set; }
        public string? Website { get; set; }
        public int? ContactId { get; set; }
        public ContactRes? Contact { get; set; }
        public int? WebsiteLabelId { get; set; }
        public WebsiteLabelRes? WebsiteLabel { get; set; }
    }

    public class ContactWebsiteReqEdit
    {
        [Required]
        public string? Website { get; set; }
        public int? ContactId { get; set; }
        public int? WebsiteLabelId { get; set; }
    }

    public class ContactWebsiteReqSearch : PagedReq
    {
        [Required]
        public int? ContactId { get; set; }
    }
}
