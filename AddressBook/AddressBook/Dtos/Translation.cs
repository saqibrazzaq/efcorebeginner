using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class TranslationRes
    {
        public int TranslationId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        public Country? Country { get; set; }
    }

    public class TranslationReqEdit
    {
        [Required]
        public string? Code { get; set; }
        [Required]
        public string? Name { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
    }

    public class TranslationReqSearch : PagedReq
    {
        public int? CountryId { get; set; }
    }
}
