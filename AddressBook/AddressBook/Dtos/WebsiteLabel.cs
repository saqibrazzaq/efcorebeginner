using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class WebsiteLabelRes
    {
        public int WebsiteLabelId { get; set; }
        public string? Label { get; set; }
    }

    public class WebsiteLabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }

    public class WebsiteLabelReqSearch : PagedReq
    {

    }
}
