using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class PersonWebsiteRes
    {
        public int PersonWebsiteId { get; set; }
        public string? Website { get; set; }
        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }
        public int? WebsiteLabelId { get; set; }
        public WebsiteLabelRes? WebsiteLabel { get; set; }
    }

    public class PersonWebsiteReqEdit
    {
        [Required]
        public string? Website { get; set; }
        public int? PersonId { get; set; }
        public int? WebsiteLabelId { get; set; }
    }

    public class PersonWebsiteReqSearch : PagedReq
    {
        [Required]
        public int? PersonId { get; set; }
    }
}
