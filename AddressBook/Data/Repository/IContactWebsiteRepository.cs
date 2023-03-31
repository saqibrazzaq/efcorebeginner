using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactWebsiteRepository : IRepositoryBase<ContactWebsite>
    {
        PagedList<ContactWebsite> Search(ContactWebsiteReqSearch dto, bool trackChanges);
    }
}
