using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Entities;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class PersonLabelRes
    {
        public int PersonLabelId { get; set; }
        public int? LabelId { get; set; }
        public LabelRes? Label { get; set; }
        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }
    }

    public class PersonLabelReqEdit
    {
        public int? PersonId { get; set; }
        public int? LabelId { get; set; }
    }

    public class PersonLabelReqSearch : PagedReq
    {
        [Required]
        public int? PersonId { get; set; }
    }
}
