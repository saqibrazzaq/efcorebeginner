using Person.Data;

namespace Person.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;

        // List all the repositories
        private readonly Lazy<IPersonRepository> _personRepository;
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            // Initialize all the repositories
            _personRepository = new Lazy<IPersonRepository>(() =>
                new PersonRepository(context));
        }

        public IPersonRepository PersonRepository => _personRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
