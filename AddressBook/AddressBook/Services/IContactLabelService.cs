using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactLabelService
    {
        ContactLabelRes Create(ContactLabelReqEdit dto);
        ContactLabelRes Update(int contactLabelId, ContactLabelReqEdit dto);
        void Delete(int contactLabelId);
        ContactLabelRes Get(int contactLabelId);
        bool AnyContact(int labelId);
        ApiOkPagedResponse<IEnumerable<ContactLabelRes>, MetaData>
            Search(ContactLabelReqSearch dto);
        int Count();
    }
}
