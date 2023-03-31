using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class StateRes
    {
        public int StateId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        public CountryRes? Country { get; set; }

        // Child tables
        public ICollection<CityRes>? Cities { get; set; }
    }

    public class StateReqEdit
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Code { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
    }

    public class StateReqSearch : PagedReq
    {
        public int? CountryId { get; set; }
    }
}
