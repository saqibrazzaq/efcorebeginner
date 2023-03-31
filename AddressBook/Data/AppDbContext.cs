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
        public DbSet<Contact>? Contacts { get; set; }
        public DbSet<Label>? Labels { get; set; }
        public DbSet<ContactLabel>? ContactLabels { get; set; }
        public DbSet<ContactEmail>? ContactEmails { get; set; }
        public DbSet<EmailLabel>? EmailLabels { get; set; }
        public DbSet<ContactPhone>? ContactPhones { get; set; }
        public DbSet<PhoneLabel>? PhoneLabels { get; set; }
        public DbSet<ContactAddress>? ContactAddresses { get; set; }
        public DbSet<AddressLabel>? AddressLabels { get; set; }
        public DbSet<ContactWebsite>? ContactWebsites { get; set; }
        public DbSet<WebsiteLabel>? WebsiteLabels { get; set; }
        public DbSet<ContactChat>? ContactChats { get; set; }
        public DbSet<ChatLabel>? ChatLabels { get; set; }
    }
}
