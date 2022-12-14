using Person.Data;

namespace Person.Repository
{
    public class PersonRepository : RepositoryBase<Entities.Person>, IPersonRepository
    {
        public PersonRepository(AppDbContext context) : base(context)
        {
        }
    }
}
