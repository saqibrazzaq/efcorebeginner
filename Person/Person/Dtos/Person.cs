using Person.Common.Paging;
using System.ComponentModel.DataAnnotations;

namespace Person.Dtos
{
    public class PersonRes
    {
        public int PersonId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string PhoneNumber { get; set; } = "";
        public string Gender { get; set; } = "";
    }

    public class PersonReqEdit 
    {
        [Required, MaxLength(100)]
        public string? FirstName { get; set; }
        [Required, MaxLength(100)]
        public string? LastName { get; set; }
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = "";
        [MaxLength(1)]
        public string Gender { get; set; } = "";
    }
    public class PersonReqSearch : PagedReq 
    {
        [MaxLength(1)]
        public string? Gender { get; set; }
    }
}
