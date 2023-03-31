using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class EmailLabelRes
    {
        public int EmailLabelId { get; set; }
        public string? Label { get; set; }
    }

    public class EmailLabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }

    public class EmailLabelReqSearch : PagedReq
    {

    }
}
