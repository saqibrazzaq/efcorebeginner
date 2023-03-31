using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Entities
{
    [Table("State")]
    [Index(nameof(Name))]
    public class State
    {
        [Key]
        public int StateId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Code { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }

        // Child tables
        public ICollection<City>? Cities { get; set; }
    }
}
