using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IWebsiteLabelRepository : IRepositoryBase<WebsiteLabel>
    {
        PagedList<WebsiteLabel> Search(WebsiteLabelReqSearch dto, bool trackChanges);
    }
}
