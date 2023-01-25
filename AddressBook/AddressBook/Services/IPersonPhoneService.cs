using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonPhoneService
    {
        PersonPhoneRes Create(PersonPhoneReqEdit dto);
        PersonPhoneRes Update(int personPhoneId, PersonPhoneReqEdit dto);
        void Delete(int personPhoneId);
        PersonPhoneRes Get(int personPhoneId);
        ApiOkPagedResponse<IEnumerable<PersonPhoneRes>, MetaData>
            Search(PersonPhoneReqSearch dto);
    }
}
