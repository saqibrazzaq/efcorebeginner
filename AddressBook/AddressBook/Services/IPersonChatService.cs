using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonChatService
    {
        PersonChatRes Create(PersonChatReqEdit dto);
        PersonChatRes Update(int personChatId, PersonChatReqEdit dto);
        void Delete(int personChatId);
        PersonChatRes Get(int personChatId);
        ApiOkPagedResponse<IEnumerable<PersonChatRes>, MetaData>
            Search(PersonChatReqSearch dto);
    }
}
