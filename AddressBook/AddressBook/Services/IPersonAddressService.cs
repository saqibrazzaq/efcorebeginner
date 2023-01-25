using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonAddressService
    {
        PersonAddressRes Create(PersonAddressReqEdit dto);
        PersonAddressRes Update(int personAddressId, PersonAddressReqEdit dto);
        void Delete(int personAddressId);
        PersonAddressRes Get(int personAddressId);
        ApiOkPagedResponse<IEnumerable<PersonAddressRes>, MetaData>
            Search(PersonAddressReqSearch dto);
    }
}
