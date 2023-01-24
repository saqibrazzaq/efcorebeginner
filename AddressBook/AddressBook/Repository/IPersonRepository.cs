using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonRepository : IRepositoryBase<Person>
    {
        PagedList<Person> Search(PersonReqSearch dto, bool trackChanges);
    }
}
