using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class PhoneLabelRes
    {
        public int PhoneLabelId { get; set; }
        public string? Label { get; set; }
    }

    public class PhoneLabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }

    public class PhoneLabelReqSearch : PagedReq
    {

    }
}
