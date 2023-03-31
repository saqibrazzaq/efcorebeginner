using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class ChatLabelRes
    {
        public int ChatLabelId { get; set; }
        public string? Label { get; set; }
    }

    public class ChatLabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Label { get; set; }
    }

    public class ChatLabelReqSearch : PagedReq
    {

    }
}
