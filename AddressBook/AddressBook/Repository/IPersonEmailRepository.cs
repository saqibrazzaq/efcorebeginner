using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonEmailRepository : IRepositoryBase<PersonEmail>
    {
        PagedList<PersonEmail> Search(PersonEmailReqSearch dto, bool trackChanges);
    }
}
