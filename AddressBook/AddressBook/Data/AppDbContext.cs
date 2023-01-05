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
    }
}
