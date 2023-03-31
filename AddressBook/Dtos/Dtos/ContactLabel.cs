using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactLabelRes
    {
        public int ContactLabelId { get; set; }
        public int? LabelId { get; set; }
        public LabelRes? Label { get; set; }
        public int? ContactId { get; set; }
        public ContactRes? Contact { get; set; }
    }

    public class ContactLabelReqEdit
    {
        public int? ContactId { get; set; }
        public int? LabelId { get; set; }
    }

    public class ContactLabelReqSearch : PagedReq
    {
        [Required]
        public int? ContactId { get; set; }
    }
}
