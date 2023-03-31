using AddressBook.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class LabelRes
    {
        public int LabelId { get; set; }
        public string? Name { get; set; }
    }

    public class LabelReqEdit
    {
        [Required, MaxLength(20)]
        public string? Name { get; set; }
    }

    public class LabelReqSearch : PagedReq
    {

    }
}
