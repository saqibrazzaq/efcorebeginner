using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactPhoneRepository : IRepositoryBase<ContactPhone>
    {
        PagedList<ContactPhone> Search(ContactPhoneReqSearch dto, bool trackChanges);
    }
}
