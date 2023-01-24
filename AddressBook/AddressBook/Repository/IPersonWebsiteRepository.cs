using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonWebsiteRepository : IRepositoryBase<PersonWebsite>
    {
        PagedList<PersonWebsite> Search(PersonWebsiteReqSearch dto, bool trackChanges);
    }
}
