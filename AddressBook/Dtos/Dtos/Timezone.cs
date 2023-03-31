using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class TimezoneRes
    {
        public int TimezoneId { get; set; }
        public string? Name { get; set; }
        public string? CityName { get; set; }
        public int GmtOffset { get; set; }
        public string? GmtOffsetName { get; set; }
        public string? Abbreviation { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        public CountryRes? Country { get; set; }
    }

    public class TimezoneReqEdit
    {
        [Required]
        public string? Name { get; set; }
        public string? CityName { get; set; }
        public int GmtOffset { get; set; }
        public string? GmtOffsetName { get; set; }
        public string? Abbreviation { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
    }

    public class TimezoneReqSearch : PagedReq
    {
        public int? CountryId { get; set; }
    }
}
