using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactAddressRepository : IRepositoryBase<ContactAddress>
    {
        PagedList<ContactAddress> Search(ContactAddressReqSearch dto, bool trackChanges);
    }
}
