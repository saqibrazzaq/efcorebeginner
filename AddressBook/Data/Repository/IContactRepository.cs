using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactRepository : IRepositoryBase<Contact>
    {
        PagedList<Contact> Search(ContactReqSearch dto, bool trackChanges);
    }
}
