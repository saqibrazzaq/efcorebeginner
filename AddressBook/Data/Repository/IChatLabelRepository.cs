using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IChatLabelRepository : IRepositoryBase<ChatLabel>
    {
        PagedList<ChatLabel> Search(ChatLabelReqSearch dto, bool trackChanges);
    }
}
