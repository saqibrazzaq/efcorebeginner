using Microsoft.EntityFrameworkCore;
using Person.Entities;

namespace Person.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Tables
        public DbSet<Entities.Person>? Persons { get; set; }
    }
}
