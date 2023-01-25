using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonEmailService
    {
        PersonEmailRes Create(PersonEmailReqEdit dto);
        PersonEmailRes Update(int personEmailId, PersonEmailReqEdit dto);
        void Delete(int personEmailId);
        PersonEmailRes Get(int personEmailId);
        ApiOkPagedResponse<IEnumerable<PersonEmailRes>, MetaData>
            Search(PersonEmailReqSearch dto);
    }
}
