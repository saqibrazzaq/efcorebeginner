using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactPhoneService
    {
        ContactPhoneRes Create(ContactPhoneReqEdit dto);
        ContactPhoneRes Update(int contactPhoneId, ContactPhoneReqEdit dto);
        void Delete(int contactPhoneId);
        ContactPhoneRes Get(int contactPhoneId);
        bool AnyPhone(int phoneLabelId);
        ApiOkPagedResponse<IEnumerable<ContactPhoneRes>, MetaData>
            Search(ContactPhoneReqSearch dto);
        int Count();
    }
}
