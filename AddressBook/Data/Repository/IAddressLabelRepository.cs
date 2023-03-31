using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IAddressLabelRepository : IRepositoryBase<AddressLabel>
    {
        PagedList<AddressLabel> Search(AddressLabelReqSearch dto, bool trackChanges);
    }
}
