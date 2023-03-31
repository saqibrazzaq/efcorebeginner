using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IStateRepository : IRepositoryBase<State>
    {
        PagedList<State> Search(StateReqSearch dto, bool trackChanges);
    }
}
