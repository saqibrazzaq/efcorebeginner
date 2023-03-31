using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactChatRepository : IRepositoryBase<ContactChat>
    {
        PagedList<ContactChat> Search(ContactChatReqSearch dto, bool trackChanges);
    }
}
