using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class ContactChatRes
    {
        public int ContactChatId { get; set; }
        public string? Chat { get; set; }

        public int? ContactId { get; set; }
        public ContactRes? Contact { get; set; }

        public int? ChatLabelId { get; set; }
        public ChatLabelRes? ChatLabel { get; set; }
    }

    public class ContactChatReqEdit
    {
        [Required]
        public string? Chat { get; set; }
        public int? ContactId { get; set; }
        public int? ChatLabelId { get; set; }
    }

    public class ContactChatReqSearch : PagedReq
    {
        public int ContactId { get; set; }
    }
}
