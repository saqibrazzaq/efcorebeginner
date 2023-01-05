using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AddressBook.Common.Paging;

namespace AddressBook.Dtos
{
    public class CityRes
    {
        public int CityId { get; set; }
        public string? Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Foreign keys
        public int? StateId { get; set; }
        public State? State { get; set; }
    }

    public class CityReqEdit
    {
        [Required]
        public string? Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public int? StateId { get; set; }
    }

    public class CityReqSearch : PagedReq
    {
        public int? StateId { get; set; }
    }
}
