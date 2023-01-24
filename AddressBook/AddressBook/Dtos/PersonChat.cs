using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class PersonChatRes
    {
        public int PersonChatId { get; set; }
        public string? Chat { get; set; }

        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }

        public int? ChatLabelId { get; set; }
        public ChatLabelRes? ChatLabel { get; set; }
    }

    public class PersonChatReqEdit
    {
        [Required]
        public string? Chat { get; set; }
        public int? PersonId { get; set; }
        public int? ChatLabelId { get; set; }
    }

    public class PersonChatReqSearch
    {
        public int PersonId { get; set; }
    }
}
