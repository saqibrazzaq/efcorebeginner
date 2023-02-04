using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactService
    {
        ContactRes Create(ContactReqEdit dto);
        ContactRes Update(int contactId, ContactReqEdit dto);
        ContactRes UpdateImage(int contactId, IFormFile file, string tempFolderPath);
        void Delete(int contactId);
        ContactRes Get(int contactId);
        int Count();
        int Count(int cityId);
        ApiOkPagedResponse<IEnumerable<ContactRes>, MetaData>
            Search(ContactReqSearch dto);
    }
}
