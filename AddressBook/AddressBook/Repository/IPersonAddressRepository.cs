using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonAddressRepository : IRepositoryBase<PersonAddress>
    {
        PagedList<PersonAddress> Search(PersonAddressReqSearch dto, bool trackChanges);
    }
}
