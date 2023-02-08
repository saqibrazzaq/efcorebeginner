using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactEmailService
    {
        ContactEmailRes Create(ContactEmailReqEdit dto);
        ContactEmailRes Update(int contactEmailId, ContactEmailReqEdit dto);
        void Delete(int contactEmailId);
        ContactEmailRes Get(int contactEmailId);
        bool AnyEmail(int emailLabelId);
        ApiOkPagedResponse<IEnumerable<ContactEmailRes>, MetaData>
            Search(ContactEmailReqSearch dto);
    }
}
