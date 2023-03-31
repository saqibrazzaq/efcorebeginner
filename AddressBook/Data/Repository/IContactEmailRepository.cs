using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactEmailRepository : IRepositoryBase<ContactEmail>
    {
        PagedList<ContactEmail> Search(ContactEmailReqSearch dto, bool trackChanges);
    }
}
