using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface ITimezoneRepository : IRepositoryBase<Timezone>
    {
        PagedList<Timezone> Search(TimezoneReqSearch dto, bool trackChanges);
    }
}
