using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonPhoneRepository : IRepositoryBase<PersonPhone>
    {
        PagedList<PersonPhone> Search(PersonPhoneReqSearch dto, bool trackChanges);
    }
}
