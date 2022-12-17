using Person.Common.Paging;
using Person.Dtos;
using Person.Entities;
using System.Diagnostics.Metrics;

namespace Person.Repository
{
    public interface IPersonRepository : IRepositoryBase<Entities.Person>
    {
        PagedList<Entities.Person> Search(PersonReqSearch dto, bool trackChanges);
    }
}
