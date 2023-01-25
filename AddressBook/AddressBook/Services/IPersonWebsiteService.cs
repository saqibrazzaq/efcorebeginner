using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonWebsiteService
    {
        PersonWebsiteRes Create(PersonWebsiteReqEdit dto);
        PersonWebsiteRes Update(int personWebsiteId, PersonWebsiteReqEdit dto);
        void Delete(int personWebsiteId);
        PersonWebsiteRes Get(int personWebsiteId);
        ApiOkPagedResponse<IEnumerable<PersonWebsiteRes>, MetaData>
            Search(PersonWebsiteReqSearch dto);
    }
}
