using AddressBook.Data;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            // Initialize all the repositories
            
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
