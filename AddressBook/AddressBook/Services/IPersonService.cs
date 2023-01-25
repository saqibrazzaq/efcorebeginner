using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonService
    {
        PersonRes Create(PersonReqEdit dto);
        PersonRes Update(int personId, PersonReqEdit dto);
        void Delete(int personId);
        PersonRes Get(int personId);
        ApiOkPagedResponse<IEnumerable<PersonRes>, MetaData>
            Search(PersonReqSearch dto);
    }
}
