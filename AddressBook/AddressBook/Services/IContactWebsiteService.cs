using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactWebsiteService
    {
        ContactWebsiteRes Create(ContactWebsiteReqEdit dto);
        ContactWebsiteRes Update(int contactWebsiteId, ContactWebsiteReqEdit dto);
        void Delete(int contactWebsiteId);
        ContactWebsiteRes Get(int contactWebsiteId);
        ApiOkPagedResponse<IEnumerable<ContactWebsiteRes>, MetaData>
            Search(ContactWebsiteReqSearch dto);
    }
}
