using AddressBook.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Dtos
{
    public class PersonPhoneRes
    {
        public int PersonPhoneId { get; set; }
        public string? Phone { get; set; }

        public int? CountryId { get; set; }
        public Country? Country { get; set; }

        public int? PersonId { get; set; }
        public PersonRes? Person { get; set; }

        public int? PhoneLabelId { get; set; }
        public PhoneLabelRes? PhoneLabel { get; set; }
    }

    public class PersonPhoneReqEdit
    {
        [Required]
        public string? Phone { get; set; }
        // Foreign keys
        public int? CountryId { get; set; }
        public int? PersonId { get; set; }
        public int? PhoneLabelId { get; set; }
    }

    public class PersonPhoneReqSearch
    {
        [Required]
        public int? PersonId { get; set; }
    }
}
