using Person.Common.Paging;
using Person.Data;
using Person.Dtos;
using System.Diagnostics.Metrics;

namespace Person.Repository
{
    public class PersonRepository : RepositoryBase<Entities.Person>, IPersonRepository
    {
        public PersonRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<Entities.Person> Search(PersonReqSearch dto, bool trackChanges)
        {
            var entities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges)
                .Search(dto)
                .Count();
            return new PagedList<Entities.Person>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
