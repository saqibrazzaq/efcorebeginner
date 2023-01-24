using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonChatRepository : IRepositoryBase<PersonChat>
    {
        PagedList<PersonChat> Search(PersonChatReqSearch dto, bool trackChanges);
    }
}
