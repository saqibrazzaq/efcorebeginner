using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class AddressLabelRes
    {
        public int AddressLabelId { get; set; }
        public string? Label { get; set; }
    }

    public class AddressLabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }

    public class AddressLabelReqSearch : PagedReq
    {

    }
}
