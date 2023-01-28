using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Tables
        public DbSet<Country>? Countries { get; set; }
        public DbSet<State>? States { get; set; }
        public DbSet<Translation>? Translations { get; set; }
        public DbSet<Timezone>? Timezones { get; set; }
        public DbSet<City>? Cities { get; set; }
        public DbSet<Person>? Persons { get; set; }
        public DbSet<Label>? Labels { get; set; }
        public DbSet<PersonLabel>? PersonLabels { get; set; }
        public DbSet<PersonEmail>? PersonEmails { get; set; }
        public DbSet<EmailLabel>? EmailLabels { get; set; }
        public DbSet<PersonPhone>? PersonPhones { get; set; }
        public DbSet<PhoneLabel>? PhoneLabels { get; set; }
        public DbSet<PersonAddress>? PersonAddresses { get; set; }
        public DbSet<AddressLabel>? AddressLabels { get; set; }
        public DbSet<PersonWebsite>? PersonWebsites { get; set; }
        public DbSet<WebsiteLabel>? WebsiteLabels { get; set; }
        public DbSet<PersonChat>? PersonChats { get; set; }
        public DbSet<ChatLabel>? ChatLabels { get; set; }
    }
}
