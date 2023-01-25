using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IWebsiteLabelService
    {
        WebsiteLabelRes Create(WebsiteLabelReqEdit dto);
        WebsiteLabelRes Update(int websiteLabelId, WebsiteLabelReqEdit dto);
        void Delete(int websiteLabelId);
        WebsiteLabelRes Get(int websiteLabelId);
        ApiOkPagedResponse<IEnumerable<WebsiteLabelRes>, MetaData>
            Search(WebsiteLabelReqSearch dto);
    }
}
