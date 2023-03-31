using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IContactLabelRepository : IRepositoryBase<ContactLabel>
    {
        PagedList<ContactLabel> Search(ContactLabelReqSearch dto, bool trackChanges);
    }
}
