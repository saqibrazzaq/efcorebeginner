using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactChatService
    {
        ContactChatRes Create(ContactChatReqEdit dto);
        ContactChatRes Update(int contactChatId, ContactChatReqEdit dto);
        void Delete(int contactChatId);
        ContactChatRes Get(int contactChatId);
        ApiOkPagedResponse<IEnumerable<ContactChatRes>, MetaData>
            Search(ContactChatReqSearch dto);
    }
}
